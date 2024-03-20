import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import ODANewContributionPage from "../../../../../../../components/lmacm/src/oda/contributions/new";

const year=new Date().getFullYear()

export const metadata = {
    title: "Legion Maria of African Church Mission - O.D.A New Contribution",
    description: `Legion Maria Organization of Deacons and Acolytes Contribution Registration`,
};

export default async function ODANewContribution(request) {

  const session=await getServerSession(authOptions)


    const pathname = process.env.VERCEL_URL

    const toDashboard=()=>{
        redirect('/')
      }

    return(
        <>
        {
            session ? (
                <ODANewContributionPage pathname={pathname} session={session}/>
            ):(
                toDashboard()
            )
        }
        </>
    )
}