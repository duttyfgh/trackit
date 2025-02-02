"use server"
import * as z from 'zod'

import { SignUpSchema } from '@/schemas/index'

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
    const validatedFields = SignUpSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields" }
    }
    return { success: "Account has been created!" }
}