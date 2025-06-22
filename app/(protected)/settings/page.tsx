'use client'

import { changeUserName, deleteAccount } from "@/actions/profile"
import TextInput from "@/components/auth/text-input"
import TextInputLine from "@/components/auth/text-input-line"
import ContextButton from "@/components/buttons/context-button"
import PrimaryButton from "@/components/buttons/primary-button"
import Separator from "@/components/separator"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"
import { useCurrentUser } from "@/hooks/use-current-user"
import { ChangeNameSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useSession } from "next-auth/react"

const SettingsPage = () => {
    const [isChangeMode, setIsChangeMode] = useState<boolean>(false)

    const user = useCurrentUser()

    const { update } = useSession()

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

    const openChangeMode = (e: FormEvent) => {
        e.preventDefault()
        setIsChangeMode(true)
    }

    const closeChangeMode = () => {
        form.reset()
        setIsChangeMode(false)
    }

    const form = useForm<z.infer<typeof ChangeNameSchema>>({
        resolver: zodResolver(ChangeNameSchema),
        defaultValues: {
            name: user?.name || '',
        }
    })

    const handleSubmit = (values: z.infer<typeof ChangeNameSchema>) => {
        startTransition(() => {
            if (!user?.email || !values.name) return

            changeUserName(values.name, user.email)
                .then(() => {
                    update()
                    closeChangeMode()
                })
        })
    }

    return (
        <div className="flex flex-col justify-between h-full mt-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-[4rem]">
                    <div className='w-full flex justify-center items-center flex-col mt-[2rem]flex-col gap-[1rem]'>
                        <Image src={user?.image || '/placeholder-avatar.png'} width={120} height={120} alt="FN" className="rounded-full" />

                        {isChangeMode
                            ? (
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <TextInputLine
                                                    type='text'
                                                    label="Name"
                                                    error={form.formState.errors.name?.message}
                                                    autoFocus
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            )
                            : (<h1 className="dark-text text-[2.4rem]">@<span className="text-[2.4rem]">{user?.name}</span></h1>)
                        }

                        <div className="my-8 px-[3.5rem] flex justify-between w-full">
                            <Link href='/home' className="flex gap-[0.8rem] items-center">
                                <Image src='/back.svg' width={23} height={23} alt='<-' />
                                <span className="font-[410] text-[1.8rem]">back</span>
                            </Link>

                            {
                                isChangeMode
                                    ? (
                                        <div className="flex gap-8 items-center">
                                            <div onClick={closeChangeMode}>
                                                <Image src='/x-mark.svg' height={17} width={17} alt='Change profile' />
                                            </div>

                                            <button type="submit">
                                                <Image src='/approve-icon.svg' height={20} width={20} alt='Change profile' />
                                            </button>
                                        </div>
                                    )
                                    : (
                                        <button onClick={openChangeMode}>
                                            <Image src='/dark-pen.svg' height={16} width={16} alt='Change profile' />
                                        </button>
                                    )
                            }
                        </div>

                    </div>

                </form>
            </Form>

            <div className='h-full flex flex-col dark-bg rounded-t-[2rem] items-stretch p-[3.5rem]'>

                <h1 className="text-[2.6rem] light-primary-text mb-[4rem]">Settings</h1>


                <div className="flex flex-col gap-[3.5rem]">

                    <div className="flex flex-col">
                        <PrimaryButton
                            img="/emojis/settings-emoji.svg"
                            title="Edit home page"
                            symbolImg="/light-pen.svg"
                            symbolHeight={16}
                            symbolWight={16}
                            onClick={() => { }} // TODO: implement edit home page functional
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

                        {/* TODO: ask if user is  sure before deleting account*/}
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
        </div >
    )
}

export default SettingsPage