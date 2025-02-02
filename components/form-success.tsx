import Image from "next/image"

interface FormSuccessProps {
    message: string | undefined

}

const FormSuccess = ({ message }: FormSuccessProps) => {
    if (!message) return null
    return (
        <div className="bg-emerald-500/15 py-5 px-8 rounded-[1.2rem] flex items-center text-[1.4rem] text-emerald-500 gap-4">
            <Image src='/check-circled.svg' width={18} height={18} alt='!' />
            <p>{message}</p>
        </div>
    )
}

export default FormSuccess