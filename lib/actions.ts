'use server'

import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { NewEventFormSchema } from '@/lib/schemas'

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

  const res = NewEventFormSchema.safeParse({
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
