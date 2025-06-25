'use client'

import Image from "next/image"
import Link from "next/link"

interface BackButtonProps {
    href: string
    mode?: 'light' | 'dark'
}

const BackButton = ({ href, mode }: BackButtonProps) => {
    return (
        <div className="w-full">
            <Link href={href} className="flex gap-[0.8rem] items-center mb-12">
                <Image src={(mode === 'light') ? '/light-back.svg' : '/back.svg'} width={23} height={23} alt='<-' />
                <span className={`font-[410] text-[1.8rem] ${(mode === 'light') ? 'light-text' : 'dark-text'}`}>back</span>
            </Link>
        </div>
    )
}

export default BackButton