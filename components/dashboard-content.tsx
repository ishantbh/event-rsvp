import Link from 'next/link'

import { Button } from '@/components/ui/button'

type DashboardContentProps = {
  userId: string
}

export function DashboardContent({ userId }: DashboardContentProps) {
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
    </div>
  )
}
