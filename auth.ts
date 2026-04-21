import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { nextCookies } from 'better-auth/next-js'

import prisma from '@/lib/prisma'
import { sendEmail } from '@/lib/mail'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }) => {
      await sendEmail({
        to: user.email,
        subject: 'Reset your password',
        html: `
          <h2>Reset your password</h2>
          <p>Click the link below to reset your password:</p>
          <a href="${url}">Reset password</a>
          <p>If you didn't request a password reset, ignore this email.</p>
        `,
      })
    },
  },
  plugins: [nextCookies()],
})
