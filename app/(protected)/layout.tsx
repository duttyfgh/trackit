import { Suspense } from 'react'
import SuspenseLoader from '@/components/suspene-loader'
import Logo from '@/components/logo'

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <Suspense fallback={<SuspenseLoader />}>
            <div className="min-h-screen flex flex-col pt-[3.5rem] light-bg">
                <Logo />
                {children}
            </div>
        </Suspense>
    )
}