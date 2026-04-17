import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/theme/mode-toggle'

export function Header() {
  return (
    <header className='border-b bg-background backdrop-blur'>
      <div className='w-full max-w-6xl mx-auto h-16 flex items-center justify-between px-4'>
        <div className='text-sm font-semibold tracking-wide'>
          <Link href='/'>Event RSVP</Link>
        </div>

        <div className='flex items-center gap-4'>
          <nav>
            <ul className='flex items-center gap-4'>
              <li>
                <Button
                  variant='link'
                  className='text-muted-foreground'
                  asChild
                >
                  <Link href='/dashboard'>Dashboard</Link>
                </Button>
              </li>
            </ul>
          </nav>

          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
