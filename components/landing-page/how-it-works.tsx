'use client'

import { motion } from 'framer-motion'
import { CalendarPlusIcon, LinkIcon, BarChart3Icon } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Create your event',
    description:
      'Add your event details like date, location, and capacity in seconds.',
    icon: CalendarPlusIcon,
  },
  {
    number: '02',
    title: 'Share your invite link',
    description:
      'Send unique invite links to your attendees - no sign-up required for them.',
    icon: LinkIcon,
  },
  {
    number: '03',
    title: 'Track responses',
    description: "See who's going, maybe, or not going from your dashboard.",
    icon: BarChart3Icon,
  },
]

export function HowItWorks() {
  return (
    <section id='how-it-works' className='w-full border-b'>
      <div className='mx-auto max-w-6xl px-6 py-20 lg:py-24'>
        {/* Section Header */}
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
            How it works
          </h2>
          <p className='mt-3 text-muted-foreground'>
            Plan your event and collect RSVPs in three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-3'>
          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: 'easeOut',
                }}
                className='group rounded-xl border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-primary/5'
              >
                {/* Icon + Step Number */}
                <div className='mb-4 flex items-center justify-between'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-lg border bg-muted/40'>
                    <Icon className='h-5 w-5' />
                  </div>
                  <span className='text-sm font-medium text-muted-foreground'>
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className='mb-2 text-lg font-semibold'>{step.title}</h3>
                <p className='text-sm leading-relaxed text-muted-foreground'>
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
