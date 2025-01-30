import LoginButton from "@/components/auth/login-button"
import Logo from "@/components/logo"
import Image from "next/image"

const Home = async () => {

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

        <LoginButton>
          <div className='text-[1.6rem] dark-bg w-[34.4rem] p-[1rem] rounded-[1.2rem] light-text text-center'>
            Get started
          </div>
        </LoginButton>

      </div >
    </div >
  )
}

export default Home