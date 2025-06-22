"use server"

import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { signOut } from "@/auth"

export const deleteAccount = async (email: string) => {
    const existingUser = await getUserByEmail(email)

    if (!existingUser) return

    await db.user.delete({
        where: { id: existingUser.id }
    })

    await signOut()
}

export const changeUserName = async (name: string, email: string) => {
    const existingUser = await getUserByEmail(email)

    if (!existingUser) {
        return
    }

    
    if(existingUser.name === name) {
        return
    }

    await db.user.update({
        where: { id: existingUser.id },
        data: { name }
    })

}