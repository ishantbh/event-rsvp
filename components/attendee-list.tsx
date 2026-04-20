import { RsvpStatus as PrismaRsvpStatus } from '@/lib/generated/prisma/enums'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rsvps.map((rsvp) => (
                <TableRow key={rsvp.id}>
                  <TableCell>{rsvp.name}</TableCell>
                  <TableCell>{rsvp.email}</TableCell>
                  <TableCell>
                    <Badge variant='secondary'>
                      {rsvp.status === PrismaRsvpStatus.going
                        ? 'Going'
                        : rsvp.status === PrismaRsvpStatus.maybe
                          ? 'Maybe'
                          : 'Not Going'}
                    </Badge>
                  </TableCell>
                  <TableCell>{rsvp.respondedAt.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
