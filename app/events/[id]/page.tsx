import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { EventDetailContent } from '@/components/event-detail-content'
import { EventDetailSkeleton } from '@/components/event-detail-skeleton'
import { Suspense } from 'react'

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/sign-in')
  }

  return (
    <Suspense fallback={<EventDetailSkeleton />}>
      <EventDetailContent userId={session.user.id} eventId={id} />
    </Suspense>
  )
}
