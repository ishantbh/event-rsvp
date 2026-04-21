import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { nextCookies } from 'better-auth/next-js'

import prisma from '@/lib/prisma'
import { sendResetEmail } from '@/lib/mail'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }) => {
      await sendResetEmail({
        to: user.email,
        resetUrl: url,
        userName: user.name,
      })
    },
  },
  plugins: [nextCookies()],
})
