import Image from "next/image"

const Home = () => {
  return ( 
    <div className="light-bg flex flex-col items-center justify-between  h-screen py-[3.5rem]">
      <h1 className="px-[3.5rem] logo w-full">TrackIt</h1>

      <div className="flex flex-col justify-between items-center gap-[9rem]">
        <div className="flex flex-col items-center">
          <Image src='/landing-photo.svg' width={409} height={400} alt='landing photo'/>
          <p className="max-w-[34.4rem]">
            TrackIt helps you track activities, stay motivated, and make progress toward becoming your best self. Build habits, set goals, and watch your growth. Every activity brings you closer to living with purpose and fulfillment. Start today and embark on your path of self-improvement.
          </p>
        </div>
  
        <button className='text-[1.6rem] dark-bg w-[34.4rem] p-[1rem] rounded-[1.2rem] light-text '>
          Get started
        </button>
      </div>

    </div>
   )
}
 
export default Home