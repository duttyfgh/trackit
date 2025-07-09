'use client'

import Image from "next/image"

interface PrimaryButtonProps {
    img: string
    symbolImg?: string

    symbolHeight?: number
    symbolWight?: number

    title: string
    color?: string

    focused: boolean

    onClick: () => void
}

const PrimaryButton = ({ img, title, symbolImg, symbolHeight, symbolWight, onClick, color, focused = false }: PrimaryButtonProps) => {
    return (
        <button
            className="px-[4.5rem] py-[1.5rem] border-[#FAF0CF]/10 border rounded-[2rem] flex justify-between items-center w-full shadow-md transition-colors"
            onClick={onClick}
            style={{backgroundColor: (focused && '#473328' || '#3e2c23' )}}
        >
            <div className="flex items-center gap-[1.2rem]">
                <div
                    className='flex items-center justify-center rounded-full p-6 light-bg'
                    style={{ backgroundColor: color && color}}>
                    <Image src={img} width={22} height={22} alt="..." />
                </div>

                <span className="capitalize light-primary-text text-[1.6rem] font-light">{title}</span>
            </div>

            {symbolImg && (
                <Image src={symbolImg} width={symbolWight} height={symbolHeight} alt="..." />
            )}

        </button>
    )
}

export default PrimaryButton