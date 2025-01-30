interface SeparatorProps {
    title: string
}

const Separator = ({ title }: SeparatorProps) => {
    return (
        <div className="flex items-center gap-[2.5rem]">
            <div className="w-full h-[1px] bg-[#FFF2C7]/15"></div>
            <span className="text-[1.4rem] text-[#FFF2C7]/60">{title}</span>
            <div className="w-full h-[1px] bg-[#FFF2C7]/15"></div>
        </div>
    )
}

export default Separator