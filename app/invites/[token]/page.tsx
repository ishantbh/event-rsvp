import { InviteRsvpContent } from '@/components/invite-rsvp-content'

export default async function InvitePage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params

  return <InviteRsvpContent token={token} />
}
