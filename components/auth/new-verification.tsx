'use client'

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"

import { newVerification } from "@/actions/new-verification"

import CardWrapper from "../card-wripper"
import FormError from "@/components/form-error"
import FormSuccess from "@/components/form-success"
import ContextButton from "@/components/buttons/context-button"

const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const router = useRouter()

    const searchParams = useSearchParams()

    const token = searchParams.get('token')

    const onSubmit = useCallback(() => {
        if (success || error) return

        if (!token) {
            setError("Missing token!")
            return
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data.success)
                setError(data.error)
            }).catch(() => {
                setError("Something went wrong!")
            })
    }, [error, success, token])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])

    const onClick = () => {
        router.push('/auth/login')
    }

    return (
        <CardWrapper
            label="Confirm email"
            backButtonHref="/auth/login"
            title="We're confirming your verification, please wait"
            isBubbles={false}
            isButton={false}
        >

            <div className="flex flex-col justify-center gap-6 min-h-[40rem]">


                <Image src='/fibonacci-man.svg' width={320} height={320} alt="..." className="mb-6" />

                {(!error && !success) ?
                    <div className="w-full flex justify-center py-3">
                        <Image src='/light-loader.svg' width={35} height={35} alt="Loading..." className="animate-spin" />
                    </div>
                    : <div>
                        <FormSuccess message={success} />
                        {!success && (
                            <FormError message={error} />
                        )}
                    </div>
                }


                <ContextButton
                    mode="light"
                    onClick={onClick}
                >
                    <span className="text-[1.6rem]">Back to login</span>
                </ContextButton>


            </div>
        </CardWrapper>
    )
}

export default NewVerificationForm