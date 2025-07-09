'use client'

import PrimaryButtonWrapper from "@/components/buttons/primary-button-wrapper"
import CardWrapper from "@/components/cards/card-wrapper"
import { useDayTrackerContext } from "@/contexts/day-tracker"
import { anxietyLevels } from "@/data/day-tracker-data"
import { useRouter } from "next/navigation"



const AnxietyTrackerPage = () => {
    const { dayTracks, setDayTracks } = useDayTrackerContext()

    const router = useRouter()

    const nextHandler = () => {
        router.push('/tracking/day/day-tracker/temperature')
    }

    const trackAnxietyHandler = (anxietyLevel: number) => {
        setDayTracks({ ...dayTracks, anxietyLevel })
    }

    return (
        <div className="pt-[5rem]">
            <CardWrapper
                label="Anxiety"
                title="Rate your average anxiety during the day"
                currentPage={3}
                totalPages={5}
                isBubbles
                onHandler={nextHandler}
                backButtonHref="/tracking/day/day-tracker/mood"
            >
                <div className="flex flex-col gap-6">
                    {anxietyLevels.map((l) => (
                        <PrimaryButtonWrapper
                            key={l.value}
                            img={l.emoji}
                            title={l.title}
                            focused={dayTracks.anxietyLevel === l.value}
                            onClick={() => { trackAnxietyHandler(l.value) }}
                        >
                            <p className="light-text text-[1.4rem] font-light">
                                {l.description}
                            </p>
                        </PrimaryButtonWrapper>
                    ))}
                </div>
            </CardWrapper>
        </div>
    )
}

export default AnxietyTrackerPage