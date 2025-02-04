"use server"

import * as z from 'zod'
import bcryptjs from 'bcryptjs'

import { db } from "@/lib/db"
import { SignUpSchema } from '@/schemas/index'
import { getUserByEmail } from '@/data/user'

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
    const validatedFields = SignUpSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields" }
    }

    const { name, email, password } = validatedFields.data
    const hashedPassword = await bcryptjs.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return { error: "Email is taken!" }
    }

    // if the "if" above is false we can continue and create user
    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    //TODO: send verification token email
    //TODO: suggest user to set a profile photo immediately after creating account photo

    return { success: "Account has been created!" }
}