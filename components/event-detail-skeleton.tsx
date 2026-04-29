import { Skeleton } from '@/components/ui/skeleton'

export function EventDetailSkeleton() {
  return (
    <div className='max-w-2xl mx-auto w-full'>
      <div className='flex flex-col gap-6'>
        <div className='flex items-start justify-between gap-3'>
          <div className='space-y-2 w-full'>
            {/* Title */}
            <Skeleton className='h-8 w-full max-w-40' />

            {/* Date and location */}
            <Skeleton className='h-6 w-full max-w-50' />

            {/* Capacity */}
            <Skeleton className='h-6 w-full max-w-30' />

            {/* Description */}
            <Skeleton className='h-15 w-full max-w-2xl' />
          </div>

          <div className='flex items-center gap-2'>
            {/* Edit button */}
            <Skeleton className='h-9 w-9' />

            {/* Delete button */}
            <Skeleton className='h-9 w-9' />
          </div>
        </div>

        {/* Badges - Going, Maybe, Not Going */}
        <div className='flex flex-wrap text-xs gap-2'>
          <Skeleton className='h-5 w-16 rounded-4xl' />
          <Skeleton className='h-5 w-16 rounded-4xl' />
          <Skeleton className='h-5 w-16 rounded-4xl' />
        </div>

        {/* Invite link */}
        <Skeleton className='w-full h-42 rounded-xl' />

        {/* Attendee table */}
        <Skeleton className='w-full h-63 rounded-xl' />
      </div>
    </div>
  )
}
