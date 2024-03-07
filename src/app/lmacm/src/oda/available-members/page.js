import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import ODAAvailableMembersPage from "../../../../../../components/lmacm/src/oda/members/available";

const year=new Date().getFullYear()

export const metadata = {
    title: "Legion Maria of African Church Mission - O.D.A Available Members",
    description: `Legion Maria Organization of Deacons and Acolytes Available Members`,
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
                <ODAAvailableMembersPage pathname={pathname} session={session}/>
            ):(
                toDashboard()
            )
        }
        </>
    )
}