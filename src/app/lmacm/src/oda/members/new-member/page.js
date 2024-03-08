import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import ODANewMemberPage from "../../../../../../../components/lmacm/src/oda/members/new";

const year=new Date().getFullYear()

export const metadata = {
    title: "Legion Maria of African Church Mission - O.D.A New Member",
    description: `Legion Maria's Organization of Deacons and Acolytes Member Registration`,
};

export default async function ODANewMember(request) {

  const session=await getServerSession(authOptions)


    const pathname = process.env.VERCEL_URL

    const toDashboard=()=>{
        redirect('/')
      }

    return(
        <>
        {
            session ? (
                <ODANewMemberPage pathname={pathname} session={session}/>
            ):(
                toDashboard()
            )
        }
        </>
    )
}