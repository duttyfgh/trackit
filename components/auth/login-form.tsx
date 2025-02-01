'use client'

import Link from "next/link"

import * as z from "zod"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { LoginSchema } from "@/schemas"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

import ContextButton from "@/components/context-button"
import Separator from "@/components/separator"

import CardWrapper from "./card-wripper"
import TextInput from "./text-input"
import { useRef } from "react"
import FormError from "@/components/form-error"
import FormSuccess from "../form-success"

const LoginForm = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const handleSubmit = (values: z.infer<typeof LoginSchema>) => {
        console.table(values)
    }


    return (
        <CardWrapper
            label="Welcome back!"
            backButtonHref="/"
            title='Enter your email and password to log in.'
            nextButtonLabel="log in"
            isBubbles={false}
            isButton={false}
        >

            <div className="flex flex-col gap-[4rem]">

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-[2rem]" ref={formRef}>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <TextInput
                                            type='text'
                                            label="Email"
                                            error={form.formState.errors.email?.message}
                                            {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex flex-col gap-2 items-end">
                                            <TextInput
                                                type='password'
                                                label="Password"
                                                error={form.formState.errors.password?.message}
                                                {...field} />
                                            <Link href='/auth/forgot-password' className="text-[1.4rem] text-[#FFF2C7]/70 underline px-2">
                                                Forgot password?
                                            </Link>
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormError message=""/>
                        <FormSuccess message=""/>

                        <ContextButton
                            type="submit"
                            title="Log in"
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
                        <p className="font-light">Don&#39;t have an account?</p>
                        <Link href='/sign-up' className="font-semibold underline">
                            Sign up
                        </Link>
                    </div>
                </div>

            </div>

        </CardWrapper>
    )
}

export default LoginForm