'use server'

import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { InviteRsvpFormSchema, EventFormSchema } from '@/lib/schemas'
import { rateLimit } from '@/lib/rate-limit'

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
  eventDate?: string
  capacity?: string
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    throw new Error('Unauthorized')
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
    throw new Error(res.error.message)
  }

  const normalizedEventDate = res.data.eventDate
    ? new Date(res.data.eventDate)
    : null

  const created = await prisma.event.create({
    data: {
      ownerUserId: userId,
      title: res.data.title,
      description: res.data.description || null,
      location: res.data.location || null,
      eventDate: normalizedEventDate,
      capacity: res.data.capacity,
    },
  })

  return created.id
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
  eventDate?: string
  capacity?: string
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    throw new Error('Unauthorized')
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
    throw new Error(res.error.message)
  }

  const normalizedEventDate = res.data.eventDate
    ? new Date(res.data.eventDate)
    : null

  const created = await prisma.event.update({
    where: { ownerUserId: userId, id },
    data: {
      title: res.data.title,
      description: res.data.description || null,
      location: res.data.location || null,
      eventDate: normalizedEventDate,
      capacity: res.data.capacity,
    },
  })

  return created.id
}

export async function createInviteAction(eventId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return { error: 'Unauthorized' }
  }

  const userId = session.user.id

  const event = await prisma.event.findUnique({
    where: { ownerUserId: userId, id: eventId },
    select: { id: true, eventDate: true },
  })

  if (!event) {
    return { error: 'Event not found' }
  }

  if (event.eventDate && event.eventDate.getTime() < Date.now()) {
    await prisma.eventInvite.deleteMany({
      where: { eventId },
    })

    revalidatePath(`/events/${eventId}`)

    return { error: 'Event has already ended' }
  }

  const token = crypto.randomUUID().replace(/-/g, '')

  await prisma.eventInvite.upsert({
    where: { eventId },
    create: { eventId, token },
    update: { token },
  })

  revalidatePath(`/events/${eventId}`)

  return { error: null }
}

export async function submitRsvpAction(
  token: string,
  value: {
    name: string
    email: string
    attendance: string
    organization?: string
  },
) {
  if (value.organization) {
    // honeypot
    // bot detected
    return
  }

  const ip = await getIPFromHeaders()

  // Rate limit per IP
  await rateLimit(`rsvp:ip:${ip}`, 10, 60)

  // Rate limit per event
  await rateLimit(`rsvp:event:${token}`, 100, 60)

  const res = InviteRsvpFormSchema.safeParse(value)

  if (res.error) {
    throw new Error(res.error.message)
  }

  const invite = await prisma.eventInvite.findUnique({
    where: { token },
    select: {
      id: true,
      eventId: true,
      event: { select: { eventDate: true, capacity: true } },
    },
  })

  if (!invite) {
    throw new Error('Invite link is invalid.')
  }

  if (invite.event.eventDate && invite.event.eventDate.getTime() < Date.now()) {
    throw new Error('Event has already ended.')
  }

  const rsvpCount = await prisma.eventRsvp.count({
    where: { eventId: invite.eventId },
  })

  if (invite.event.capacity && invite.event.capacity <= rsvpCount) {
    throw new Error('Event is full.')
  }

  const emailNormalized = res.data.email.toLowerCase()

  await prisma.eventRsvp.upsert({
    where: {
      eventId_emailNormalized: { eventId: invite.eventId, emailNormalized },
    },
    create: {
      eventId: invite.eventId,
      inviteId: invite.id,
      name: res.data.name,
      email: res.data.email,
      emailNormalized,
      status: res.data.attendance,
    },
    update: {
      name: res.data.name,
      status: res.data.attendance,
      respondedAt: new Date(),
    },
  })
}

export async function deleteEventAction(eventId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    throw new Error('Unauthorized')
  }

  const userId = session.user.id

  await prisma.event.delete({
    where: { ownerUserId: userId, id: eventId },
  })
}

export async function requestPasswordResetAction(email: string) {
  const ip = await getIPFromHeaders()

  const normalizedEmail = email.toLowerCase().trim()

  await rateLimit(`forgot:ip:${ip}`, 5, 3600) // 5 requests per hour per IP
  await rateLimit(`forgot:email:${normalizedEmail}`, 3, 3600) // 3 requests per hour per email

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

  await rateLimit(`login:ip:${ip}`, 5, 60) // 5 requests per minute per IP
  await rateLimit(`login:email:${normalizedEmail}`, 5, 60) // 5 requests per minute per email

  await auth.api.signInEmail({
    body: {
      email: normalizedEmail,
      password,
      rememberMe: true,
    },
    headers: await headers(),
  })
}

async function getIPFromHeaders() {
  const headersList = await headers()

  return (
    headersList.get('x-forwarded-for')?.split(',')[0] ??
    headersList.get('x-real-ip') ??
    'unknown'
  )
}
