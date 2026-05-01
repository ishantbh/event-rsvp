import { headers } from 'next/headers'
import Link from 'next/link'

import { auth } from '@/auth'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <div className='flex flex-1 flex-col gap-6'>
      {/* Faint glow */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 rounded-3xl bg-primary/5 blur-3xl'
      />

      <section className='space-y-4 text-center md:text-start'>
        <Badge
          variant='secondary'
          className='border border-muted-foreground/10 p-3'
        >
          Next.js 16 + Better Auth + Prisma
        </Badge>
        <h1 className='text-4xl font-semibold tracking-tight'>
          Create event invites and track RSVPs without the chaos
        </h1>
        <p className='max-w-2xl mx-auto md:mx-0 text-muted-foreground'>
          Create events, share unique invite links, and track responses - no
          sign-up required for attendees.
        </p>
        <div className='flex flex-wrap items-center justify-center md:justify-start gap-3'>
          {session ? (
            <Button asChild>
              <Link href='/dashboard'>Open dashboard</Link>
            </Button>
          ) : (
            <>
              <Button asChild>
                <Link href='/sign-in'>Sign in</Link>
              </Button>
              <Button variant='outline' asChild>
                <Link href='/sign-up'>Create account</Link>
              </Button>
            </>
          )}
        </div>
      </section>

      <section className='grid gap-4 md:grid-cols-3'>
        <Card>
          <CardHeader>
            <CardTitle>Create events</CardTitle>
            <CardDescription>
              Set title, date, and details in seconds.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Share invite links</CardTitle>
            <CardDescription>
              Generate a unique token per event.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Track attendance</CardTitle>
            <CardDescription>
              See attendee list and response totals at a glance.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p>Going, Maybe, and Not going are always up-to-date.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
