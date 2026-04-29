import { Metadata } from 'next'

import { EventForm } from '@/components/event-form'
import { auth } from '@/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'New Event',
}

export default async function NewEventPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/sign-in')
  }
  return (
    <div className='flex items-center justify-center flex-1'>
      <EventForm />
    </div>
  )
}
