'use client'

import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

import { useCurrentUser } from "@/hooks/use-current-user"

import Card from "@/components/cards/dark-card"
import Logo from "@/components/logo"
import Navbar from "@/components/navbar"

const HomePage = () => {
    const user = useCurrentUser()
    const router = useRouter()

    const chooseTrackerHandler = () => {
        router.push('/choose-tracking')
    }

    return (
        <div className="dark-bg min-h-screen">
            <div className="light-bg -mb-1 pt-[3.5rem]">
                <Logo />
            </div>
            <div className="light-bg rounded-b-[2rem] px-[3.5rem] pb-[3rem] pt-4 shadow-xl">
                <div className="flex justify-between mb-9">
                    <div className='flex gap-3'>
                        <Image src='/emojis/rain.png' width={20} height={20} alt='🌧' />
                        <span>Sun, 26 January 2025</span>
                    </div>

                    <Link href='/settings'>
                        <Image src='/gear-icon.svg' width={20} height={20} alt='⚙' />
                    </Link>
                </div>

                <div className="flex items-center gap-4 mb-6 h1-styled">
                    <Image src={user?.image || '/placeholder-avatar.png'} width={40} height={40} alt='FA' className="rounded-full" />
                    <h1 className="dark-text text-[2.4rem] flex gap-2">Hi,<span className="h1-styled text-[2.4rem]">{user?.name}</span></h1>
                </div>

                <Navbar />
            </div>

            <div className="flex flex-col py-[4rem] px-[3.5rem] gap-8">
                <div className="flex gap-4">
                    <Card label="Trackers" text='Choose tracker and start tracking!' seeAllHandler={chooseTrackerHandler} />
                    <Card label="History" text='Check your tracks history here' seeAllHandler={() => { }} />
                </div>

            </div>
        </div>
    )
}

export default HomePage