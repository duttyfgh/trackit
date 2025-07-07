interface LightLineProps {
    width?: number
    full?: boolean
}

const LightLine = ({ width, full }: LightLineProps) => {
    return (
        <div className=" bg-[#8C8776] h-[1px]" style={full ? { width: "100%" } : { width: `${width}rem` }} />
    )
}

export default LightLine