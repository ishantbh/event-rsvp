import { z } from 'zod'

export const SignInFormSchema = z.object({
  email: z.email(),
  password: z.string().min(1, 'Password is required'),
})

export const SignUpFormSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.email(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const NewEventFormSchema = z.object({
  title: z.string().min(1, 'Name is required'),
  description: z.string(),
  location: z.string(),
  eventDate: z.string(),
})
