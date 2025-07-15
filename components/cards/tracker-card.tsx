'use client'

import Image from "next/image"
import ContextButton from "../buttons/context-button"
import { Clock } from "lucide-react"

interface TrackerCardProps {
    title: string

    onClick: () => void

    children: React.ReactNode
}

const TrackerCard = ({ children, title, onClick }: TrackerCardProps) => {
    return (
        <div className="p-14 dark-bg rounded-[2rem] flex flex-col gap-12 w-[320px]">
            <div className="flex justify-between">
                <h1 className="light-primary-text text-[2.4rem]">{title}</h1>
                {/* <Image src='/light-pen.svg' width={16} height={16} alt="✏" /> TODO: implement changing tracking card */}
                <div className="flex gap-2 light-text whitespace-nowrap font-light items-center">
                    {/* <span className=" text-[1.4rem]">Last seen</span> */}
                    <Clock size={'1.6rem'}/>
                    <span className=" text-[1.4rem]">21:17</span>
                </div>

            </div>

            <div className="px-16">{children}</div>

            <ContextButton mode="light" onClick={onClick} >
                <span className="dark-text text-[1.6rem]">Keep tracking</span>
            </ContextButton>

        </div>
    )
}

export default TrackerCard