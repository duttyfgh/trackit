'use client'

import Header from "@/components/auth/header"
import NextButton from "@/components/buttons/next-button/next-button"
import BackButton from "@/components/buttons/back-button"

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
                <div className="pl-[3.5rem]">
                    <BackButton href={backButtonHref} mode='dark' />
                </div>
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