'use client'

interface CardProps {
    label?: string
    text?: string

    children?: React.ReactNode

    seeAllHandler?: () => void
    keepTrackingHandler?: () => void
}

const Card = ({ children, keepTrackingHandler, label, seeAllHandler, text }: CardProps) => {
    return (
        <div className="dark-button-bg p-[2rem] border-[#FAF0CF]/10 border rounded-[2rem] w-full shadow-md">
            <h1 className="light-primary-text text-[2.4rem] font-bold">{label}</h1>
            <p className="light-text text-[1.4rem] font-thin">{text}</p>

            {seeAllHandler && (
                <button
                    onClick={!seeAllHandler ? keepTrackingHandler : seeAllHandler}
                    className="font-medium border-[#FAF0CF]/10 border dark-button-bg light-text w-full py-4 px-8 lg:px16 rounded-[1.2rem] mt-8">
                    See all
                </button>
            )}

        </div>
    )
}

export default Card