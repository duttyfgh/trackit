import { LoginSchema } from "@/schemas"
import Image from "next/image"
import * as z from "zod"

interface ContextButtonProps {
    title: string,
    img?: string,
    imageWidth?: number,
    imageHeight?: number,
    mode: 'light' | 'dark',
    type?: 'button' | 'submit',
    onClick?: () => void
}

const ContextButton = ({ title, img, imageWidth, imageHeight, mode, onClick, type }: ContextButtonProps) => {
    return (
        <button
            className={`${mode === 'light' ? 'light-bg dark-text font-medium' : 'border-[#FFF2C7]/15 border dark-bg light-text'} rounded-[1.2rem] flex items-center justify-center px-8 py-6 shadow-md  gap-4 w-full `}
            onClick={onClick}
            type={type}
        >
            {img && (
                <Image src={img} width={imageWidth} height={imageHeight} alt='...' />
            )}
            <span className="text-[1.6rem]">{title}</span>
        </button>
    )
}

export default ContextButton