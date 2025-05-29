import Image from "next/image"
import Logo from "./logo"

const SuspenseLoader = () => {
    return (
        <div className="min-h-screen flex justify-center items-center light-bg">
                <Image src='/loader.svg' width={24} height={24} alt='Loading...' className="animate-spin"/>
        </div>
    )
}

export default SuspenseLoader