'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className='w-full border-b'>
      {/* Faint glow */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 rounded-3xl bg-primary/10 dark:bg-primary/5 blur-3xl'
      />

      <div className='relative mx-auto max-w-6xl px-6 pb-20 pt-8 lg:pb-28 text-center md:text-start'>
        <div className='grid items-center gap-12 md:grid-cols-2'>
          {/* LEFT: TEXT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='space-y-6'
          >
            <h1 className='text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>
              Create event invites and track RSVPs without the chaos
            </h1>

            <p className='max-w-xl text-lg text-muted-foreground'>
              Create events, share unique invite links, and track responses - no
              sign-up required for attendees.
            </p>

            {/* CTA */}
            <div className='flex flex-col gap-3 sm:flex-row sm:items-center justify-center md:justify-start'>
              <Button size='lg' asChild>
                <Link href='/events/new'>Create your first event</Link>
              </Button>
              <Button variant='outline' size='lg' asChild>
                <Link href='/dashboard'>Dashboard</Link>
              </Button>
            </div>

            {/* Microcopy */}
            <div className='flex flex-col gap-1 text-sm text-muted-foreground items-center md:items-start'>
              <div className='flex flex-row items-center gap-2'>
                <CheckIcon className='size-4 text-primary' />
                <span>Set up your event in seconds</span>
              </div>
              <div className='flex flex-row items-center gap-2'>
                <CheckIcon className='size-4 text-primary' />
                <span>No sign-up required for attendees</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: SCREENSHOT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className='relative'
          >
            <div className='relative rounded-2xl border bg-background p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'>
              {/* Screenshot */}
              <Image
                src='/screenshots/dashboard-light.png'
                alt='YesToGo dashboard preview'
                width={1200}
                height={800}
                className='rounded-xl dark:hidden'
                priority
                loading='eager'
              />

              <Image
                src='/screenshots/dashboard-dark.png'
                alt='YesToGo dashboard preview'
                width={1200}
                height={800}
                className='rounded-xl hidden dark:block'
                priority
                loading='eager'
              />

              {/* Optional subtle overlay for depth */}
              <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5' />
            </div>

            {/* Optional glow (very subtle) */}
            <div className='pointer-events-none absolute -inset-4 -z-10 bg-linear-to-tr from-primary/10 via-transparent to-transparent blur-2xl' />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
