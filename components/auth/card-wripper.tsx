'use client'

import Image from "next/image"
import Header from "./header"
import Link from "next/link"
import NextButton from "@/components/next-button/next-button"

interface CardWrapperProps {
    children: React.ReactNode,
    label: string
    title: string
    backButtonHref: string
    nextButtonHref: string
    nextButtonLabel: string
    type: 'login' | 'signup'
}

const CardWrapper = ({
    children,
    label,
    title,
    backButtonHref,
    nextButtonHref,
    nextButtonLabel
}: CardWrapperProps) => {
    return (
        <div className="mt-auto">

            <Link href='/' className="flex gap-[0.8rem] items-center ml-[3.5rem] mb-[2.3rem]">
                <Image src='/back.svg' width={23} height={23} alt='<-' />
                <span className="font-[410] text-[1.8rem]">back</span>
            </Link>

            <div className=" h-full flex flex-col dark-bg rounded-t-[2rem] mdin-h-[68.6rem] items-stretch">
                <div className="flex flex-col pt-[3.5rem] px-[3.5rem]">
                    <Header label={label} title={title} />

                    <div className="py-[7rem]">
                        {children}
                    </div>

                </div>

                <NextButton nextButtonLabel={nextButtonLabel} currentPage={1} totalPages={3} nextButtonHref="/sign-in/credentials"/>
            </div>
        </div>
    )
}

export default CardWrapper