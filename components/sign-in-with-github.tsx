'use client'

import { toast } from 'sonner'

import { authClient } from '@/lib/auth-client'
import { GitHubIcon } from '@/components/assets/github-icons'
import { Button } from '@/components/ui/button'

export function SignInWithGitHub() {
  async function signInWithGitHub() {
    await authClient.signIn.social(
      {
        provider: 'github',
        callbackURL: '/dashboard',
      },
      {
        onError: (ctx) => {
          toast.error(ctx.error.message)
        },
      },
    )
  }

  return (
    <Button type='button' variant='outline' onClick={signInWithGitHub}>
      <GitHubIcon />
      <span>Sign in with GitHub</span>
    </Button>
  )
}
