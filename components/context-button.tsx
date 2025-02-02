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
    onClick?: () => void,
    disabled?: boolean
}

const ContextButton = ({ title, img, imageWidth, imageHeight, mode, onClick, type, disabled }: ContextButtonProps) => {
    return (
        <button
            className={`${mode === 'light' ? 'light-bg dark-text font-medium' : 'border-[#FFF2C7]/15 border dark-bg light-text'} rounded-[1.2rem] flex items-center justify-center px-8 py-6 shadow-md  gap-4 w-full outline-none`}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {img && (
                <Image
                    src={img}
                    width={imageWidth}
                    height={imageHeight}
                    alt='...'
                    className={(img === '/loader.svg') && 'animate-spin' || ''}
                />
            )}
            <span className="text-[1.6rem]">{title}</span>
        </button>
    )
}

export default ContextButton