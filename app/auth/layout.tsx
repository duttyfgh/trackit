import Logo from "@/components/logo"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col pt-[3.5rem] light-bg">
            <Logo />
            {children}
        </div>
    )
}

export default AuthLayout