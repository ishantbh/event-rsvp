import Link from 'next/link'

import prisma from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { NoEvents } from '@/components/no-events'

type DashboardContentProps = {
  userId: string
}

export async function DashboardContent({ userId }: DashboardContentProps) {
  const rows = await prisma.event.findMany({
    where: { ownerUserId: userId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      location: true,
      eventDate: true,
    },
  })

  const events = rows.map((row) => ({
    ...row,
    eventDate: row.eventDate ? new Date(row.eventDate) : null,
  }))

  return (
    <div className='flex-1 flex flex-col gap-6'>
      <div className='flex items-center justify-between gap-2'>
        <div>
          <h1 className='text-2xl font-semibold tracking-tight'>Your Events</h1>
          <p className='text-sm text-muted-foreground'>
            Track attendee responses and manage invite links.
          </p>
        </div>

        <Button>
          <Link href='/events/new'>Create event</Link>
        </Button>
      </div>

      {/* Your events */}
      {events.length === 0 ? (
        <NoEvents />
      ) : (
        <ul className='grid gap-4 md:grid-cols-2'>
          {events.map((event) => (
            <div key={event.id}>{event.title}</div>
          ))}
        </ul>
      )}
    </div>
  )
}
