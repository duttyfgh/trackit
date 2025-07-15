"use server"

import { db } from "@/lib/db"
import { signOut } from "@/auth"
import { getUserByEmail } from "@/data/user"

export const deleteAccount = async (email: string) => {
    const existingUser = await getUserByEmail(email)

    if (!existingUser) return
    
    await signOut()
    
    await db.user.delete({
        where: { id: existingUser.id }
    })

}

export const changeUserName = async (name: string, email: string) => {
    const existingUser = await getUserByEmail(email)

    if (!existingUser) {
        return
    }

    if (existingUser.name === name) {
        return
    }

    await db.user.update({
        where: { id: existingUser.id },
        data: { name }
    })

}