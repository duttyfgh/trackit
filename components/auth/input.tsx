'use client'
import { useState } from "react"

const Input = () => {
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
        <div className="flex flex-col relative">
            <input
                onFocus={onFocus}
                onBlur={focusOut}
                type="text"
                className="px-8 py-6 text-[1.6rem] border rounded-[1.2rem] border-[#FFF2C7]/15 bg-transparent focus:outline-none text-[#FFF2C7]/80 z-10" />
            <span className={`px-1 text-[#FFF2C7]/50 text-[1.6rem] absolute ${isFocused ? '-top-5 z-20 dark-bg' : 'top-[1.6rem]'} left-[1.9rem] transition-all`}>
                Name
            </span>
        </div>
    )
}

export default Input