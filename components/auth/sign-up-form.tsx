'use client'

import Link from "next/link"

import * as z from "zod"

import { useTransition, useState, useRef, useEffect } from 'react'
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

import { signUp } from "@/actions/sign-up"
import { login } from "@/actions/login"
import { newVerification } from "@/actions/new-verification"

import ContextButton from "@/components/context-button"
import Separator from "@/components/separator"
import FormError from "@/components/form-error"
import FormSuccess from "@/components/form-success"

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"
import GoogleAuthorizationButton from "./google-authorization-button"
import TextInput from "./text-input"
import CardWrapper from "./card-wripper"

const COUNTDOWN_SECONDS = 5 * 60

interface SignUpNameFormProps {
    name: string
}

const SignUpForm = ({ name }: SignUpNameFormProps) => {
    const router = useRouter()

    if (!name) {
        router.push('/auth/sign-up')
    }

    const timerRef = useRef<number | null>(null)

    const [isCodeMode, setIsCodeMode] = useState<boolean>(false)
    const [secondsLeft, setSecondsLeft] = useState(0)

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

    const restartTimer = () => {
        if (timerRef.current !== null) {
            clearInterval(timerRef.current)
        }
        setSecondsLeft(COUNTDOWN_SECONDS)

        timerRef.current = window.setInterval(() => {
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
        if (isCodeMode) {
            restartTimer()
        }
        return () => {
            if (timerRef.current !== null) clearInterval(timerRef.current)
        }
    }, [isCodeMode])

    const handleSubmit = (values: z.infer<typeof SignUpSchema>) => {
        if (isCodeMode) {

            if (!values.code) {
                setSuccessMessage('')
                setErrorMessage('Code is required!')
                return
            }

            newVerification(values.code)
                .then((data) => {
                    setSuccessMessage(data.success)
                    setErrorMessage(data.error)
                }).catch(() => {
                    setSuccessMessage('')
                    setErrorMessage("Something went wrong!")
                })

            login(values).then((data) => {
                if (data?.error) {
                    setSuccessMessage('')
                    setErrorMessage(data.error)

                    if (isCodeMode) {

                        form.resetField('code')
                    } else {

                        form.reset()
                    }
                }
                if (data?.success) {
                    setErrorMessage('')
                    setSuccessMessage(data?.success)
                }

            })
                .catch(() => {
                    setSuccessMessage('')
                    setErrorMessage('Something went wrong!')
                })
        }
        else {
            startTransition(() => {
                signUp(values).then((data) => {
                    if (data?.error) {
                        setSuccessMessage('')
                        setErrorMessage(data.error)
                    }

                    if (data?.success) {
                        setErrorMessage('')
                        setSuccessMessage(data.success)
                    }

                    if (data?.isCodeMode) {
                        setIsCodeMode(true)
                    }
                })
                    .catch(() => {
                        setSuccessMessage('')
                        setErrorMessage('Something went wrong!')
                    })
            })
        }
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
            label="Create an account"
            backButtonHref="/auth/sign-up"
            title='Enter your email and password to sign up.'
            isBubbles={false}
            isButton={false}
        >

            <div className="flex flex-col gap-[4rem]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-[2rem]">
                        {isCodeMode && (
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
                        )}

                        {!isCodeMode && (
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
                            </>

                        )}
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
                    <GoogleAuthorizationButton />

                    <div className="flex items-center gap-3 text-[1.6rem] light-text">
                        <p className="font-light">Already have an account?</p>
                        <Link href='/auth/login' className="font-semibold underline text-[#FFF2C7]/80">
                            Login in
                        </Link>
                    </div>
                </div>

            </div>

        </CardWrapper>
    )
}

export default SignUpForm