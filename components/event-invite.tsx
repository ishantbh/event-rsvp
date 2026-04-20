import { createInviteAction } from '@/lib/actions'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { InviteLink } from '@/components/invite-link'

type EventInviteProps = {
  eventId: string
  inviteUrl: string | null
}

export function EventInvite({ eventId, inviteUrl }: EventInviteProps) {
  const createInviteActionForEvent = createInviteAction.bind(null, eventId)

  return (
    <Card className='max-w-2xl'>
      <CardHeader>
        <CardTitle>Invite Link</CardTitle>
        <CardDescription>
          Share this link with guests so they can RSVP without creating an
          account.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-3'>
        <InviteLink inviteUrl={inviteUrl} />

        <form action={createInviteActionForEvent}>
          <Button>Generate Link</Button>
        </form>
      </CardContent>
    </Card>
  )
}
