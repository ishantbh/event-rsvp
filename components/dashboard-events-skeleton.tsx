import { DashboardPagination } from '@/components/dashboard-pagination'
import { DashboardSearch } from '@/components/dashboard-search'
import { Skeleton } from '@/components/ui/skeleton'

export function DashboardEventsSkeleton() {
  return (
    <div className='flex-1 flex flex-col gap-6'>
      <DashboardSearch count={0} />

      <ul className='grid gap-4 md:grid-cols-2'>
        {Array.from({ length: 4 }).map((_, i) => (
          <li key={i}>
            <Skeleton className='h-33 w-full rounded-xl' />
          </li>
        ))}
      </ul>

      <DashboardPagination totalPages={1} />
    </div>
  )
}
