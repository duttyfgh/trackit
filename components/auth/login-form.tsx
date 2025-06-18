'use client'

import Link from "next/link"

import * as z from "zod"

import { useTransition, useState, useEffect, useRef } from 'react'
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
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import ContextButton from "@/components/context-button"
import Separator from "@/components/separator"
import FormError from "@/components/form-error"
import FormSuccess from "@/components/form-success"

import CardWrapper from "./card-wripper"
import TextInput from "./text-input"
import GoogleAuthorizationButton from "./google-authorization-button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"
import { newVerification } from "@/actions/new-verification"

const COUNTDOWN_SECONDS = 5 * 60 // 5 min

const LoginForm = () => {
    const searchParams = useSearchParams()
    const urlError = searchParams.get('error') === 'OAuthAccountNotLinked' ? 'The email is already used with another provider!' : ''

    const timerRef = useRef<number | null>(null)

    const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false)
    const [secondsLeft, setSecondsLeft] = useState(0)

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

    // this timer is used for resending codes, user can try it every 5 minutes 
    const restartTimer = () => {
        if (timerRef.current !== null) {
            clearInterval(timerRef.current)
        }

        setSecondsLeft(COUNTDOWN_SECONDS)

        timerRef.current = window.setInterval(() => {

            // every 1 second disincrease secs to get nice ux/ui
            setSecondsLeft((s) => {
                if (s <= 1) {
                    if (timerRef.current !== null) clearInterval(timerRef.current)
                    return 0
                }
                return s - 1
            })
        }, 1000)
    }

    useEffect(() => {
        if (showTwoFactor) {
            restartTimer()
        }

        return () => {
            if (timerRef.current !== null) clearInterval(timerRef.current)
        }
    }, [showTwoFactor])

    const handleSubmit = (values: z.infer<typeof LoginSchema>) => {

        // cleans errors and successes every time we submit the form to improve ux
        setErrorMessage('')
        setSuccessMessage('')

        if (showTwoFactor && !values.code) {
            setErrorMessage('Code is required!')
            return
        }

        // if we have the code trying to verify it to it let us login 
        if (values.code) {
            newVerification(values.code)
                .then((data) => {
                    setSuccessMessage(data.success)
                    setErrorMessage(data.error)
                }).catch(() => {
                    setSuccessMessage('')
                    setErrorMessage("Something went wrong!")
                })
        }

        startTransition(() => {
            login(values).then((data) => {
                if (data?.error) {
                    setErrorMessage(data.error)
                }
                if (data?.success) {
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

    const handleResend = async () => {
        setErrorMessage(undefined)

        try {
            const { email, password } = form.getValues()
            const data = await login({ email, password })

            if (data?.twoFactorToken) {
                form.resetField('code')
                restartTimer()
            } else if (data?.error) {
                setErrorMessage(data.error)
            }

        } catch {
            setErrorMessage('Something went wrong!')
        }
    }

    const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
    const seconds = String(secondsLeft % 60).padStart(2, '0')

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
                                <>
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
                                                        <InputOTPGroup className="flex gap-2 justify-between w-full">
                                                            {[...Array(6)].map((_, i) => (
                                                                <InputOTPSlot
                                                                    key={i}
                                                                    index={i}
                                                                    className="w-[54px] h-[54px] rounded-[15px] focus:outline-none text-[20px]  border light-text"
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

                                    <div className="w-full flex justify-end -mt-6 pr-2">
                                        {secondsLeft > 0 ? (
                                            <p className="text-[#fff2c7b3]/50 text-[1.5rem] font-thin">
                                                Code expires in: {minutes}:{seconds}
                                            </p>
                                        ) : (
                                            <p className="text-[#fff2c7b3]/50 text-[1.5rem] font-thin underline" onClick={handleResend}>
                                                Resend code
                                            </p>
                                        )}
                                    </div>
                                </>

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

        </CardWrapper >
    )
}

export default LoginForm