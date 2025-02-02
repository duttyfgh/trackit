'use client'

import Link from "next/link"

import * as z from "zod"

import { useTransition, useState } from 'react'
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
import FormError from "@/components/form-error"
import FormSuccess from "@/components/form-success"

import CardWrapper from "./card-wripper"
import TextInput from "./text-input"
import { signUp } from "@/actions/sign-up"


interface SignUpNameFormProps {
    name: string
}

const SignUpForm = ({ name }: SignUpNameFormProps) => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>('')
    const [successMessage, setSuccessMessage] = useState<string | undefined>('')
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            name: name.toString(),
            email: "",
            password: ""

        }
    })

    const handleSubmit = (values: z.infer<typeof SignUpSchema>) => {
        console.log(values)

        startTransition(() => {
            signUp(values).then((data) => {
                if (data?.error) {
                    form.reset()
                    setErrorMessage(data.error)
                }

                if (data?.success) {
                    form.reset()
                    setSuccessMessage(data.success)
                }
            })
                .catch(() => {
                    setErrorMessage('Something went wrong!')
                })
        })
    }

    return (
        <CardWrapper
            label="Create an account"
            backButtonHref="/auth/sign-up-photo"
            title='Enter your email and password to sign up.'
            isBubbles={false}
            isButton={false}
        >

            <div className="flex flex-col gap-[4rem]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-[2rem]">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <TextInput
                                            type='text'
                                            label="Email"
                                            error={form.formState.errors.name?.message}
                                            disabled={isPending}
                                            {...field}
                                        />
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
                                        <TextInput
                                            type='password'
                                            label="Password"
                                            error={form.formState.errors.password?.message}
                                            disabled={isPending}
                                            {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormError message={errorMessage} />
                        <FormSuccess message={successMessage} />

                        <ContextButton
                            type="submit"
                            title={isPending ? '' : "Continue"}
                            img={isPending ? '/loader.svg' : ''}
                            imageWidth={24}
                            imageHeight={24}
                            mode='light'
                            disabled={isPending}
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
                            Login in
                        </Link>
                    </div>
                </div>

            </div>

        </CardWrapper>
    )
}

export default SignUpForm