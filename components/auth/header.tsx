
interface HeaderProps {
    label: string
    title: string
}

const Header = ({ label, title }: HeaderProps) => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-[3.4rem] light-primary-text">{label}</h1>
            <p className="font-thin light-text">{title}</p>
        </div>
    )
}

export default Header