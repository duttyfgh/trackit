import { ClerkLoading } from "@clerk/nextjs"
import Image from "next/image"

const ClerkLoadingComponent = () => {
    return (
        <ClerkLoading>
            <Image src='/loader.svg' width={40} height={40} alt="Loading..." className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
    )
}

export default ClerkLoadingComponent