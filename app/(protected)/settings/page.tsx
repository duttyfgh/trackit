'use client'

import { deleteAccount } from "@/actions/profile"
import ContextButton from "@/components/buttons/context-button"
import PrimaryButton from "@/components/buttons/primary-button"
import Separator from "@/components/separator"
import { useCurrentUser } from "@/hooks/use-current-user"
import { signOut } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

const SettingsPage = () => {
    const user = useCurrentUser()
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const signOutHandler = () => {
        signOut()
    }

    const deleAccountHandler = () => {
        startTransition(() => {
            deleteAccount(user?.email || '')
        })

        router.push('/')

    }

    return (
        <div className="flex flex-col justify-between h-full mt-auto">

            <div className='w-full flex justify-center items-center flex-col mt-[2rem]flex-col gap-[1rem]'>
                <Image src={user?.image || '/placeholder-avatar.png'} width={120} height={120} alt="FN" className="rounded-full" />
                <h1 className="dark-text text-[2.4rem]">@<span className="text-[2.4rem]">dutyfgh</span></h1>
            </div>

            <div className='h-full flex flex-col dark-bg rounded-t-[2rem] items-stretch p-[3.5rem]'>

                <h1 className="text-[2.6rem] light-primary-text">Settings</h1>


               <div className="flex flex-col gap-[3.5rem]">

                    <div className="flex flex-col">
                        <PrimaryButton 
                        img="/emojis/settings-emoji.svg"
                        title="Edit home page"
                        symbolImg="/light-pen.svg"
                        symbolHeight={16}
                        symbolWight={16}
                        />
 
                    </div>

                    <Separator title="version 0.1" />
    
                    <div className="flex flex-col gap-6">
                        <ContextButton mode="dark" onClick={signOutHandler}>
                            <div className="flex items-center gap-4">
                                <span className="text-[1.6rem]">log out</span>
                                <Image src='/logout.svg' width={13} height={13} alt=">]" />
                            </div>
                        </ContextButton>
    
                        <ContextButton mode="dark" isDeleteMode disabled={isPending} onClick={deleAccountHandler}>
                            <div className="flex items-center gap-4">
                                <span className="text-[1.6rem] delete-color">{!isPending && 'Delete account'}</span>
                                <Image
                                    src={isPending ? '/loader.svg' : '/trash-can.svg'}
                                    width={17}
                                    height={17}
                                    alt="|_|"
                                    className={isPending ? 'animate-spin' : ''} />
                            </div>
                        </ContextButton>
                    </div>
               </div>

            </div>
        </div>
    )
}

export default SettingsPage