'use client'

import Link from "next/link"

import * as z from "zod"

import { useTransition, useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { ResetSchema } from "@/schemas"
import { reset } from "@/actions/reset"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"

import ContextButton from "@/components/buttons/context-button"
import Separator from "@/components/separator"
import FormError from "@/components/form-error"
import FormSuccess from "@/components/form-success"

import CardWrapper from "../card-wripper"
import TextInput from "./text-input"
import Image from "next/image"

const ResetForm = () => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>('')
    const [successMessage, setSuccessMessage] = useState<string | undefined>('')
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",

        }
    })

    const handleSubmit = (values: z.infer<typeof ResetSchema>) => {
        setErrorMessage('')
        setSuccessMessage('')

        startTransition(() => {
            reset(values).then((data) => {
                if (data?.error) {
                    setErrorMessage(data.error)
                }
                if (data?.success) {
                    setSuccessMessage(data?.success)
                }
            })
                .catch(() => {
                    setErrorMessage('Something went wrong!')
                })
        })
    }

    return (
        <CardWrapper
            label="Forgot the password?"
            backButtonHref="/auth/sign-in"
            title='Enter your email to reset your password.'
            nextButtonLabel="Back to login"
            isBubbles={false}
            isButton={false}
        >

            <div className="flex flex-col justify-around gap-[4rem] h-[400px] pt-[40px]">

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
                                            error={form.formState.errors.email?.message}
                                            disabled={isPending}
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormError message={errorMessage} />
                        <FormSuccess message={successMessage} />

                        <ContextButton
                            mode="light"
                            type="submit"
                            disabled={isPending}
                        >
                            <span className="text-[1.6rem]">
                                {!isPending && "Send reset email"}
                            </span>

                            {isPending && (
                                <Image src='/loader.svg' width={24} height={24} alt="Loading..." className="animate-spin" />
                            )}
                        </ContextButton>

                    </form>
                </Form>

                <div className="flex flex-col gap-[2rem]">
                    <Separator title="or" />

                    <div className="flex flex-col gap-5 w-full items-center">

                        <div className="flex items-center gap-3 text-[1.6rem] light-text">
                            <p className="font-light">Don&#39;t have an account?</p>
                            <Link href='/auth/sign-up' className="font-semibold underline text-[#FFF2C7]/80">
                                Sign up
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

        </CardWrapper>
    )
}


export default ResetForm