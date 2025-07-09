'use client'

import { useDayTrackerContext } from "@/contexts/day-tracker"

import DayTracker from "@/components/day-tracker"
import TrackerCard from "@/components/cards/tracker-card"
import BackButton from "@/components/buttons/back-button"

const anxietyList = [
    {
        level: 5,
        img: '/emojis/calm.png'
    },
    {
        level: 4,
        img: '/emojis/without-mouth.png'
    },
    {
        level: 3,
        img: '/emojis/confused.png'
    },
    {
        level: 2,
        img: '/emojis/downcast.png'
    },
    {
        level: 1,
        img: '/emojis/yelling.png'
    }
]

const DayTrackerPage = () => {
    const { dayTracks, setDayTracks } = useDayTrackerContext()

    return (
        <div className="p-12 pt-24 flex flex-col justify-start items-center w-full gap-9">
            <BackButton href="/choose-tracking" />

            <div className="flex justify-center w-full flex-col items-center gap-8">

                <DayTracker dayTracks={dayTracks} />

                <TrackerCard title="Sleep tracker" onClick={() => {}}>
                    <ul className="light-text list-disc flex flex-col gap-2">
                        <li className="text-[1.6rem]">
                            bedtime
                        </li>
                        <li className="text-[1.6rem]">
                            wake up time
                        </li>
                        <li className="text-[1.6rem]">
                            the dream
                        </li>
                        <li className="text-[1.6rem]">
                            got enough sleep
                        </li>
                        <li className="text-[1.6rem]">
                            overall retting
                        </li>

                    </ul>
                </TrackerCard>
            </div>
        </div>
    )
}

export default DayTrackerPage