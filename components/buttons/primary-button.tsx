import Image from "next/image"

interface PrimaryButtonProps {
    img: string
    symbolImg?: string

    symbolHeight: number
    symbolWight: number

    title: string
    href?: string
}

const PrimaryButton = ({ img, title, href, symbolImg, symbolHeight, symbolWight }: PrimaryButtonProps) => {
    return (
        <div className="dark-button-bg px-[4.5rem] py-[1.5rem] border-[#FFF2C7]/10 border rounded-[2rem] flex justify-between items-center w-full shadow-md">
            <div className="flex items-center gap-[1.2rem]">
                <div className="flex items-center justify-center rounded-full p-4 light-bg">
                    <Image src={img} width={24} height={24} alt="..." />
                </div>

                <span className="capitalize light-primary-text text-[1.6rem] ">{title}</span>
            </div>

            {symbolImg && (
                <Image src={symbolImg} width={symbolWight} height={symbolHeight} alt="..." />
            )}

        </div>
    )
}

export default PrimaryButton