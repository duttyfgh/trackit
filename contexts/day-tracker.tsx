'use client'

import { weatherType } from '@/data/day-tracker-data'
import { createContext, useContext, useState, ReactNode } from 'react'

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
