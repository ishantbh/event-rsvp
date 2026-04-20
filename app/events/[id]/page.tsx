import { headers } from 'next/headers'

import { auth } from '@/auth'
import { EventDetailContent } from '@/components/event-detail-content'
import { Unauthorized } from '@/components/unauthorized'

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
    return <Unauthorized />
  }

  return <EventDetailContent userId={session.user.id} eventId={id} />
}
