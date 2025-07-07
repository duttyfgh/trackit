'use client'

import Image from "next/image"

interface CounterProps {
    children: React.ReactNode

    stopAction: () => void

    plusHandlerHold: () => void
    plusHandler: () => void

    minusHandlerHold: () => void
    minusHandler: () => void
}

const Counter = ({ minusHandlerHold, children, plusHandlerHold, stopAction, minusHandler, plusHandler }: CounterProps) => {
    return (
        <div className="flex gap-12 justify-center items-center">
            <button
                onClick={minusHandler}
                onMouseDown={minusHandlerHold}
                onTouchStart={minusHandlerHold}
                onMouseUp={stopAction}
                onMouseLeave={stopAction}
                onTouchEnd={stopAction}
            >
                <Image src='/left-counter-arrow.svg' height={21} width={26} alt='<' />
            </button>

            <div className="dark-button-bg border-[#FAF0CF]/10 border shadow-md flex items-center justify-center p-[4.5rem] rounded-full w-[13.5rem] h-[13.5rem]">
                {children}

            </div>

            <button
                onClick={plusHandler}
                onMouseDown={plusHandlerHold}
                onTouchStart={plusHandlerHold}
                onMouseUp={stopAction}
                onMouseLeave={stopAction}
                onTouchEnd={stopAction}
            >
                <Image src='/right-counter-arrow.svg' height={21} width={26} alt='>' />
            </button>
        </div>
    )
}

export default Counter