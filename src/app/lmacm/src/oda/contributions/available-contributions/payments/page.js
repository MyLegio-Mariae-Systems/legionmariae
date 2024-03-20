import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import ODAContributionPaymentsPage from "../../../../../../../../components/lmacm/src/oda/contributions/payments";

const year=new Date().getFullYear()

export const metadata = {
    title: "Legion Maria of African Church Mission - O.D.A Contribution Payments",
    description: `Legion Maria Organization of Deacons and Acolytes Contribution Payments`,
};

export default async function ODAAvailableProjects(request) {

  const session=await getServerSession(authOptions)


    const pathname = process.env.VERCEL_URL

    const {id, level}=request.searchParams

    const parameters={id,level}


    const toDashboard=()=>{
        redirect('/')
      }

    return(
        <>
        {
            session ? (
                <ODAContributionPaymentsPage pathname={pathname} session={session} parameters={parameters}/>
            ):(
                toDashboard()
            )
        }
        </>
    )
}