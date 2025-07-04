import * as z from 'zod'

export const NewPasswordSchema = z.object({
    password: z.string().min(6, 'Min 6 characters')

})

export const ResetSchema = z.object({
    email: z.string().email('Email is required'),
})

export const LoginSchema = z.object({
    email: z.string().email('Email is required'),
    password: z.string().min(1, 'Password is required'),
    code: z.optional(z.string()),
})

export const SignUpSchema = z.object({
    name: z.string().min(3, 'Min 3 characters'),
    email: z.string().email('Email is required'),
    password: z.string().min(6, 'Min 6 characters'),
    code: z.optional(z.string()),
})

export const ChangeNameSchema = z.object({
    name: z.string().min(3, 'Min 3 characters'),

})
