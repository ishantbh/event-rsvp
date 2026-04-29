import { Metadata } from 'next'

import { SignInForm } from '@/components/sign-in-form'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default async function SignInPage() {
  return (
    <div className='flex items-center justify-center flex-1'>
      <SignInForm />
    </div>
  )
}
