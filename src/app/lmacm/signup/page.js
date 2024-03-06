import { redirect } from "next/navigation";
import SignUpPage from "../../../../components/lmacm/signup";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";

const year=new Date().getFullYear()

export const metadata = {
    title: "Legion Maria of African Church Mission - Sign Up",
    description: `Register your mission to the system to start automating your mission processes.`,
};

export default async function SignIn(request) {

  const session=await getServerSession(authOptions)


    // const pathname = new URL(request.url).pathname
    const pathname = process.env.VERCEL_URL
    // console.log(pathname);

    // const {title}=request.searchParams

    // if ((title === '' || null) || (typeof title === 'undefined')) {
        
    //     redirect('/not-found')
    // }


    return(
        <>
            <SignUpPage pathname={pathname} session={session}/>
        </>
    )
}