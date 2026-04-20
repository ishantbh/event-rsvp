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
}

export async function InviteRsvpContent({ token }: InviteRsvpContentProps) {
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
          <InviteRsvpForm />
        </CardContent>
      </Card>
    </div>
  )
}
