'use client'
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"

import CardWrapper from "@/components/cards/card-wrapper"
import Counter from "@/components/counter"

const TemperatureTrackerPage = () => {
    const [temperature, setTemperature] = useState<number>(10)

    const intervalRef = useRef<NodeJS.Timeout | number>(0)
    const router = useRouter()

    const nextHandler = () => {
        router.push('/tracking/day/day-tracker/weather')
    }

    const stopAction = () => {
        clearInterval(intervalRef.current)
    }

    // hold functions
    const plusHandlerHold = () => {
        intervalRef.current = setInterval(() => {
            setTemperature((p) => (p + 1))
        }, 200)
    }

    const minusHandlerHold = () => {
        intervalRef.current = setInterval(() => {
            setTemperature((p) => (p - 1))
        }, 200)

    }

    // on click functions
    const plusHandler = () => {
        setTemperature((p) => (p + 1))
    }

    const minusHandler = () => {
        setTemperature((p) => (p - 1))
    }

    return (
        <div className="pt-[5rem]">
            <CardWrapper
                label="Temperature"
                title="What temperature was today?"
                currentPage={3}
                totalPages={5}
                isBubbles
                onHandler={nextHandler}
                backButtonHref="/tracking/day/day-tracker/anxiety"

            >
                <div className="w-full flex justify-center h-[30rem]">
                    <Counter
                        minusHandlerHold={minusHandlerHold}
                        plusHandlerHold={plusHandlerHold}
                        stopAction={stopAction}
                        plusHandler={plusHandler}
                        minusHandler={minusHandler}
                    >
                        <h1 className="light-primary-text text-[2.4rem]">{temperature}°C</h1>
                    </Counter>
                </div>
            </CardWrapper>
        </div>
    )
}

export default TemperatureTrackerPage