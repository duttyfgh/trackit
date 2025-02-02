'use client'
import Image from "next/image"
import { useState } from "react"
import { Input } from "../ui/input"

interface TextInputProps {
    label: string
    type: string
    error: string | undefined
    disabled?: boolean

}

const TextInput = ({ label, type, error, disabled, ...rest }: TextInputProps) => {
    const [isFocused, setIsFocused] = useState(false)
    const [inputType, setInputType] = useState(type)

    const onFocus = () => {
        setIsFocused(true)
    }

    const focusOut = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            setIsFocused(false)
        }
    }

    const onOpenEye = () => {
        if (!disabled) {
            setInputType('text')
        }
    }

    const onCloseEye = () => {
        if (!disabled) {
            setInputType('password')
        }
    }

    return (
        <div className="flex flex-col relative w-full">
            <Input
                onFocus={onFocus}
                type={inputType}
                {...rest}
                onBlur={focusOut}
                className={`px-[2.1rem] py-[2.7rem] text-[1.6rem] border rounded-[1.2rem] border-[#FFF2C7]/15 bg-transparent text-[#FFF2C7]/80 z-10 outline-none transition-all ${error && 'border-[#dc3939]'} `}
                disabled={disabled}
            />
            <span className={`px-1 text-[#FFF2C7]/50 text-[1.6rem] absolute ${isFocused ? '-top-5 z-20 dark-bg' : 'top-[1.6rem]'} left-[1.9rem] transition-all ${error && 'text-[#dc3939]'}`}>
                {error ? error : label}
            </span>

            {
                type === "password" && inputType === "text" && (
                    <Image
                        onClick={onCloseEye}
                        className={`absolute right-[1.9rem] top-[1.8rem] cursor-pointer z-20 ${error && 'red-filter'} ${disabled && 'opacity-50'} transition-all `}
                        src="/closed-eye.svg"
                        alt="..."
                        width={22}
                        height={18}
                    />
                )
            }

            {
                type === "password" && inputType === "password" && (
                    <Image
                        onClick={onOpenEye}
                        className={`absolute right-[1.9rem] top-[1.9rem] cursor-pointer z-20 ${error && 'red-filter'} transition-all`}
                        src="/open-eye.svg"
                        alt="..."
                        width={22}
                        height={15}
                    />
                )
            }

        </div>
    )
}

export default TextInput