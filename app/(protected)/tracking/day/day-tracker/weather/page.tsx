'use client'

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { useDayTrackerContext,  } from "@/contexts/day-tracker"
import { weathers, weatherType } from "@/data/day-tracker-data"

import CardWrapper from "@/components/cards/card-wrapper"
import LightLine from "@/components/light-line"


const WeatherTrackerPage = () => {
    const { dayTracks, setDayTracks } = useDayTrackerContext()

    const router = useRouter()

    const nextHandler = () => {
        router.push('/tracking/day')
    }

    const selectWeatherHandler = (weather: weatherType) => {
        setDayTracks({ ...dayTracks, weather })
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
                    <h1 className="light-primary-text text-[2.4rem] px-10 pb-2 capitalize">{dayTracks.weather}</h1>
                    <LightLine width={18} />
                </div>

                <div className="flex flex-wrap gap-[1.7rem]">
                    {weathers.slice(1).map((w) => (
                        <button
                            key={w.img}
                            className="p-8 dark-button-bg rounded-[20px] border-[#FAF0CF]/10 border shadow-md focus:bg-[#473328] transition-all"
                            style={{backgroundColor: (dayTracks.weather === w.title && '#473328' || '#3e2c23' )}}
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