import { Metadata } from 'next'

import { NewEventForm } from '@/components/new-event-form'

export const metadata: Metadata = {
  title: 'New Event',
}

export default function NewEventPage() {
  return (
    <div className='flex items-center justify-center flex-1'>
      <NewEventForm />
    </div>
  )
}
