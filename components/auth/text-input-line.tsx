'use client'
import Image from "next/image"
import { useState } from "react"
import { Input } from "../ui/input"

interface TextInputLineProps {
    label?: string
    type: string
    error: string | undefined

    disabled?: boolean
    autoFocus?: boolean

}

const TextInputLine = ({ label, type, error, disabled, autoFocus, ...rest }: TextInputLineProps) => {
    const [isFocused, setIsFocused] = useState(false)

    const onFocus = () => {
        setIsFocused(true)
    }

    const focusOut = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            setIsFocused(false)
        }
    }

    return (
        <div className="flex flex-col relative w-full">
            <Input
                onFocus={onFocus}
                type={type}
                {...rest}
                onBlur={focusOut}
                className={`px-[2.1rem] py-[1.7rem] border border-transparent border-b-black bg-transparent dark-text z-10 outline-none transition-all dark-text text-[2.4rem] h1-styled text-center ${error && 'border-b-[#dc3939]'} `}
                disabled={disabled}
                autoFocus={autoFocus}
            />
            <p>{error}</p>
        </div>
    )
}

export default TextInputLine