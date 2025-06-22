interface SeparatorProps {
    title: string
}

const Separator = ({ title }: SeparatorProps) => {
    return (
        <div className="w-full flex items-center gap-[2.5rem]">
            <div className="w-full h-[1px] bg-[#FAF0CF]/15"></div>
            <span className="text-[1.4rem] text-[#FAF0CF]/60 whitespace-nowrap">{title}</span>
            <div className="w-full h-[1px] bg-[#FAF0CF]/15"></div>
            
        </div>
    )
}

export default Separator