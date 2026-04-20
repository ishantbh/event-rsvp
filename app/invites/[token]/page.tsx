import { InviteRsvpContent } from '@/components/invite-rsvp-content'

export default async function InvitePage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>
  searchParams: Promise<{ submitted: string }>
}) {
  const [{ token }, { submitted }] = await Promise.all([params, searchParams])

  return <InviteRsvpContent token={token} submitted={submitted === '1'} />
}
