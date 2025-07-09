
interface TrackerListItem {
    children: React.ReactNode
}

const TrackerListItem = ({children}: TrackerListItem) => {
    return (
        <li className="text-[1.6rem]">
            <div className="flex gap-2 items-center">
                
                {children}
            </div>
        </li>
    )
}

export default TrackerListItem