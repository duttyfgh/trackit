import Image from "next/image"

interface FormErrorProps {
    message: string

}

const FormError = ({ message }: FormErrorProps) => {
    if (!message) return null
    return (
        <div className="bg-destructive/15 py-5 px-8 rounded-[1.2rem] flex items-center text-[1.4rem] text-destructive gap-4">
            <Image src='/exclamation-triangle.svg' width={24} height={23} alt='!' />
            <p>{message}</p>
        </div>
    )
}

export default FormError