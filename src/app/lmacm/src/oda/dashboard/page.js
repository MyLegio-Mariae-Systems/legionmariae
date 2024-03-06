import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import ODADashboardPage from "../../../../../../components/lmacm/src/oda/dashboard";

const year=new Date().getFullYear()

export const metadata = {
    title: "Legion Maria of African Church Mission - Sign Up",
    description: `Register your mission to the system to start automating your mission processes.`,
};

export default async function ODADashboard(request) {

  const session=await getServerSession(authOptions)


    const pathname = process.env.VERCEL_URL

    const toDashboard=()=>{
        redirect('/')
      }

    return(
        <>
        {
            session ? (
                <ODADashboardPage pathname={pathname} session={session}/>
            ):(
                toDashboard()
            )
        }
        </>
    )
}