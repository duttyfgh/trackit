import Logo from "@/components/logo"
import SuspenseLoader from "@/components/suspene-loader"
import { Suspense } from "react"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Suspense fallback={<SuspenseLoader />}>
            <div className="min-h-screen flex flex-col pt-[3.5rem] light-bg">
                <Logo />
                {children}
            </div>
        </Suspense>
    )
}

export default AuthLayout