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
import { Field, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export function ForgotPasswordForm() {
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
        <form id='forgot-password-form' action=''>
          <FieldGroup>
            <Field>
              <Label>Email</Label>
              <Input
                type='email'
                id='email'
                name='email'
                placeholder='john@mail.com'
                required
              />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field>
          <Button type='submit' form='forgot-password-form'>
            Send Reset Link
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
