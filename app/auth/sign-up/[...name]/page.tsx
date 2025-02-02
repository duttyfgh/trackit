import { PageProps } from "@/.next/types/app/layout"
import SignUpForm from "@/components/auth/sign-up-form"

const SignUpPage = async ({ params }: PageProps) => {
    const { name } = await params

    return (
        <SignUpForm name={name} />
    )
}

export default SignUpPage

//test line