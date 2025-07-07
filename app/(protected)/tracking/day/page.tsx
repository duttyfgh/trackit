'use client'

import BackButton from "@/components/buttons/back-button"
import TrackerCard from "@/components/cards/tracker-card"
import { useRouter } from "next/navigation"

const DayTracker = () => {
    const router = useRouter()

    const onDayCardHandler = () => {
        router.push('/tracking/day/day-tracker/overall-rate')
    }

    return (
        <div className="p-12 pt-24 flex flex-col justify-start items-center w-full gap-9">
            <BackButton href="/choose-tracking" />

            <div className="flex justify-center w-full flex-col items-center gap-8">
                <TrackerCard title="Day tracking" onClick={onDayCardHandler}>
                    <ul className="light-text list-disc flex flex-col gap-2">
                        <li className="text-[1.6rem]">
                            average mood
                        </li>
                        <li className="text-[1.6rem]">
                            average anxiety
                        </li>
                        <li className="text-[1.6rem]">
                            weather
                        </li>
                        <li className="text-[1.6rem]">
                            temperature
                        </li>
                        <li className="text-[1.6rem]">
                            overall retting
                        </li>
                    </ul>
                </TrackerCard>

                <TrackerCard title="Sleep tracker" onClick={onDayCardHandler}>
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

export default DayTracker