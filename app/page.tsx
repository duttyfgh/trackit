import LoginButton from "@/components/auth/login-button"
import ContextButton from "@/components/context-button"
import Logo from "@/components/logo"
import Image from "next/image"

const App = () => {
  return (
    <div className="light-bg flex flex-col items-center justify-between min-h-screen py-[3.5rem]">
      <Logo />

      <div className="flex flex-col justify-between items-center gap-[9rem]">
        <div className="flex flex-col items-center">
          <Image src='/landing-photo.svg' width={409} height={400} alt='landing photo' />
          <p className="max-w-[34.4rem]">
            TrackIt helps you track activities, stay motivated, and make progress toward becoming your best self. Build habits, set goals, and watch your growth. Every activity brings you closer to living with purpose and fulfillment. Start today and embark on your path of self-improvement.
          </p>
        </div>

        <div className="px-[3.5rem] w-full">
          <LoginButton>
            <ContextButton mode="dark" title="Get started" />
          </LoginButton>
        </div>

      </div >
    </div >
  )
}

export default App