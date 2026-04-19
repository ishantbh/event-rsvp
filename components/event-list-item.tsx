import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardAction, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type EventListItemProps = {
  event: {
    id: string
    title: string
    location: string | null
    eventDate: Date | null
  }
}

export function EventListItem({ event }: EventListItemProps) {
  return (
    <li>
      <Card>
        <CardHeader className='space-y-3'>
          <CardTitle className='text-lg'>{event.title}</CardTitle>

          <CardAction>
            <Button size='sm' asChild>
              <Link href={`/events/${event.id}`}>Open</Link>
            </Button>
          </CardAction>

          <div className='flex flex-wrap gap-2 items-center'>
            <Badge>Going: 0</Badge>
            <Badge variant='secondary'>Maybe: 0</Badge>
            <Badge variant='outline'>Not Going: 0</Badge>
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
