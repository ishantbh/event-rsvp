import { Loader } from 'lucide-react'

export default function Loading() {
  return (
    <div className='flex items-center justify-center flex-1'>
      <Loader className='animate-spin size-24 text-muted-foreground' />
    </div>
  )
}
