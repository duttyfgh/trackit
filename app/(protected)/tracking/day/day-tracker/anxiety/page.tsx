'use client'

import PrimaryButtonWrapper from "@/components/buttons/primary-button-wrapper"
import CardWrapper from "@/components/cards/card-wrapper"
import { useRouter } from "next/navigation"

const anxietyLevels = [
    {
        id: 0,
        emoji: '/emojis/calm.png',
        title: 'Complete Calm',
        description: 'No anxiety or stress at all. You feel centered, relaxed, and in full control of your thoughts and actions.',
        value: 5,
    },
    {
        id: 1,
        emoji: '/emojis/without-mouth.png',
        title: 'Low tension',
        description: 'A light sense of unease or restlessness. Noticeable, but not disruptive — easy to ignore or shake off.',
        value: 4,
    },
    {
        id: 2,
        emoji: '/emojis/confused.png',
        title: 'Moderate anxiety',
        description: 'You feel clearly anxious. Racing thoughts, trouble concentrating, maybe physical symptoms (tight chest, shallow breathing) — but still functioning normally.',
        value: 3,
    },
    {
        id: 3,
        emoji: '/emojis/downcast.png',
        title: 'Severe anxiety',
        description: 'Strong, persistent anxiety. It’s hard to focus, you may feel overwhelmed, and it affects your behavior or decision-making.',
        value: 2,
    },
    {
        id: 4,
        emoji: '/emojis/yelling.png',
        title: 'Anxiety, Fear, Stressed',
        description: 'Completely overpowering anxiety, leaving you unable to focus, act, or feel in control. Your mind and body feel locked or panicked.',
        value: 1,
    },

]

const AnxietyTrackerPage = () => {
    const router = useRouter()

    const nextHandler = () => {
        router.push('/tracking/day/day-tracker/temperature')
    }

    return (
        <div className="pt-[5rem]">
            <CardWrapper
                label="Anxiety"
                title="Rate your average anxiety during the day"
                currentPage={2}
                totalPages={5}
                isBubbles
                onHandler={nextHandler}
                backButtonHref="/tracking/day/day-tracker/mood"

            >
                <div className="flex flex-col gap-6">
                    {anxietyLevels.map((l) => (
                        <PrimaryButtonWrapper
                            key={l.id}
                            img={l.emoji}
                            title={l.title}
                            onClick={() => { }}
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