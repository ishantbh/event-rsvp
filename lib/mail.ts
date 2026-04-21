import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendResetEmail({
  to,
  resetUrl,
  userName,
}: {
  to: string
  resetUrl: string
  userName: string
}) {
  return await resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    template: {
      id: 'password-reset',
      variables: {
        user_name: userName,
        reset_password_url: resetUrl,
      },
    },
  })
}
