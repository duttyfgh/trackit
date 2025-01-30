import Link from "next/link"
import ContextButton from "../context-button"
import Separator from "../separator"
import CardWrapper from "./card-wripper"
import Input from "./input"

const LoginForm = () => {


    return (
        <CardWrapper
            label="Welcome back!"
            backButtonHref="/"
            title='Create your account and start tracking today!'
            nextButtonHref="/sign-up/credentials"
            nextButtonLabel="Next"
            type="login">

            <div className="flex flex-col gap-[4rem] ">

                <Input />

                <Separator title="or" />

                <ContextButton
                    title="Google"
                    img="/google.svg"
                    imageWidth={24}
                    imageHeight={24}
                    mode='dark'
                />

                <div className="flex items-center gap-3 text-[1.6rem] text-[#FFF2C7]/80">
                    <p className="font-light">Don&#39;t have an account?</p>
                    <Link href='/sign-up' className="font-semibold underline">
                        Sign up
                    </Link>
                </div>
            </div>

        </CardWrapper>
    )
}

export default LoginForm