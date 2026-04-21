'use client'

import { useRouter } from 'next/navigation'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'

import { ResetPasswordFormSchema } from '@/lib/schemas'
import { authClient } from '@/lib/auth-client'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    validators: {
      onSubmit: ResetPasswordFormSchema,
    },
    onSubmit: async ({ value }) => {
      const { password } = value

      await authClient.resetPassword(
        {
          token,
          newPassword: password,
        },
        {
          onSuccess: () => {
            toast.success('Password changed successfully')

            router.push('/sign-in')
          },
          onError: (ctx) => {
            toast.error(ctx.error.message)
          },
        },
      )
    },
  })

  return (
    <Card className='w-full max-w-sm'>
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Enter your new password to reset your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id='reset-password-form'
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field
              name='password'
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type='password'
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
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
              name='confirmPassword'
              validators={{
                onChangeListenTo: ['password'],
                onChange: ({ value, fieldApi }) => {
                  if (value !== fieldApi.form.getFieldValue('password')) {
                    return { message: 'Passwords do not match' }
                  }
                  return undefined
                },
              }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Confirm Password
                    </FieldLabel>

                    <Input
                      type='password'
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
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
                form='reset-password-form'
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
