import { redirect } from 'next/navigation'
import { RsvpStatus as PrismaRsvpStatus } from '@/lib/generated/prisma/enums'
import prisma from '@/lib/prisma'

import { DashboardPagination } from '@/components/dashboard-pagination'
import { DashboardSearch } from '@/components/dashboard-search'
import { EventListItem } from '@/components/event-list-item'
import { NoEvents } from '@/components/no-events'

const EVENTS_PER_PAGE = 10

type DashboardEventsProps = {
  userId: string
  query: string | undefined
  currentPage: number
}

export async function DashboardEvents({
  userId,
  query,
  currentPage,
}: DashboardEventsProps) {
  await new Promise((resolve) => setTimeout(resolve, 3000))

  const [rows, eventsCount] = await prisma.$transaction([
    prisma.event.findMany({
      where: {
        ownerUserId: userId,
        ...(query && { title: { contains: query, mode: 'insensitive' } }),
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        location: true,
        eventDate: true,
        eventRsvps: { select: { status: true } },
      },
      skip: (currentPage - 1) * EVENTS_PER_PAGE,
      take: EVENTS_PER_PAGE,
    }),
    prisma.event.count({
      where: {
        ownerUserId: userId,
        ...(query && { title: { contains: query, mode: 'insensitive' } }),
      },
    }),
  ])

  const totalPages = Math.ceil(eventsCount / EVENTS_PER_PAGE)

  // Redirect to dashboard if user tries to access a page number in searchparams that doesn't exist
  if (totalPages > 0 && currentPage > totalPages) {
    redirect('/dashboard')
  }

  const now = Date.now()

  const events = rows.map((row) => ({
    ...row,
    eventRsvps: row.eventRsvps.reduce(
      (acc, item) => {
        acc[item.status]++
        return acc
      },
      { going: 0, maybe: 0, not_going: 0 } as Record<PrismaRsvpStatus, number>,
    ),
    active: !row.eventDate || row.eventDate.getTime() > now,
  }))

  return (
    <>
      <DashboardSearch count={eventsCount} />

      {/* Your events */}
      {events.length === 0 ? (
        <NoEvents query={query} />
      ) : (
        <>
          <ul className='grid gap-4 md:grid-cols-2'>
            {events.map((event) => (
              <EventListItem key={event.id} event={event} />
            ))}
          </ul>

          <DashboardPagination totalPages={totalPages} />
        </>
      )}
    </>
  )
}
