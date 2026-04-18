import Link from 'next/link'
import { FrownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className='flex-1 flex flex-col items-center justify-center gap-4'>
      <FrownIcon className='size-10 text-gray-400' />
      <h2 className='text-xl font-semibold'>404 Not Found</h2>
      <p>Could not find the requested resource</p>
      <Button asChild>
        <Link href='/'>Go Back Home</Link>
      </Button>
    </div>
  )
}
