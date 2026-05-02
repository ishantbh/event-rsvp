'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const showcases = [
  {
    title: 'Manage your events effortlessly',
    description:
      'View all your events, search instantly, and stay organized with a clean dashboard built for speed.',
    imageLight: '/screenshots/dashboard-light.png',
    imageDark: '/screenshots/dashboard-dark.png',
    alt: 'Dashboard showing list of events',
    reverse: false,
  },
  {
    title: 'Simple RSVP experience for your attendees',
    description:
      "Attendees open your link, choose their response, and they're done - no accounts, no friction.",
    imageLight: '/screenshots/rsvp-form-light.png',
    imageDark: '/screenshots/rsvp-form-dark.png',
    alt: 'RSVP form for attendees',
    reverse: true,
  },
  {
    title: 'Clear insights, no guesswork',
    description: 'Track attendance, monitor capacity, and make decisions.',
    imageLight: '/screenshots/event-details-light.png',
    imageDark: '/screenshots/event-details-dark.png',
    alt: 'Event details with RSVP analytics',
    reverse: false,
  },
]

export function ShowcaseSection() {
  return (
    <section className='w-full border-b'>
      <div className='mx-auto max-w-6xl px-6 py-20 lg:py-24'>
        {/* Header */}
        <div className='mx-auto mb-20 max-w-2xl text-center'>
          <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
            See everything in one place
          </h2>
          <p className='mt-3 text-muted-foreground'>
            From event details to RSVP analytics, YesToGo gives you a clear view
            of your event at every step.
          </p>
        </div>

        {/* Showcase Blocks */}
        <div className='space-y-24'>
          {showcases.map((item, index) => (
            <div
              key={item.title}
              className={`grid items-center gap-12 lg:grid-cols-2 ${
                item.reverse ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* TEXT */}
              <motion.div
                initial={{ opacity: 0, x: item.reverse ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`space-y-4 text-center md:text-start ${item.reverse ? 'lg:col-start-2' : ''}`}
              >
                <h3 className='text-2xl font-semibold tracking-tight'>
                  {item.title}
                </h3>
                <p className='text-muted-foreground max-w-md'>
                  {item.description}
                </p>
              </motion.div>

              {/* IMAGE */}
              <motion.div
                initial={{ opacity: 0, x: item.reverse ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                className={`relative ${item.reverse ? 'lg:col-start-1' : ''}`}
              >
                <div className='relative rounded-2xl border bg-background p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'>
                  <Image
                    src={item.imageLight}
                    alt={item.alt}
                    width={1200}
                    height={800}
                    className='rounded-xl dark:hidden'
                  />

                  <Image
                    src={item.imageDark}
                    alt={item.alt}
                    width={1200}
                    height={800}
                    className='rounded-xl hidden dark:block'
                  />

                  {/* subtle border overlay */}
                  <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5' />
                </div>

                {/* subtle glow */}
                <div className='pointer-events-none absolute -inset-6 -z-10 bg-linear-to-tr from-primary/10 via-transparent to-transparent blur-2xl' />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
