'use client'

import Image from "next/image"
import Header from "./auth/header"
import Link from "next/link"
import NextButton from "@/components/buttons/next-button/next-button"

interface CardWrapperProps {
    children: React.ReactNode,
    label: string
    title: string
    nextButtonLabel?: string

    backButtonHref: string

    currentPage?: number
    totalPages?: number

    isBubbles?: boolean
    isButton?: boolean
    isBackButton?: boolean

    onHandler?: () => void
}

const CardWrapper = ({
    children,
    label,
    title,
    backButtonHref,
    nextButtonLabel,
    currentPage,
    totalPages,
    isBubbles = true,
    isButton = true,
    isBackButton = true,
    onHandler
}: CardWrapperProps) => {
    return (
        <div className="mt-auto">

            {isBackButton && (
                <Link href={backButtonHref} className="flex gap-[0.8rem] items-center ml-[3.5rem] mb-[2.3rem]">
                    <Image src='/back.svg' width={23} height={23} alt='<-' />
                    <span className="font-[410] text-[1.8rem]">back</span>
                </Link>
            )}

            <div className=" h-full flex flex-col dark-bg rounded-t-[2rem] items-stretch">
                <div className="flex flex-col pt-[3.5rem] px-[3.5rem]">
                    <Header label={label} title={title} />

                    <div className="py-[6rem]">
                        {children}
                    </div>

                </div>


                {isButton && <NextButton
                    nextButtonLabel={nextButtonLabel || "Next"}
                    currentPage={currentPage!}
                    totalPages={totalPages!}
                    isBubbles={isBubbles}
                    onHandler={onHandler!}
                />}


            </div>
        </div>
    )
}

export default CardWrapper