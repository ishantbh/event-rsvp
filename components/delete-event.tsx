'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, Trash2Icon } from 'lucide-react'

import { deleteEventAction } from '@/lib/actions'
import { Button } from '@/components/ui/button'

export function DeleteEvent({ eventId }: { eventId: string }) {
  const router = useRouter()

  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    setIsDeleting(true)

    try {
      await deleteEventAction(eventId)

      toast.success('Event deleted successfully')

      router.replace('/dashboard')
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Something went wrong',
      )
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Button
      variant='destructive'
      size='icon-lg'
      title='Delete event'
      onClick={handleDelete}
    >
      {isDeleting ? <Loader2 className='animate-spin' /> : <Trash2Icon />}
      <span className='sr-only'>Delete event</span>
    </Button>
  )
}
