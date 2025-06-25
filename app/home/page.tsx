'use client'

import Logo from "@/components/logo"
import Navbar from "@/components/navbar"
import { useCurrentUser } from "@/hooks/use-current-user"
import Image from "next/image"
import Link from "next/link"

const HomePage = () => {
    const user = useCurrentUser()

    return (
        <div className="dark-bg min-h-screen">
            <div className="light-bg -mb-1 pt-[3.5rem]">
                <Logo />
            </div>
            <div className="light-bg rounded-b-[2rem] px-[3.5rem] pb-[3rem] pt-4 shadow-xl">
                <div className="flex justify-between mb-9">
                    <div className='flex gap-3'>
                        <Image src='/emojis/rain-emoji.png' width={20} height={20} alt='🌧' />
                        <span>Sun, 26 January 2025</span>
                    </div>

                    <Link href='/settings'>
                        <Image src='/gear-icon.svg' width={20} height={20} alt='⚙' />
                    </Link>
                </div>

                <div className="flex items-center gap-4 mb-6">
                    <Image src={user?.image || '/placeholder-avatar.png'} width={40} height={40} alt='FA' className="rounded-full" />
                    <h1 className="dark-text text-[2.4rem] flex gap-2">Hi,<h1>{user?.name}</h1></h1>
                </div>

                <Navbar />
            </div>

            <div className="light-text">
            </div>
        </div>
    )
}

export default HomePage