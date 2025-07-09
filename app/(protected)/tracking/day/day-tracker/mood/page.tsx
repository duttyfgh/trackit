'use client'

import { useRouter } from "next/navigation"

import { useDayTrackerContext } from "@/contexts/day-tracker"
import { moods } from "@/data/day-tracker-data"

import PrimaryButton from "@/components/buttons/primary-button"
import CardWrapper from "@/components/cards/card-wrapper"

const MoodTrackerPage = () => {
    const { dayTracks, setDayTracks } = useDayTrackerContext()

    const router = useRouter()

    const nextHandler = () => {
        router.push('/tracking/day/day-tracker/anxiety')
    }

    const trackMoodHandler = (moodLevel: number) => {
        setDayTracks({ ...dayTracks, moodLevel })
    }

    return (
        <div className="pt-[5rem]">
            <CardWrapper
                label="Mood"
                title="Rate your average mood during the day"
                currentPage={2}
                totalPages={5}
                isBubbles
                onHandler={nextHandler}
                backButtonHref="/tracking/day/day-tracker/overall-rate"
            >

                <div className="flex flex-col gap-6">
                    {moods.map((m) => (
                        <PrimaryButton
                            key={m.value}
                            img={m.emoji}
                            color={m.color}
                            title={m.title}
                            focused={dayTracks.moodLevel === m.value}
                            onClick={() => { trackMoodHandler(m.value) }}
                        />
                    ))}
                </div>
            </CardWrapper>
        </div>
    )
}

export default MoodTrackerPage