import Link from 'next/link'
import { headers } from 'next/headers'

import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/theme/mode-toggle'
import { UserAvatar } from '@/components/user-avatar'

export async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <header className='border-b bg-background backdrop-blur'>
      <div className='w-full max-w-6xl mx-auto h-16 flex items-center justify-between px-4'>
        <div className='text-sm font-semibold tracking-wide'>
          <Link href='/'>Event RSVP</Link>
        </div>

        <div className='flex items-center gap-4'>
          <nav>
            <ul className='flex items-center gap-4'>
              {session ? (
                <>
                  <li>
                    <Button
                      variant='link'
                      className='text-muted-foreground'
                      asChild
                    >
                      <Link href='/dashboard'>Dashboard</Link>
                    </Button>
                  </li>

                  <UserAvatar />
                </>
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

          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
