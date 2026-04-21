import { Metadata } from 'next'
import { headers } from 'next/headers'

import { auth } from '@/auth'
import { Unauthorized } from '@/components/unauthorized'
import { DashboardContent } from '@/components/dashboard-content'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return <Unauthorized />
  }

  return <DashboardContent userId={session.user.id} />
}
