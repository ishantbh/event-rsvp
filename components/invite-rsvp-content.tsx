import { notFound } from 'next/navigation'

import prisma from '@/lib/prisma'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { InviteRsvpForm } from '@/components/invite-rsvp-form'

type InviteRsvpContentProps = {
  token: string
  submitted: boolean
}

export async function InviteRsvpContent({
  token,
  submitted,
}: InviteRsvpContentProps) {
  const row = await prisma.eventInvite.findUnique({
    where: { token },
    include: {
      event: {
        select: {
          id: true,
          title: true,
          description: true,
          location: true,
          eventDate: true,
          capacity: true,
          _count: {
            select: {
              eventRsvps: true,
            },
          },
        },
      },
    },
  })

  if (!row) {
    return notFound()
  }

  const { event } = row

  return (
    <div className='mx-auto w-full max-w-2xl'>
      <Card>
        <CardHeader className='space-y-3'>
          <Badge variant='secondary'>RSVP</Badge>
          <CardTitle>{event.title}</CardTitle>
          <p className='text-sm text-muted-foreground'>
            {event.eventDate?.toLocaleString() ?? 'No date selected'}
            {event.location ? ` - ${event.location}` : ''}
          </p>
          {event.description && (
            <CardDescription>{event.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {submitted && (
            <p className='mb-4 rounded-md border border-primary/50 bg-primary/50 p-3 text-primary-foreground'>
              Thanks. Your RSVP has been recorded.
            </p>
          )}

          {event.capacity && event._count.eventRsvps >= event.capacity && (
            <div className='mb-4 rounded-md border border-amber-400/50 bg-amber-400/10'>
              <p className='p-3 text-amber-400 font-semibold text-sm'>
                This event is full.
              </p>
            </div>
          )}

          {!event.eventDate || event.eventDate.getTime() > Date.now() ? (
            <InviteRsvpForm token={token} submitted={submitted} />
          ) : (
            <div className='mb-4 rounded-md border border-destructive/50 bg-destructive/10'>
              <p className='p-3 text-destructive font-semibold text-sm'>
                This event has already ended.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
