import BackButton from "@/components/buttons/back-button"
import ChooseTrackingCard from "@/components/cards/choose-tracking-card"
import Logo from "@/components/logo"

const trackersTypes = [
    {
        label: 'Every day trackers',
        lastSeen: '10:54',
        text: 'Things change every day have time to track it!',
        emojis: [
            { src: '/emojis/house-emoji.png', alt: '🏡' },
            { src: '/emojis/cloud-emoji.png', alt: '☁' },
            { src: '/emojis/grinning-face-emoji.png', alt: '😀' },
            { src: '/emojis/bed-emoji.png', alt: '🛌' },
        ]
    }
]

const ChooseTracking = () => {
    return (
        <div className="dark-bg min-h-screen pb-12">
            <div className="light-bg -mb-1 pb-[4rem] pt-[3.5rem]">
                <Logo />
            </div>
            <div className="light-bg rounded-b-[2rem] px-[3.5rem] pb-[3rem] pt-3 shadow-xl">
                <p>Come every day and fill in your progress, set new aims, and complete the old ones.</p>
            </div>

            <div className="flex flex-col items-center py-[4rem] px-[3.5rem] gap-8 light-text">
                <BackButton href='/home' mode='light' />

                <div className="flex flex-col gap-6">
                    {
                        trackersTypes.map((i) => (
                            <ChooseTrackingCard
                                label={i.label}
                                text={i.text}
                                lastSeen={i.lastSeen}
                                href="/tracking/day"
                                emojis={i.emojis}
                                key={i.label}
                            />
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default ChooseTracking