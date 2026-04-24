'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'

import { cn, generatePagination } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'

export function DashboardPagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const allPages = generatePagination(currentPage, totalPages)

  return (
    <div className='inline-flex items-center justify-center gap-2 md:gap-4 mt-4'>
      <PaginationArrow
        direction='left'
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <ButtonGroup>
        {allPages.map((page, index) => {
          let position: 'first' | 'last' | 'single' | 'middle' | undefined

          if (index === 0) position = 'first'
          if (index === allPages.length - 1) position = 'last'
          if (allPages.length === 1) position = 'single'
          if (page === '...') position = 'middle'

          return (
            <PaginationNumber
              key={`${page}-${index}`}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          )
        })}
      </ButtonGroup>

      <PaginationArrow
        direction='right'
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  )
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string
  href: string
  position?: 'first' | 'last' | 'middle' | 'single'
  isActive: boolean
}) {
  return (
    <Button
      variant={isActive ? 'default' : 'outline'}
      size='lg'
      className={cn({
        'border-primary': isActive || position === 'middle',
      })}
      asChild
    >
      <Link
        href={href}
        className={cn('w-10', {
          'pointer-events-none': isActive || position === 'middle',
        })}
      >
        {page}
      </Link>
    </Button>
  )
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string
  direction: 'left' | 'right'
  isDisabled?: boolean
}) {
  return (
    <Button variant='outline' size='icon-lg' disabled={isDisabled} asChild>
      <Link
        href={href}
        className={cn(isDisabled && 'pointer-events-none opacity-50')}
      >
        {direction === 'left' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
      </Link>
    </Button>
  )
}
