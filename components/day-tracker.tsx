import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { StarIcon } from "lucide-react"

import { DayTracksType } from "@/contexts/day-tracker"
import { anxietyLevels, moods, weathers } from "@/data/day-tracker-data"

import TrackerCard from "./cards/tracker-card"
import TrackerListItem from "./tracker-list-item"

interface DayTrackerProps {
    dayTracks: DayTracksType
}

const DayTracker = ({ dayTracks }: DayTrackerProps) => {

    //images
    const [currentMoodImg, setCurrentMoodImg] = useState<string>()
    const [currentAnxietyImg, setCurrentAnxietyImg] = useState<string>()
    const [currentTemperatureImg, setCurrentTemperatureImg] = useState<string>()
    const [currentWeatherImg, setCurrentWeatherImg] = useState<string>()

    const { anxietyLevel, moodLevel, overallRate, temperature, weather } = dayTracks

    const router = useRouter()

    useEffect(() => {
        // emotions
        const currentMoodImg = moods.find(e => e.value === moodLevel)
        const currentAnxietyImg = anxietyLevels.find(e => e.value === anxietyLevel)

        // weather
        const currentWeatherImg = weathers.find(e => e.title === weather)

        // temperature
        if (temperature && temperature >= 20) {
            setCurrentTemperatureImg('/emojis/fire.png')
        } else if (temperature && temperature <= 5) {
            setCurrentTemperatureImg('/emojis/frost.png')
        } else {
            setCurrentTemperatureImg('/emojis/leaf.png')
        }

        // set imgs
        setCurrentMoodImg(currentMoodImg?.emoji)
        setCurrentAnxietyImg(currentAnxietyImg?.emoji)
        setCurrentWeatherImg(currentWeatherImg?.img)

    }, [moodLevel, anxietyLevel, temperature, weather])

    const onDayCardHandler = () => {
        router.push('/tracking/day/day-tracker/overall-rate')
    }

    return (
        <TrackerCard title="Day tracking" onClick={onDayCardHandler}>
            <ul className="light-text list-disc flex flex-col gap-2">
                <TrackerListItem>
                    <span className="text-[1.6rem]">overall rating</span>
                    {overallRate > 0 && (
                        <div className="flex gap-2 items-center">
                            <span className="text-[1.6rem]">- {overallRate}</span>
                            <StarIcon className="text-[#F9D22C] fill-current w-[1.8rem]" />
                        </div>
                    )}
                </TrackerListItem>

                <TrackerListItem>
                    <span className="text-[1.6rem]">average mood</span>
                    {moodLevel > 0 && (
                        <div className="flex gap-2 items-center">
                            <span className="text-[1.6rem]">-</span>
                            {currentMoodImg && <Image src={currentMoodImg} width={18} height={20} alt='...' />}
                        </div>
                    )}
                </TrackerListItem>

                <TrackerListItem>
                    <span className="text-[1.6rem]">average anxiety</span>
                    {anxietyLevel > 0 && (
                        <div className="flex gap-2 items-center">
                            <span className="text-[1.6rem]">-</span>
                            {currentAnxietyImg && <Image src={currentAnxietyImg} width={18} height={20} alt='...' />}
                        </div>
                    )}
                </TrackerListItem>

                <TrackerListItem>
                    <span className="text-[1.6rem]">temperature</span>
                    {temperature && (
                        <div className="flex gap-2 items-center">
                            <span className="text-[1.6rem]">- {temperature}°</span>
                            {currentTemperatureImg && <Image src={currentTemperatureImg} width={18} height={20} alt='...' />}
                        </div>
                    )}
                </TrackerListItem>

                <TrackerListItem>
                    <span className="text-[1.6rem]">weather</span>
                    {(weather && currentWeatherImg) && (
                        <div className="flex gap-2 items-center">
                            <span className="text-[1.6rem]">-</span>
                            <Image src={currentWeatherImg} width={18} height={20} alt='...' />
                        </div>
                    )}
                </TrackerListItem>
            </ul>
        </TrackerCard>
    )
}

export default DayTracker