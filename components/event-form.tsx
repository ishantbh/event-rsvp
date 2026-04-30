'use client'

import { useRouter } from 'next/navigation'
import { useForm } from '@tanstack/react-form'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import type { EventFormActionResponse } from '@/lib/actions'
import { createEventAction, updateEventAction } from '@/lib/actions'
import { EventFormSchema } from '@/lib/schemas'
import { formatDateTimeLocal } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type EventFormProps = {
  event?: {
    id: string
    title: string
    description?: string | null
    location?: string | null
    eventDate?: Date | null
    capacity?: number | null
  }
}

export function EventForm({ event }: EventFormProps) {
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      title: event?.title ?? '',
      description: event?.description ?? '',
      location: event?.location ?? '',
      eventDate: event?.eventDate ? formatDateTimeLocal(event.eventDate) : '',
      capacity: event?.capacity ?? undefined,
    },
    validators: {
      onSubmit: EventFormSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value)
      let res: EventFormActionResponse

      if (event) {
        // update event
        res = await updateEventAction({
          id: event.id,
          ...value,
        })
      } else {
        // create event
        res = await createEventAction(value)
      }

      if (res.error) {
        toast.error(res.error)
        return
      }

      if (res.eventId) {
        toast.success('Success')
        router.push(`/events/${res.eventId}`)
      }
    },
  })

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>{event ? 'Edit Event' : 'Create Event'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id='event-form'
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field
              name='title'
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder='Team Dinner'
                      required
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
            <form.Field
              name='description'
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
            <form.Field
              name='location'
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Location</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder='123 Main St, Anytown USA'
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />

            <form.Field
              name='capacity'
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Capacity</FieldLabel>
                    <Input
                      type='number'
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(e.target.valueAsNumber)
                      }
                      aria-invalid={isInvalid}
                      placeholder='1000'
                      min='1'
                      max='10000'
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />

            <form.Field
              name='eventDate'
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Date and Time</FieldLabel>
                    <Input
                      type='datetime-local'
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    />
                    <FieldDescription>
                      Optional, you can add this later
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation='horizontal'>
          <Button type='button' variant='outline' onClick={() => form.reset()}>
            Reset
          </Button>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type='submit' form='event-form' disabled={!canSubmit}>
                {isSubmitting ? (
                  <>
                    <Loader2 className='size-4 animate-spin' />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit Event</span>
                )}
              </Button>
            )}
          />
        </Field>
      </CardFooter>
    </Card>
  )
}
