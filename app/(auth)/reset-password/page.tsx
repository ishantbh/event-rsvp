import { Metadata } from 'next'

import { ResetPasswordForm } from '@/components/reset-password-form'

export const metadata: Metadata = {
  title: 'Reset Password',
}

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>
}) {
  const { token } = await searchParams

  return (
    <div className='flex items-center justify-center flex-1'>
      <ResetPasswordForm token={token} />
    </div>
  )
}
