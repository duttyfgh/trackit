'use client'

import Bubble from '@/components/buttons/next-button/bubble'
import Image from 'next/image'
import Link from 'next/link'

interface NextButtonProps {
    nextButtonLabel: string,
    showPagination?: boolean,
    currentPage: number,
    totalPages: number,
    isBubbles?: boolean,
    onHandler: () => void


}

const NextButton = ({
    nextButtonLabel,
    showPagination = true,
    currentPage,
    totalPages,
    onHandler,
    isBubbles

}: NextButtonProps) => {

    const bubbles = () => {
        const bubblesArray = []

        let i = 0
        while (i < totalPages) {
            i++
            bubblesArray.push(<Bubble key={i} isEmpty={i != currentPage} />)
        }
        return bubblesArray

    }

    return (
        <div className="flex flex-col w-full mt-auto gap-[2.5rem]">
            {
                isBubbles && (
                    <div className='flex gap-[0.5rem] w-full justify-center'>
                        {showPagination && bubbles()}
                    </div>
                )
            }
           <div className='flex items-end gap-2'>
                <Link href='/tracking/day' className="rounded-t-[3rem] light-bg p-9 flex justify-center items-center">
                    <Image src='/home.svg' width={25} height={20} alt="home" />
                </Link>
    
                <button
                    className="rounded-t-[3rem] light-bg w-full text-[2.4rem] dark-text px-4 py-7"
                    onClick={onHandler}
                >
                    <h1>{nextButtonLabel}</h1>
                </button>
           </div>
        </div>
    )
}

export default NextButton