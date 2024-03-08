import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import ODADeaconMembersPage from "../../../../../../../components/lmacm/src/oda/members/deacons";

const year=new Date().getFullYear()

export const metadata = {
    title: "Legion Maria of African Church Mission - O.D.A Deacon Members",
    description: `Legion Maria's Organization of Deacons and Acolytes Members`,
};

export default async function ODAOngoingContributions(request) {

  const session=await getServerSession(authOptions)


    const pathname = process.env.VERCEL_URL

    const toDashboard=()=>{
        redirect('/')
      }

    return(
        <>
        {
            session ? (
                <ODADeaconMembersPage pathname={pathname} session={session}/>
            ):(
                toDashboard()
            )
        }
        </>
    )
}