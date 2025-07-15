'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

import { weatherType } from '@/data/day-tracker-data'
import { useCurrentDayEntry } from '@/hooks/use-current-day-entry'
import { useCurrentUser } from '@/hooks/use-current-user'

export type DayTracksType = {
    overallRate: number
    moodLevel: number
    anxietyLevel: number
    weather: weatherType
    temperature: number | null
}

type DayTrackerContextType = {
    dayTracks: DayTracksType
    setDayTracks: (val: DayTracksType) => void
}

const DayTrackerContext = createContext<DayTrackerContextType | undefined>(undefined)

export const DayTrackerProvider = ({ children }: { children: ReactNode }) => {
    const [dayTracks, setDayTracks] = useState<DayTracksType>({
        overallRate: 0,
        moodLevel: 0,
        anxietyLevel: 0,
        weather: '...',
        temperature: null,
    })

    // get dayTracker data from db
    const user = useCurrentUser()
    const { data } = useCurrentDayEntry(user?.email || '')

    useEffect(() => {
        if (!data) return

        // sync context with db 
        setDayTracks({
            overallRate: data.overallLevel,
            moodLevel: data.moodLevel,
            anxietyLevel: data.anxietyLevel,
            weather: data.weather,
            temperature: data.temperature,
        })
    }, [data])

    return (
        <DayTrackerContext.Provider value={{ dayTracks, setDayTracks }}>
            {children}
        </DayTrackerContext.Provider>
    )
}

// a custom hook
export const useDayTrackerContext = () => {
    const context = useContext(DayTrackerContext)
    if (!context) throw new Error('useDayTrackerContext must be used inside <DayTrackerProvider>')
    return context
}
