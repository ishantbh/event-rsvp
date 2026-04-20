import { RsvpStatus as PrismaRsvpStatus } from '@/lib/generated/prisma/enums'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type AttendeeListProps = {
  rsvps: {
    id: string
    respondedAt: Date
    name: string
    email: string
    status: PrismaRsvpStatus
  }[]
}

export function AttendeeList({ rsvps }: AttendeeListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendees</CardTitle>
      </CardHeader>
      <CardContent>
        {rsvps.length === 0 ? (
          <p className='text-sm text-muted-foreground'>No responses yet.</p>
        ) : (
          <ul className='space-y-3'>
            {rsvps.map((rsvp) => (
              <li
                key={rsvp.id}
                className='flex items-center justify-between gap-3'
              >
                <p>{rsvp.name}</p>
                <p>{rsvp.status}</p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
