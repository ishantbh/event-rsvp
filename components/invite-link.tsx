'use client'

import { CheckIcon, CopyIcon } from 'lucide-react'

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
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
  const [copyToClipboard, isCopied] = useCopyToClipboard()

  if (!inviteUrl) {
    return <p>No invite link generated yet.</p>
  }

  return (
    <InputGroup>
      <InputGroupInput placeholder={inviteUrl} readOnly />
      <InputGroupAddon align='inline-end'>
        <InputGroupButton
          aria-label='Copy'
          title='Copy'
          size='icon-xs'
          onClick={() => {
            copyToClipboard(inviteUrl)
          }}
        >
          {isCopied ? <CheckIcon /> : <CopyIcon />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
