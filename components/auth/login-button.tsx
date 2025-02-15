'use client'
import { useRouter } from "next/navigation"

interface LoginButtonProps {
    children: React.ReactNode
    mode?: 'modal' | 'redirect'
    asChild?: boolean
}

const LoginButton = ({ children, asChild, mode = 'redirect' }: LoginButtonProps) => {
    const router = useRouter()

    const onCLick = () => {
        router.push('/auth/login')
    }

    if (mode === 'modal') {
        return (
            <span>TODO: implement modal</span>
        )
    }

    return (
        <span className="cursor-pointer w-full" onClick={onCLick}>
            {children}
        </span>
    )

}

export default LoginButton