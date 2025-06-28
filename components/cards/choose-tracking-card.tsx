'use client'

import Image from "next/image"
import Link from "next/link"

interface ChooseTrackingCardProps {
    label: string
    lastSeen: string
    text: string
    href: string
    emojis: { src: string; alt: string; }[]

}

const ChooseTrackingCard = ({ emojis, label, lastSeen, text, href }: ChooseTrackingCardProps) => {
    return (
        <Link href={href} className="p-8 flex flex-col gap-12 justify-between dark-button-bg border-[#FAF0CF]/10 border rounded-[2rem] shadow-md">
            <div className="flex justify-between gap-8">
                <h1 className="text-[2.4rem] light-primary-text">{label}</h1>
                <div className="flex gap-2 light-text whitespace-nowrap font-light">
                    <span className=" text-[1.2rem]">Last seen</span>
                    <span className=" text-[1.2rem]">{lastSeen}</span>
                </div>
            </div>

            <div className="flex justify-between gap-5">
                <div className="flex gap-6">
                    <Image src='/pin.svg' width={12} height={16} alt='...' />
                    <p className="text-[1.4rem] light-text max-w-[17rem] font-light">
                        {text}
                    </p>
                </div>

                <div className="flex gap-2 items-center ">
                    {emojis.map((emoji) => (
                        <Image src={emoji.src} width={19} height={19} alt={emoji.alt} key={emoji.src} />
                    ))}

                </div>
            </div>
        </Link>
    )
}

export default ChooseTrackingCard