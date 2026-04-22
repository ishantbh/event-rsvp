import { z } from 'zod'

import { RsvpStatus as PrismaRsvpStatus } from '@/lib/generated/prisma/enums'

export const SignInFormSchema = z.object({
  email: z.email(),
  password: z.string().min(1, 'Password is required'),
})

export const SignUpFormSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.email(),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z
      .string()
      .min(8, 'Confirm password must be at least 8 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const EventFormSchema = z.object({
  title: z.string().min(1, 'Name is required'),
  description: z.string(),
  location: z.string(),
  eventDate: z.string(),
})

export const InviteRsvpFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email(),
  attendance: z.enum(PrismaRsvpStatus),

  // honeypot
  organization: z.string().catch(''),
})

export const ResetPasswordFormSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z
      .string()
      .min(8, 'Confirm password must be at least 8 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
