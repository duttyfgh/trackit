'use client'

import Link from "next/link"

import * as z from "zod"

import { useTransition, useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"

import { LoginSchema } from "@/schemas"
import { login } from "@/actions/login"

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
import GoogleAuthorizationButton from "./google-authorization-button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

const LoginForm = () => {
    const searchParams = useSearchParams()
    const urlError = searchParams.get('error') === 'OAuthAccountNotLinked' ? 'The email is already used with another provider!' : ''

    const [showTwoFactor, setShowTwoFactor] = useState<boolean>(true)
    const [errorMessage, setErrorMessage] = useState<string | undefined>('')
    const [successMessage, setSuccessMessage] = useState<string | undefined>('')
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""

        }
    })

    const handleSubmit = (values: z.infer<typeof LoginSchema>) => {
        setErrorMessage('')
        setSuccessMessage('')

        startTransition(() => {
            login(values).then((data) => {
                if (data?.error) {
                    form.reset()
                    setErrorMessage(data.error)
                }
                if (data?.success) {
                    form.reset()
                    setSuccessMessage(data?.success)
                }

                if (data?.twoFactorToken) {
                    setShowTwoFactor(true)
                }
            })
                .catch(() => {
                    setErrorMessage('Something went wrong!')
                })
        })
    }

    return (
        <CardWrapper
            label={showTwoFactor ? "Check your email!" : "Welcome back!"}
            backButtonHref="/"
            title={showTwoFactor ? 'Enter the confirmation code to continue.' : 'Enter your email and password to log in.'}
            nextButtonLabel="log in"
            isBubbles={false}
            isButton={false}
        >

            <div className="flex flex-col gap-[4rem]">

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-[2rem]">
                        {showTwoFactor && (
                            (
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormControl>
                                                <InputOTP
                                                    maxLength={6}
                                                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    onBlur={field.onBlur}
                                                    disabled={isPending}
                                                >
                                                    <InputOTPGroup className="flex gap-2 justify-center w-full">
                                                        {[...Array(6)].map((_, i) => (
                                                            <InputOTPSlot
                                                                key={i}
                                                                index={i}
                                                                className="w-[50px] h-[50px] rounded-[15px] focus:outline-none text-[20px]  border light-text"
                                                            />
                                                        ))}
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </FormControl>
                                            {fieldState.error && (
                                                <FormError message={fieldState.error.message} />
                                            )}
                                        </FormItem>
                                    )}
                                />
                            )
                        )}

                        {!showTwoFactor && (
                            <>
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

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex flex-col gap-3 items-end">
                                                    <TextInput
                                                        type='password'
                                                        label="Password"
                                                        error={form.formState.errors.password?.message}
                                                        disabled={isPending}
                                                        {...field} />
                                                    <Link href='/auth/reset' className="text-[1.4rem] text-[#FFF2C7]/70 underline px-2">
                                                        Forgot password?
                                                    </Link>
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        <FormError message={errorMessage || urlError} />
                        <FormSuccess message={successMessage} />

                        <ContextButton
                            type="submit"
                            title={isPending ? '' : (showTwoFactor ? "Confirm" : "Log in")}
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
                    <GoogleAuthorizationButton />

                    <div className="flex items-center gap-3 text-[1.6rem] light-text">
                        <p className="font-light">Don&#39;t have an account?</p>
                        <Link href='/auth/sign-up' className="font-semibold underline text-[#FFF2C7]/80">
                            Sign up
                        </Link>
                    </div>
                </div>

            </div>

        </CardWrapper>
    )
}

export default LoginForm