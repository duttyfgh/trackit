import Logo from "@/components/logo"
import { Suspense } from "react"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="min-h-screen flex flex-col pt-[3.5rem] light-bg">
                <Logo />
                {children}
            </div>
        </Suspense>
    )
}

export default AuthLayout