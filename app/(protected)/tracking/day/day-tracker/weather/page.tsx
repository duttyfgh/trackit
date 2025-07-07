'use client'

import CardWrapper from "@/components/cards/card-wrapper"
import LightLine from "@/components/light-line"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

type weatherType =
    | 'sunny'
    | 'party cloudy'
    | 'cloudy'
    | 'lightning'
    | 'rain'
    | 'thunderstorm'
    | 'rain and sun'
    | 'snowy'
    | 'windy'
    | 'fogy'
    | 'tornado'
    | 'frosty'

const weather: { img: string, title: weatherType }[] = [
    {
        img: '/emojis/sun.png',
        title: 'sunny'
    },
    {
        img: '/emojis/party-cloudy.png',
        title: 'party cloudy'
    },
    {
        img: '/emojis/cloud.png',
        title: 'cloudy'
    },
    {
        img: '/emojis/lightning.png',
        title: 'lightning'
    },
    {
        img: '/emojis/rain.png',
        title: 'rain'
    },
    {
        img: '/emojis/thunderstorm.png',
        title: 'thunderstorm'
    },
    {
        img: '/emojis/rain-and-sun.png',
        title: 'rain and sun'
    },
    {
        img: '/emojis/snow.png',
        title: 'snowy'
    },
    {
        img: '/emojis/wind.png',
        title: 'windy'
    },
    {
        img: '/emojis/fog.png',
        title: 'fogy'
    },
    {
        img: '/emojis/tornado.png',
        title: 'tornado'
    },
    {
        img: '/emojis/frost.png',
        title: 'frosty'
    }
]

const WeatherTrackerPage = () => {
    const [currentWeather, setCurrentWeather] = useState<weatherType>('sunny')

    const router = useRouter()

    const nextHandler = () => {
        router.push('/tracking/day')
    }

    const selectWeatherHandler = (weather: weatherType) => {
        setCurrentWeather(weather)
    }

    return (
        <CardWrapper
            label="Weather"
            title="What weather was today?"
            currentPage={5}
            totalPages={5}
            isBubbles
            onHandler={nextHandler}
            backButtonHref="/tracking/day/day-tracker/temperature"
        >
            <div className="flex flex-col items-center w-full gap-16">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="light-primary-text text-[2.4rem] px-10 pb-2 capitalize">{currentWeather}</h1>
                    <LightLine width={18} />
                </div>

                <div className="flex flex-wrap gap-[1.7rem]">
                    {weather.map((w) => (
                        <button
                            key={w.img}
                            className="p-8 dark-button-bg rounded-[20px] border-[#FAF0CF]/10 border shadow-md focus:border-[#FAF0CF]/15 focus:bg-[#433026] transition-all"
                            onClick={() => { selectWeatherHandler(w.title) }}
                        >
                            <Image src={w.img} width={30} height={30} alt={w.title} />
                        </button>
                    ))}
                </div>
            </div>

        </CardWrapper>
    )
}

export default WeatherTrackerPage