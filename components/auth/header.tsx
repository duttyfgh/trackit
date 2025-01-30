
interface HeaderProps {
    label: string
    title: string
}

const Header = ({ label, title }: HeaderProps) => {
    return (
        <div className="light-text flex flex-col items-center">
            <h1 className="text-[3.4rem]">{label}</h1>
            <p className="font-thin text-[#FFF2C7]/80">{title}</p>
        </div>
    )
}

export default Header