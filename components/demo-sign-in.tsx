'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

import { loginDemoUserAction } from '@/lib/actions'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'

export function DemoSignIn() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { refetch } = authClient.useSession()

  function handleDemoSignIn() {
    startTransition(async () => {
      const res = await loginDemoUserAction()

      if (res?.error) {
        toast.error(res.error)
        return
      }

      toast.success('Sign in successful')

      // loginAction runs on server and does not update client session so,
      // we need to manually update client session
      await refetch()

      router.replace('/dashboard')
    })
  }

  return (
    <Button
      type='button'
      disabled={isPending}
      onClick={handleDemoSignIn}
      className='mt-4'
    >
      {isPending ? (
        <>
          <Loader2 className='size-4 animate-spin' />
          <span>Signing in...</span>
        </>
      ) : (
        <span>Sign In with Demo User</span>
      )}
    </Button>
  )
}
