import { signIn } from "next-auth/react"

import ContextButton from "../context-button"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

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
            title="Google"
            img="/google.svg"
            imageWidth={24}
            imageHeight={24}
            mode='dark'
        />
    )
}

export default GoogleAuthorizationButton