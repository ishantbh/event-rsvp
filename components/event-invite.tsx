'use client'

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
import { useActionState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

type EventInviteProps = {
  eventId: string
  inviteUrl: string | null
}

export function EventInvite({ eventId, inviteUrl }: EventInviteProps) {
  const initialState = { error: null }

  const createInviteActionForEvent = createInviteAction.bind(null, eventId)

  const [state, formAction, pending] = useActionState(
    createInviteActionForEvent,
    initialState,
  )

  return (
    <Card className='max-w-2xl'>
      <CardHeader>
        {state.error && (
          <div className='mb-4 rounded-md border border-destructive/50 bg-destructive/10'>
            <p className='p-3 text-destructive font-semibold text-sm'>
              {state.error}
            </p>
          </div>
        )}
        <CardTitle>Invite Link</CardTitle>
        <CardDescription>
          Share this link with guests so they can RSVP without creating an
          account.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-3'>
        <InviteLink inviteUrl={inviteUrl} />

        <form action={formAction}>
          <Button type='submit' disabled={pending}>
            {pending ? <Loader2 className='animate-spin' /> : 'Generate Link'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
