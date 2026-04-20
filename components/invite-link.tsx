'use client'

import { CopyIcon } from 'lucide-react'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'

type InviteLinkProps = {
  inviteUrl: string | null
}

export function InviteLink({ inviteUrl }: InviteLinkProps) {
  if (!inviteUrl) {
    return <p>No invite link generated yet.</p>
  }

  return (
    <InputGroup>
      <InputGroupInput placeholder={inviteUrl} readOnly />
      <InputGroupAddon align='inline-end'>
        <InputGroupButton aria-label='Copy' title='Copy' size='icon-xs'>
          <CopyIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
