import Image from "next/image"

//TODO: take all the stuff from props
const Navbar = () => {
    return (
        <div className="flex gap-4 items-center font-medium">
            <div className="flex gap-3 items-start">
                <Image src='/streak-icon.svg' width={14} height={18} alt='streak' />
                <span>21 Day</span>
            </div>

            <span className='dark-text text-[2rem]'>•</span>

            <div className="flex gap-2 items-center">
                <Image src='/emojis/happy-emoji.png' width={18} height={18} alt='😇' />
                <span>Happy</span>
            </div>

            <span className='dark-text text-[2rem]'>•</span>

            <div className="flex gap-2 items-center">
                <Image src='/emojis/calm-emoji.png' width={18} height={18} alt='😌' />
                <span>Complete calm</span>
            </div>
        </div>
    )
}

export default Navbar