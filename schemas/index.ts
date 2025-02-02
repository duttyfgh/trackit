import * as z from 'zod'

export const LoginSchema = z.object({
    email: z.string().email('Email is required'),
    password: z.string().min(1, 'Password is required')
})

export const SignUpSchema = z.object({
    name: z.string().min(3, 'Min 3 characters'),
    email: z.string().email('Email is required'),
    password: z.string().min(6, 'Min 6 characters')
})