'use server'

import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"

export const setOverallRate = async (rating: number, email: string) => {
    const existingUser = await getUserByEmail(email)

    if (!existingUser) return null

    // find or create a dayTracker for the current user
    const tracker = await db.dayTracker.upsert({
        where: { userId: existingUser.id },
        update: {},
        create: { user: { connect: { id: existingUser.id } } }
    })

    // normalize the data for the unique check
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // upsert by 2 keys (trackerId + date)
    await db.dayEntry.upsert({
        where: {
            dayTrackerId_date: {
                dayTrackerId: tracker.id,
                date: today,
            }
        },
        update: {
            overallLevel: rating
        },
        create: {
            dayTracker: { connect: { id: tracker.id } },
            date: today,
            moodLevel: 0,
            anxietyLevel: 0,
            weather: 'unknown',
            temperature: 15,
            overallLevel: rating,
        }
    })

}
