'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { useDayTrackerContext } from "@/contexts/day-tracker"

import CardWrapper from "@/components/cards/card-wrapper"
import LightLine from "@/components/light-line"
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating"

type IRatings = { title: string, description: string, rating: number }

const ratings: IRatings[] = [
    {
        title: 'Your day',
        description: 'Rate your day based on how it felt overall, not just how productive it was',
        rating: 0
    },
    {
        title: 'Horrible',
        description: 'Everything was irritating, nothing went right, mood was low, a total burnout day',
        rating: 1
    },
    {
        title: 'Bad',
        description: 'Felt sluggish, didn`t get much done, something went wrong — the day felt like a loss',
        rating: 2
    },
    {
        title: 'Normal',
        description: 'Neutral. Just an average day — no breakdowns, but no real progress either',
        rating: 3
    },
    {
        title: 'Good',
        description: 'Stayed focused, got part of your plan done, mood was mostly positive',
        rating: 4
    },
    {
        title: 'Excellent',
        description: 'Crushed it. Hit your goals, stayed in the zone, a powerful and productive day',
        rating: 5
    },
]

const OverallRatePage = () => {
    const { dayTracks, setDayTracks } = useDayTrackerContext()

    const [currentRating, setCurrantRating] = useState<number>(dayTracks.overallRate) // rating 3 by default
    const [title, setTitle] = useState<string>(ratings[dayTracks.overallRate].title) // rating 3 by default
    const [description, setDescription] = useState<string>(ratings[dayTracks.overallRate ].description) // rating 3 by default

    const router = useRouter()

    const nextHandler = () => {
        router.push('/tracking/day/day-tracker/mood')
    }

    useEffect(() => {
        const { title, description } = ratings.find((r) => (r.rating === currentRating)) as IRatings

        setTitle(title)
        setDayTracks({ ...dayTracks, overallRate: currentRating })
        setDescription(description)

    }, [currentRating])

    return (
        <CardWrapper
            label="Overall rate"
            title="Give your overall rating for the day"
            currentPage={1}
            totalPages={5}
            isBubbles
            onHandler={nextHandler}
            backButtonHref="/tracking/day"
        >

            <div className="flex flex-col items-center w-full gap-[5rem] py-[4em]">
                <div className="flex gap-5 w-full justify-center">
                    <Rating defaultValue={currentRating} onValueChange={setCurrantRating}>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <RatingButton key={index} className="text-[#F9D22C]" size={50} />
                        ))}
                    </Rating>
                </div>

                <div className="flex flex-col items-center gap-4 px-[3rem] min-h-[11.7rem]">

                    <h1 className="text-[2.4rem] light-primary-text">{title}</h1>
                    <LightLine full />
                    <p className="light-text leading-[1.4]" >{description}</p>

                </div>

            </div>

        </CardWrapper>
    )
}

export default OverallRatePage