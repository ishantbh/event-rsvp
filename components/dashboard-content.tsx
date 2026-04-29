import { Suspense } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { DashboardEvents } from '@/components/dashboard-events'
import { DashboardEventsSkeleton } from '@/components/dashboard-events-skeleton'

type DashboardContentProps = {
  userId: string
  query: string | undefined
  currentPage: number
}

export async function DashboardContent({
  userId,
  query,
  currentPage,
}: DashboardContentProps) {
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

      <Suspense fallback={<DashboardEventsSkeleton />}>
        <DashboardEvents
          userId={userId}
          query={query}
          currentPage={currentPage}
        />
      </Suspense>
    </div>
  )
}
