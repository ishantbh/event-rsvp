'use client'

import { useRouter } from 'next/navigation'
import { useForm } from '@tanstack/react-form'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { RsvpStatus as PrismaRsvpStatus } from '@/lib/generated/prisma/enums'
import { InviteRsvpFormSchema } from '@/lib/schemas'
import { submitRsvpAction } from '@/lib/actions'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type InviteRsvpFormProps = {
  token: string
  submitted: boolean
}

export function InviteRsvpForm({ token, submitted }: InviteRsvpFormProps) {
  const router = useRouter()

  const submitRsvpActionWithToken = submitRsvpAction.bind(null, token)

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      attendance: '',
      organization: '', // honeypot
    },
    validators: {
      onSubmit: InviteRsvpFormSchema,
    },
    onSubmit: async ({ value }) => {
      const res = await submitRsvpActionWithToken(value)

      if (res?.error) {
        toast.error(res.error)
        return
      }

      router.replace(`/invites/${token}?submitted=1`)
    },
  })

  return (
    <form
      id='invite-rsvp-form'
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.Field
          name='name'
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder='John Doe'
                  required
                  disabled={submitted}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <form.Field
          name='email'
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  type='email'
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder='john@example.com'
                  required
                  disabled={submitted}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <form.Field
          name='attendance'
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Attendance</FieldLabel>
                <Select
                  name={field.name}
                  value={field.state.value}
                  onValueChange={field.handleChange}
                  disabled={submitted}
                >
                  <SelectTrigger
                    id='invite-rsvp-form-attendance'
                    aria-invalid={isInvalid}
                    className='min-w-30'
                  >
                    <SelectValue placeholder='Select' />
                  </SelectTrigger>

                  <SelectContent position='item-aligned'>
                    <SelectItem value={PrismaRsvpStatus.going}>
                      Going
                    </SelectItem>
                    <SelectItem value={PrismaRsvpStatus.maybe}>
                      Maybe
                    </SelectItem>
                    <SelectItem value={PrismaRsvpStatus.not_going}>
                      Not Going
                    </SelectItem>
                  </SelectContent>
                </Select>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <form.Field
          name='organization'
          children={(field) => {
            return (
              <input
                name={field.name}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                tabIndex={-1}
                autoComplete='off'
                className='absolute left-[-9999px]'
                aria-hidden='true'
              />
            )
          }}
        />

        <Field orientation='horizontal'>
          <Button
            type='button'
            variant='outline'
            onClick={() => form.reset()}
            disabled={submitted}
          >
            Reset
          </Button>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type='submit' disabled={!canSubmit || submitted}>
                {isSubmitting ? (
                  <>
                    <Loader2 className='size-4 animate-spin' />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit</span>
                )}
              </Button>
            )}
          />
        </Field>
      </FieldGroup>
    </form>
  )
}
