import Image from "next/image"

interface ContextButtonProps {
    title: string,
    img?: string,
    imageWidth?: number,
    imageHeight?: number,
    mode: 'light' | 'dark'
}

const ContextButton = ({ title, img, imageWidth, imageHeight, mode }: ContextButtonProps) => {
    return (
        <div className={`${mode === 'light' ? 'light-bg dark-text' : 'border-[#FFF2C7]/15 border dark-bg light-text'} rounded-[1.2rem] flex items-center justify-center px-8 py-6 shadow-md  gap-4`}>
            {img && (
                <Image src={img} width={imageWidth} height={imageHeight} alt='...' />
            )}
            <span className="text-[1.6rem]">{title}</span>
        </div>
    )
}

export default ContextButton