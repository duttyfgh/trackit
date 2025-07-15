'use server'

import { db } from "@/lib/db"
import { DayEntry } from "@prisma/client"
import { getUserByEmail } from "@/data/user"

type DayEntryType = Pick<
    DayEntry,
    "createdAt" | "overallLevel" | "moodLevel" | "anxietyLevel" | "temperature" | "weather"
>

export const getCurrentDayEntry = async (email: string): Promise<DayEntryType | null> => {
    const existingUser = await getUserByEmail(email)

    if (!existingUser) return null

    const tracker = await db.dayTracker.findUnique({
        where: { userId: existingUser.id }
    })

    if (!tracker) return null

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const currentEntry = await db.dayEntry.findUnique({
        where: {
            dayTrackerId_date: {
                dayTrackerId: tracker.id,
                date: today,
            }
        },

        // choosing what i wanna get from the tracker fields
        select: {
            createdAt: true,
            overallLevel: true,
            moodLevel: true,
            anxietyLevel: true,
            temperature: true,
            weather: true

        }
    })

    if (!currentEntry) return null

    return currentEntry
}
