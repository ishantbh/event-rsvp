import { createInviteAction } from '@/lib/actions'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type EventInviteProps = {
  eventId: string
}

export function EventInvite({ eventId }: EventInviteProps) {
  const createInviteActionForEvent = createInviteAction.bind(null, eventId)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invite Link</CardTitle>
        <CardDescription>
          Share this link with guests so they can RSVP without creating an
          account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={createInviteActionForEvent}>
          <Button>Generate Link</Button>
        </form>
      </CardContent>
    </Card>
  )
}
