'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { SearchIcon } from 'lucide-react'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'

export function DashboardSearch({ count }: { count: number }) {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)

    params.set('page', '1')

    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <InputGroup className='w-full max-w-md mx-auto'>
      <InputGroupInput
        defaultValue={searchParams.get('query')?.toString()}
        placeholder='Search...'
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupAddon align='inline-end'>
        {count} {count === 1 ? 'result' : 'results'}
      </InputGroupAddon>
    </InputGroup>
  )
}
