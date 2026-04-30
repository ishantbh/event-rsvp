'use server'

import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { rateLimit } from '@/lib/rate-limit'
import { InviteRsvpFormSchema, EventFormSchema } from '@/lib/schemas'

export type ActionResponse = { error?: string } | undefined

export type EventFormActionResponse = ActionResponse & { eventId?: string }

export async function createEventAction({
  title,
  description,
  location,
  eventDate,
  capacity,
}: {
  title: string
  description?: string
  location?: string
  eventDate?: Date
  capacity?: number
}): Promise<EventFormActionResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return { error: 'Unauthorized' }
  }

  const userId = session.user.id

  const res = EventFormSchema.safeParse({
    title,
    description,
    location,
    eventDate,
    capacity,
  })

  if (res.error) {
    return { error: 'Invalid event data' }
  }

  const created = await prisma.event.create({
    data: {
      ownerUserId: userId,
      title: res.data.title,
      description: res.data.description || null,
      location: res.data.location || null,
      eventDate: res.data.eventDate,
      capacity: res.data.capacity,
    },
  })

  return { eventId: created.id }
}

export async function updateEventAction({
  id,
  title,
  description,
  location,
  eventDate,
  capacity,
}: {
  id: string
  title: string
  description?: string
  location?: string
  eventDate?: Date
  capacity?: number
}): Promise<EventFormActionResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return { error: 'Unauthorized' }
  }

  const userId = session.user.id

  const res = EventFormSchema.safeParse({
    title,
    description,
    location,
    eventDate,
    capacity,
  })

  if (res.error) {
    return { error: 'Invalid event data' }
  }

  const updated = await prisma.event.update({
    where: { ownerUserId: userId, id },
    data: {
      title: res.data.title,
      description: res.data.description || null,
      location: res.data.location || null,
      eventDate: res.data.eventDate,
      capacity: res.data.capacity,
    },
  })

  return { eventId: updated.id }
}

export async function createInviteAction(
  eventId: string,
): Promise<ActionResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return { error: 'Unauthorized' }
  }

  const userId = session.user.id

  return await prisma.$transaction(async (tx) => {
    const event = await tx.event.findUnique({
      where: { ownerUserId: userId, id: eventId },
      select: { eventDate: true },
    })

    if (!event) {
      return { error: 'Event not found' }
    }

    // If event ended, delete the invite and revalidate the page
    if (event.eventDate && event.eventDate.getTime() < Date.now()) {
      await tx.eventInvite.deleteMany({
        where: { eventId },
      })

      revalidatePath(`/events/${eventId}`)

      return { error: 'Event has already ended' }
    }

    // Unique invite token
    const token = crypto.randomUUID().replace(/-/g, '')

    await tx.eventInvite.upsert({
      where: { eventId },
      create: { eventId, token },
      update: { token },
    })

    revalidatePath(`/events/${eventId}`)
  })
}

export async function submitRsvpAction(
  token: string,
  value: {
    name: string
    email: string
    attendance: string
    organization?: string
  },
): Promise<ActionResponse> {
  if (value.organization) {
    // honeypot
    // bot detected
    return
  }

  const ip = await getIPFromHeaders()

  // Rate limit per IP and per event
  if (
    !(await rateLimit(`rsvp:ip:${ip}`, 10, 60)) ||
    !(await rateLimit(`rsvp:event:${token}`, 100, 60))
  ) {
    return { error: 'Too many requests, please try again later.' }
  }

  const res = InviteRsvpFormSchema.safeParse(value)

  if (res.error) {
    return { error: 'Invalid RSVP data' }
  }

  const { name, email, attendance: status } = res.data

  const emailNormalized = email.toLowerCase()

  return await prisma.$transaction(async (tx) => {
    // Use the unique token to find the invite and the corresponding event
    const invite = await tx.eventInvite.findUnique({
      where: { token },
      select: {
        id: true,
        event: { select: { id: true, eventDate: true, capacity: true } },
      },
    })

    if (!invite) {
      return { error: 'Invite link is invalid.' }
    }

    const { id: eventId, eventDate, capacity } = invite.event

    // Check if the event has already ended (only if user has set an event date)
    if (eventDate && eventDate.getTime() < Date.now()) {
      return { error: 'Event has already ended.' }
    }

    const rsvpCount = await tx.eventRsvp.count({
      where: { eventId },
    })

    // Check if the event is full
    // Also enforce an upper limit of 10_000 attendees per event
    if (rsvpCount >= 10_000 || (capacity && capacity <= rsvpCount)) {
      return { error: 'Event is full.' }
    }

    // Create/update RSVP using event id and normalized email as key
    await tx.eventRsvp.upsert({
      where: {
        eventId_emailNormalized: { eventId, emailNormalized },
      },
      create: {
        eventId,
        inviteId: invite.id,
        name,
        email,
        emailNormalized,
        status,
      },
      update: {
        name,
        status,
        respondedAt: new Date(),
      },
    })
  })
}

export async function deleteEventAction(
  eventId: string,
): Promise<ActionResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return { error: 'Unauthorized' }
  }

  const userId = session.user.id

  await prisma.event.delete({
    where: { ownerUserId: userId, id: eventId },
  })
}

export async function requestPasswordResetAction(email: string) {
  const ip = await getIPFromHeaders()

  const normalizedEmail = email.toLowerCase().trim()

  if (
    !(await rateLimit(`forgot:ip:${ip}`, 5, 3600)) || // 5 requests per hour per IP
    !(await rateLimit(`forgot:email:${normalizedEmail}`, 3, 3600)) // 3 requests per hour per email
  ) {
    return { error: 'Too many requests, please try again later.' }
  }

  await auth.api.requestPasswordReset({
    body: {
      email: normalizedEmail,
      redirectTo: '/reset-password',
    },
  })
}

export async function loginAction(email: string, password: string) {
  const ip = await getIPFromHeaders()

  const normalizedEmail = email.toLowerCase().trim()

  if (
    !(await rateLimit(`login:ip:${ip}`, 5, 60)) || // 5 requests per minute per IP
    !(await rateLimit(`login:email:${normalizedEmail}`, 5, 60)) // 5 requests per minute per email
  ) {
    return { error: 'Too many requests, please try again later.' }
  }

  try {
    await auth.api.signInEmail({
      body: {
        email: normalizedEmail,
        password,
        rememberMe: true,
      },
      headers: await headers(),
    })
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to sign in' }
  }
}

async function getIPFromHeaders() {
  const headersList = await headers()

  return (
    headersList.get('x-forwarded-for')?.split(',')[0] ??
    headersList.get('x-real-ip') ??
    'unknown'
  )
}
