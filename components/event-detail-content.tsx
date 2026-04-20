import Link from 'next/link'
import { notFound } from 'next/navigation'

import prisma from '@/lib/prisma'
import { RsvpStatus as PrismaRsvpStatus } from '@/lib/generated/prisma/enums'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EventInvite } from '@/components/event-invite'
import { AttendeeList } from '@/components/attendee-list'

type EventDetailContentProps = {
  userId: string
  eventId: string
}

export async function EventDetailContent({
  userId,
  eventId,
}: EventDetailContentProps) {
  const row = await prisma.event.findUnique({
    where: {
      ownerUserId: userId,
      id: eventId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      eventDate: true,
      invite: { select: { token: true } },
      eventRsvps: {
        orderBy: { respondedAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          status: true,
          respondedAt: true,
        },
      },
    },
  })

  if (!row) {
    notFound()
  }

  const event = {
    ...row,
    eventRsvpCounts: row.eventRsvps.reduce(
      (acc, item) => {
        acc[item.status]++
        return acc
      },
      { going: 0, maybe: 0, not_going: 0 } as Record<PrismaRsvpStatus, number>,
    ),
    inviteUrl: row.invite?.token
      ? `${process.env.NEXT_PUBLIC_APP_URL || ''}/invites/${row.invite.token}`
      : null,
  }

  return (
    <div className='max-w-2xl mx-auto w-full'>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-wrap items-start justify-between gap-3'>
          <div className='space-y-2'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              {event.title}
            </h1>

            <p>
              {event.eventDate?.toLocaleString() ?? 'No date selected'}
              {event.location ? ` - ${event.location}` : ''}
            </p>

            {event.description && (
              <p className='max-w-2xl text-sm text-muted-foreground'>
                {event.description}
              </p>
            )}
          </div>

          <Button variant='outline' asChild>
            <Link href='/dashboard'>Back</Link>
          </Button>
        </div>

        <div className='flex flex-wrap text-xs gap-2'>
          <Badge>Going: {event.eventRsvpCounts.going}</Badge>
          <Badge variant='secondary'>
            Maybe: {event.eventRsvpCounts.maybe}
          </Badge>
          <Badge variant='outline'>
            Not Going: {event.eventRsvpCounts.not_going}
          </Badge>
        </div>

        <EventInvite eventId={event.id} inviteUrl={event.inviteUrl} />

        <AttendeeList rsvps={event.eventRsvps} />
      </div>
    </div>
  )
}
