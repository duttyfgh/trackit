'use client'

import Link from "next/link"

import * as z from "zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { SignUpSchema } from "@/schemas"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"

import ContextButton from "@/components/context-button"
import Separator from "@/components/separator"

import CardWrapper from "./card-wripper"
import TextInput from "./text-input"

const SignUpNameForm = () => {
    const router = useRouter()

    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            name: "",
            email: "ilove@my.girl",
            password: "123456"

        }
    })

    const handleSubmit = (values: z.infer<typeof SignUpSchema>) => {
        router.push(`/auth/sign-up/${values.name}`)
    }

    return (
        <CardWrapper
            label="Create an account"
            backButtonHref="/"
            title='Enter your name to continue'
            isBubbles={false}
            isButton={false}
        >

            <div className="flex flex-col justify-center gap-[4rem] min-h-[40rem]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-[4rem]">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <TextInput
                                            type='text'
                                            label="Name"
                                            error={form.formState.errors.name?.message}
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <ContextButton
                            type="submit"
                            title="Continue"
                            imageWidth={24}
                            imageHeight={24}
                            mode='light'
                        />

                    </form>
                </Form>

                <Separator title="or" />

                <div className="flex flex-col gap-5 w-full items-center">
                    <ContextButton
                        onClick={() => {/* TODO: do a onClick */ }}
                        title="Google"
                        img="/google.svg"
                        imageWidth={24}
                        imageHeight={24}
                        mode='dark'
                    />

                    <div className="flex items-center gap-3 text-[1.6rem] text-[#FFF2C7]/80 ">
                        <p className="font-light">Already have an account?</p>
                        <Link href='/auth/login' className="font-semibold underline">
                            login in
                        </Link>
                    </div>
                </div>

            </div>

        </CardWrapper>
    )
}

export default SignUpNameForm