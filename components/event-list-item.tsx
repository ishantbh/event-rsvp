import Link from 'next/link'

import { RsvpStatus as PrismaRsvpStatus } from '@/lib/generated/prisma/enums'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type EventListItemProps = {
  event: {
    id: string
    title: string
    location: string | null
    eventDate: Date | null
    eventRsvps: Record<PrismaRsvpStatus, number>
    active: boolean
  }
}

export function EventListItem({ event }: EventListItemProps) {
  const { going, maybe, not_going } = event.eventRsvps

  return (
    <li>
      <Card className={cn(!event.active && 'opacity-60')}>
        <CardHeader className='space-y-3'>
          <CardTitle className='text-lg flex gap-3 items-center'>
            <span>{event.title}</span>
            {!event.active && <Badge variant='destructive'>Ended</Badge>}
          </CardTitle>

          <CardAction>
            <Button size='sm' asChild>
              <Link href={`/events/${event.id}`}>Open</Link>
            </Button>
          </CardAction>

          <div className='flex flex-wrap gap-2 items-center'>
            <Badge>Going: {going}</Badge>
            <Badge variant='secondary'>Maybe: {maybe}</Badge>
            <Badge variant='outline'>Not Going: {not_going}</Badge>
          </div>

          <p className='text-sm text-muted-foreground'>
            {event.eventDate?.toLocaleString() ?? 'No date selected'}
            {event.location ? ` - ${event.location}` : ''}
          </p>
        </CardHeader>
      </Card>
    </li>
  )
}
