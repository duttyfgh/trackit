const Bubble = ({ isEmpty }: { isEmpty: boolean }) => {
    return (
        <div className={`w-4 h-4 border ${isEmpty ? 'border-[#FFF2C7]' : 'light-bg'} rounded-full`}></div>
    )
}


export default Bubble