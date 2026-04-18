import Link from 'next/link'
import { ShieldBanIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function Unauthorized() {
  return (
    <div className='flex-1 flex flex-col items-center justify-center gap-4'>
      <ShieldBanIcon className='size-10 text-gray-400' />
      <h2 className='text-xl font-semibold'>Unauthorized</h2>
      <p>You must be signed in to view this page</p>
      <Button asChild>
        <Link href='/'>Go Back Home</Link>
      </Button>
    </div>
  )
}
