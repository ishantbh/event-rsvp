'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { DotIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function FinalCTA() {
  return (
    <section className='relative w-full overflow-hidden border-b'>
      <div className='relative mx-auto max-w-4xl px-6 py-20 text-center lg:py-24'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className='space-y-6'
        >
          {/* Heading */}
          <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
            Start planning your next event
          </h2>

          {/* Subtext */}
          <p className='mx-auto max-w-xl text-muted-foreground'>
            Create your event, share your link, and track RSVPs in real time -
            all in one simple flow.
          </p>

          {/* CTA */}
          <div className='flex flex-col items-center justify-center gap-3 sm:flex-row'>
            <Button size='lg' asChild>
              <Link href='/events/new'>Create your first event</Link>
            </Button>
            <Button variant='outline' size='lg' asChild>
              <Link href='/dashboard'>Dashboard</Link>
            </Button>
          </div>

          {/* Microcopy */}
          <p className='text-sm text-muted-foreground flex flex-col gap-2 items-center justify-center sm:flex-row sm:gap-0'>
            <span>No sign-up required for attendees</span>
            <DotIcon className='hidden sm:block' />
            <span>Free to use</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
