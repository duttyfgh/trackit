'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"

import Logo from "../logo"
import CardWrapper from "../card-wripper"
import ContextButton from "../buttons/context-button"

const ErrorCard = () => {
    const router = useRouter()

    const onClick = () => {
        router.push('/auth/login')
    }

    return (
        <CardWrapper
            label="Error"
            backButtonHref="/auth/login"
            title='Oops! Something went wrong...'
            isBubbles={false}
            isButton={false}
        >
            <Image src='/error-photo.svg' width={324} height={315} alt='...' className="pb-12" />

            <ContextButton mode="light" onClick={onClick}>Back to login</ContextButton>
        </CardWrapper>
    )
}

export default ErrorCard