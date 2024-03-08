import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import ODAMyContributionsPage from "../../../../../../../components/lmacm/src/oda/contributions/my";

const year=new Date().getFullYear()

export const metadata = {
    title: "Legion Maria of African Church Mission - O.D.A Acolyte Members",
    description: `Legion Maria Organization of Deacons and Acolytes Members`,
};

export default async function ODAMyContributions(request) {

  const session=await getServerSession(authOptions)


    const pathname = process.env.VERCEL_URL

    const toDashboard=()=>{
        redirect('/')
      }

    return(
        <>
        {
            session ? (
                <ODAMyContributionsPage pathname={pathname} session={session}/>
            ):(
                toDashboard()
            )
        }
        </>
    )
}