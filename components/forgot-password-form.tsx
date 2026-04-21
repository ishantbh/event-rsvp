'use client'

import Link from 'next/link'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

const ForgotPasswordFormSchema = z.object({
  email: z.email(),
})

export function ForgotPasswordForm() {
  const form = useForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onSubmit: ForgotPasswordFormSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value)
    },
  })

  return (
    <Card className='w-full max-w-sm'>
      <CardHeader>
        <CardTitle>Forgot Password?</CardTitle>
        <CardDescription>
          Enter your email to receive a password reset link
        </CardDescription>
        <CardAction>
          <Button variant='outline' asChild>
            <Link href='/sign-in'>Sign in</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form
          id='forgot-password-form'
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
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
                      placeholder='john@mail.com'
                      required
                    />
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
        <Field>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                type='submit'
                form='forgot-password-form'
                disabled={!canSubmit}
              >
                {isSubmitting && <Loader2 className='size-4 animate-spin' />}
                <span>Reset Password</span>
              </Button>
            )}
          />
        </Field>
      </CardFooter>
    </Card>
  )
}
