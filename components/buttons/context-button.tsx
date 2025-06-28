'use client'

interface ContextButtonProps {
    children: React.ReactNode

    mode: 'light' | 'dark',
    type?: 'button' | 'submit',

    disabled?: boolean,
    isDeleteMode?: boolean

    onClick?: () => void,
}

const ContextButton = ({ mode, onClick, type = 'button', disabled, isDeleteMode, children }: ContextButtonProps) => {
    return (
        <button
            className={`${mode === 'light' ? 'light-bg dark-text font-medium' : 'border-[#FAF0CF]/15 border dark-button-bg light-primary-text'} rounded-[1.2rem] flex items-center justify-center px-8 py-6 shadow-md  gap-4 w-full outline-none ${isDeleteMode ? 'border-[#DC4747]/50' : 'border-[#FAF0CF]/10'}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default ContextButton