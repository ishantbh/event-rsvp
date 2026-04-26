import { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { EventForm } from '@/components/event-form'
import { Unauthorized } from '@/components/unauthorized'

export const metadata: Metadata = {
  title: 'Edit Event',
}

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return <Unauthorized />
  }

  const event = await prisma.event.findUnique({
    where: { ownerUserId: session.user.id, id: id },
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      eventDate: true,
      capacity: true,
    },
  })

  if (!event) {
    notFound()
  }

  return (
    <div className='flex items-center justify-center flex-1'>
      <EventForm event={event} />
    </div>
  )
}
