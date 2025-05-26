import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { db } from "@/lib/db"
import authConfig from "@/auth.config"
import { getUserById } from "@/data/user"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"

export const {
    auth,
    handlers,
    signIn,
    signOut
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            // Allowed OAuth without email verification
            if (account?.provider !== "credentials") return true

            const existingUser = await getUserById(user.id as string)

            // Prevent signIn without email verification
            if (!existingUser?.emailVerified) return false

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

                if (!twoFactorConfirmation) return false

                // TODO: delete 2FA for next sign in - author, my choice is to keep "has user registered already" in localStorage and check if there is no it then delete 2FA

                await db.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id }
                })

            }

            return true
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            if (token.lastSeen && session.user) {
                session.user.lastSeen = token.lastSeen as string
            }

            return session
        },
        async jwt({ token }) {
            if (!token.sub) {
                return token
            }

            const existingUser = await getUserById(token.sub)

            if (!existingUser) {
                return token
            }

            token.lastSeen = existingUser.lastSeen

            return token
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig
})