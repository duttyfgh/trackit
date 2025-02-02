import SignUpForm from "@/components/auth/sign-up-form"

interface SignUpPageProps {
    params: {
        name: string
    }
}

const SignUpPage = async ({ params }: SignUpPageProps) => {
    const { name } = params

    return (
        <SignUpForm name={name} />
    )
}

export default SignUpPage