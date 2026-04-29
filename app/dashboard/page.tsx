import { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { DashboardContent } from '@/components/dashboard-content'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/sign-in')
  }

  const searchParams = await props.searchParams
  const query = searchParams?.query?.trim()
  const currentPage = Number(searchParams?.page) || 1

  return (
    <DashboardContent
      userId={session.user.id}
      query={query}
      currentPage={currentPage}
    />
  )
}
