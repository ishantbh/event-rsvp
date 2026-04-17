import Link from 'next/link'
import { FrownIcon } from 'lucide-react'

export default function NotFound() {
  return (
    <div className='flex-1 flex flex-col items-center justify-center gap-4'>
      <FrownIcon className='size-10 text-gray-400' />
      <h2 className='text-xl font-semibold'>404 Not Found</h2>
      <p>Could not find the requested resource</p>
      <Link
        href='/'
        className='mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400'
      >
        Go Back Home
      </Link>
    </div>
  )
}
