"use server"

import * as z from 'zod'
import bcryptjs from 'bcryptjs'

import { db } from "@/lib/db"
import { generateVerificationToken } from "@/lib/tokens"
import { SignUpSchema } from '@/schemas/index'
import { getUserByEmail } from '@/data/user'
import { sendVerificationEmail } from '@/lib/mail'

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
    const validatedFields = SignUpSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields" }
    }

    const { name, email, password } = validatedFields.data
    const hashedPassword = await bcryptjs.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return { error: "Email is taken! Try to login" }
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    const verificationToken = await generateVerificationToken(email)

    await sendVerificationEmail(verificationToken.email, verificationToken.token)
    
    //TODO: suggest user to set a profile photo immediately after creating account 

    return { success: "Check your email!", isCodeMode: true }
}