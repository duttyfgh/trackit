'use client'

import Link from "next/link"


const HomePage = () => {
    const session = {}

    return (
        <div>
            <Link href='/settings'>settings</Link>
        </div>
    )
}

export default HomePage