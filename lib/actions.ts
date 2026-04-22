'use server'

import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { InviteRsvpFormSchema, EventFormSchema } from '@/lib/schemas'

export async function createEventAction({
  title,
  description,
  location,
  eventDate,
}: {
  title: string
  description?: string
  location?: string
  eventDate?: string
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
    },
  })

  return created.id
}

export async function createInviteAction(eventId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    throw new Error('Unauthorized')
  }

  const userId = session.user.id

  const event = await prisma.event.findUnique({
    where: { ownerUserId: userId, id: eventId },
    select: { id: true },
  })

  if (!event) {
    throw new Error('Event not found')
  }

  const token = crypto.randomUUID().replace(/-/g, '')

  await prisma.eventInvite.upsert({
    where: { eventId },
    create: { eventId, token },
    update: { token },
  })

  revalidatePath(`/events/${eventId}`)
}

export async function submitRsvpAction(
  token: string,
  value: { name: string; email: string; attendance: string },
) {
  const res = InviteRsvpFormSchema.safeParse(value)

  if (res.error) {
    throw new Error(res.error.message)
  }

  const invite = await prisma.eventInvite.findUnique({
    where: { token },
    select: { id: true, eventId: true },
  })

  if (!invite) {
    throw new Error('Invite link is invalid.')
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
