import { signIn } from "next-auth/react"

import ContextButton from "../buttons/context-button"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import Image from "next/image"

const GoogleAuthorizationButton = () => {

    const onClick = () => {
        const provider = "google"
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
    }

    return (
        <ContextButton
            onClick={onClick}
            mode='dark'
        >
            <Image src="/google.svg" width={24} height={24} alt='...'/>
            <span className="text-[1.6rem]">Google</span>
        </ContextButton>
    )
}

export default GoogleAuthorizationButton