'use client'

import { useState } from "react"
import Image from "next/image"

interface PrimaryButtonWrapperProps {
    children: React.ReactNode

    title: string
    img: string

    onClick: () => void
}

const PrimaryButtonWrapper = ({ children, onClick, title, img }: PrimaryButtonWrapperProps) => {
    const [isOpened, setIsOpened] = useState<boolean>(false)

    const clickHandler = () => {
        setIsOpened((prev) => (!prev))
        onClick()
    }

    return (
        <div className="rounded-[2rem] overflow-hidden" onClick={clickHandler}>
            <div className="black-bg">
                <button
                    className="dark-button-bg px-[4.5rem] py-[1.5rem] border-[#FAF0CF]/10 border rounded-[2rem] flex justify-between items-center w-full shadow-md focus:bg-[#433026] transition-colors"
                >
                    <div className="flex items-center gap-[1.2rem]">
                        <div className="flex items-center justify-center rounded-full p-6 light-bg">
                            <Image src={img} width={22} height={22} alt="..." />
                        </div>

                        <span className="capitalize light-primary-text text-[1.6rem] font-light">{title}</span>
                    </div>
                    <Image src="/expander-icon.svg" width={10} height={10} alt=">" className={`${isOpened ? 'rotate-90' : ''} transition-all`} />
                </button>
            </div>

            <div className={`${isOpened && 'py-10'} px-[4.5rem] black-bg transition-all shadow-lg`} style={{ height: (!isOpened ? 0 : 'auto') }}>
                {children}
            </div>

        </div>
    )
}

export default PrimaryButtonWrapper