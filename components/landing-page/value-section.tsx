'use client'

import { motion } from 'framer-motion'
import { UserX, Activity, LayoutDashboard, ShieldCheck } from 'lucide-react'
import Image from 'next/image'

const values = [
  {
    title: 'No sign-ups for attendees',
    description: 'Anyone can RSVP instantly using your invite link.',
    icon: UserX,
  },
  {
    title: 'Response tracking',
    description: "See exactly who's going, maybe, or not going",
    icon: Activity,
  },
  {
    title: 'Built for events, not hacked together',
    description:
      'No spreadsheets or forms - just a clean RSVP flow that works.',
    icon: LayoutDashboard,
  },
  {
    title: 'Control capacity with ease',
    description: 'Set limits and automatically stop responses when full.',
    icon: ShieldCheck,
  },
]

export function ValueSection() {
  return (
    <section id='features' className='w-full border-b'>
      <div className='mx-auto max-w-6xl px-6 py-20 lg:py-24'>
        <div className='grid items-center gap-12 lg:grid-cols-2 text-center md:text-start'>
          {/* LEFT: TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='space-y-8'
          >
            <div className='space-y-4'>
              <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
                Everything you need to manage event RSVPs - nothing you don't
              </h2>
              <p className='text-muted-foreground max-w-xl'>
                Skip messy group chats and manual tracking. YesToGo gives you a
                simple, focused way to manage event responses from start to
                finish.
              </p>
            </div>

            {/* Value Points */}
            <div className='space-y-5'>
              {values.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.08,
                      ease: 'easeOut',
                    }}
                    className='flex items-center gap-4 flex-col md:flex-row justify-center md:items-start md:justify-start'
                  >
                    <div className='flex h-10 w-10 items-center justify-center rounded-lg border bg-background'>
                      <Icon className='h-5 w-5' />
                    </div>
                    <div>
                      <h3 className='text-sm font-semibold'>{item.title}</h3>
                      <p className='text-sm text-muted-foreground'>
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* RIGHT: SCREENSHOT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='relative'
          >
            <div className='relative rounded-2xl border bg-background p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'>
              <Image
                src='/screenshots/event-details-light.png'
                alt='YesToGo event details and RSVP tracking'
                width={1200}
                height={800}
                className='rounded-xl dark:hidden'
              />

              <Image
                src='/screenshots/event-details-dark.png'
                alt='YesToGo event details and RSVP tracking'
                width={1200}
                height={800}
                className='rounded-xl hidden dark:block'
              />

              {/* subtle inner border */}
              <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5' />
            </div>

            {/* subtle glow */}
            <div className='pointer-events-none absolute -inset-6 -z-10 bg-linear-to-tr from-primary/10 via-transparent to-transparent blur-2xl' />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
