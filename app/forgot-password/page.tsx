import { Metadata } from 'next'

import { ForgotPasswordForm } from '@/components/forgot-password-form'

export const metadata: Metadata = {
  title: 'Forgot Password',
}

export default function ForgotPasswordPage() {
  return (
    <div className='flex items-center justify-center flex-1'>
      <ForgotPasswordForm />
    </div>
  )
}
