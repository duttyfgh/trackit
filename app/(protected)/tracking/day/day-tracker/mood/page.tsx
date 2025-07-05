'use client'

import PrimaryButton from "@/components/buttons/primary-button"
import CardWrapper from "@/components/cards/card-wrapper"
import { useRouter } from "next/navigation"

const moods = [
    {
        id: 0,
        emoji: '/emojis/happy.png',
        title: 'Happy, Joyful, Motivated',
        color: '',
        value: 6,
    },
    {
        id: 1,
        emoji: '/emojis/slightly-smiling.png',
        title: 'Basic, Calm, Peaceful',
        color: '',
        value: 5,
    },
    {
        id: 2,
        emoji: '/emojis/arrogant.png',
        title: 'Arrogant, Disgust, Bitchy',
        color: '#E4FD91',
        value: 4,
    },
    {
        id: 3,
        emoji: '/emojis/sad.png',
        title: 'Fatigued, Sadness, Hurt',
        color: '#91CDFD',
        value: 3,
    },
    {
        id: 4,
        emoji: '/emojis/anxiety.png',
        title: 'Anxiety, Fear, Stressed',
        color: '#B991FD',
        value: 2,
    },
    {
        id: 5,
        emoji: '/emojis/angry.png',
        title: 'Anger, Irritated, Annoyed',
        color: '#FDBE91',
        value: 1,
    },
]

const MoodTrackerPage = () => {
    const router = useRouter()

    const nextHandler = () => {
        router.push('/tracking/day/day-tracker/anxiety')
    }

    return (
        <div className="pt-[5rem]">
            <CardWrapper
                label="Mood"
                title="Rate your average mood during the day"
                currentPage={1}
                totalPages={5}
                isBubbles
                onHandler={nextHandler}
                backButtonHref="/tracking/day"

            >
                <div className="flex flex-col gap-6">
                    {moods.map((m) => (
                        <PrimaryButton
                            key={m.id}
                            img={m.emoji}
                            color={m.color}
                            title={m.title}
                            onClick={() => { }}
                        />
                    ))}
                </div>
            </CardWrapper>
        </div>
    )
}

export default MoodTrackerPage