import { Metadata } from 'next'

import { SignUpForm } from '@/components/sign-up-form'

export const metadata: Metadata = {
  title: 'Sign Up',
}

export default function SignInPage() {
  return (
    <div className='flex items-center justify-center flex-1'>
      <SignUpForm />
    </div>
  )
}
