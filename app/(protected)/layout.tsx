import { Suspense } from 'react'
import SuspenseLoader from '@/components/suspene-loader'
import Logo from '@/components/logo'
import { DayTrackerProvider } from '@/contexts/day-tracker'

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <DayTrackerProvider>
            <Suspense fallback={<SuspenseLoader />}>
                <div className="min-h-screen flex flex-col justify-between pt-[3.5rem] light-bg">
                    <Logo />
                    {children}
                </div>
            </Suspense>
        </DayTrackerProvider>
    )
}