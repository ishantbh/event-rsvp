'use client'

import Link from 'next/link'

import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/theme/mode-toggle'
import { UserAvatar } from '@/components/user-avatar'

export function Header() {
  const { data: session, isPending, error, refetch } = authClient.useSession()

  return (
    <header className='fixed top-0 left-0 right-0 border-b bg-background/80 backdrop-blur z-10'>
      <div className='w-full max-w-6xl mx-auto h-16 flex items-center justify-between px-4'>
        <div className='text-lg font-semibold tracking-wide'>
          <Link href='/'>YesToGo</Link>
        </div>

        <div className='flex items-center gap-3'>
          {!isPending && !error && (
            <nav>
              <ul className='flex items-center'>
                {session ? (
                  <li>
                    <Button
                      variant='link'
                      className='text-muted-foreground'
                      asChild
                    >
                      <Link href='/dashboard'>Dashboard</Link>
                    </Button>
                  </li>
                ) : (
                  <li>
                    <Button
                      variant='link'
                      className='text-muted-foreground'
                      asChild
                    >
                      <Link href='/sign-in'>Sign In</Link>
                    </Button>
                  </li>
                )}
              </ul>
            </nav>
          )}

          {session && (
            <UserAvatar
              name={session.user.name}
              image={session.user.image ?? undefined}
            />
          )}

          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
