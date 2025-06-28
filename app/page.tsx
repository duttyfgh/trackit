import LoginButton from "@/components/auth/login-button"
import ContextButton from "@/components/buttons/context-button"
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
            TrackIt is a manual tracker for people who want to see the real statistics of their life. Spend just 5–10 minutes a day logging your habits — and get reports, correlations between mood and routines, anomalies, and forecasts. You’ll finally see what truly affects your productivity, anxiety, and sleep. No fake motivation — just raw facts.
          </p>
        </div>

        <div className="px-[3.5rem] w-full">
          <LoginButton>
            <ContextButton mode="dark">
              <span className="text-[1.6rem]">Get started</span>
            </ContextButton>
          </LoginButton>
        </div>

      </div >
    </div >
  )
}

export default App