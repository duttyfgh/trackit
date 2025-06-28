import BackButton from "@/components/buttons/back-button"
import TrackerCard from "@/components/cards/tracker-card"

const DayTracker = () => {
    return (
        <div className="p-12 pt-24 flex flex-col gap-9">
            <BackButton href="/choose-tracking" />

            <TrackerCard title="Day tracking">
                <ul className="light-text list-disc flex flex-col gap-2">
                    <li className="text-[1.6rem]">
                        average mood
                    </li>
                     <li className="text-[1.6rem]">
                        average anxiety
                    </li>
                     <li className="text-[1.6rem]">
                        weather
                    </li>
                     <li className="text-[1.6rem]">
                        temperature
                    </li>
                     <li className="text-[1.6rem]">
                        overall retting
                    </li>
                </ul>
            </TrackerCard>
        </div>
    )
}

export default DayTracker