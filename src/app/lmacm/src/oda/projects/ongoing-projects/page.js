import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import ODAOngoingProjectsPage from "../../../../../../../components/lmacm/src/oda/projects/ongoing";

const year=new Date().getFullYear()

export const metadata = {
    title: "Legion Maria of African Church Mission - O.D.A Acolyte Members",
    description: `Legion Maria Organization of Deacons and Acolytes Members`,
};

export default async function ODAOngoingProjects(request) {

  const session=await getServerSession(authOptions)


    const pathname = process.env.VERCEL_URL

    const toDashboard=()=>{
        redirect('/')
      }

    return(
        <>
        {
            session ? (
                <ODAOngoingProjectsPage pathname={pathname} session={session}/>
            ):(
                toDashboard()
            )
        }
        </>
    )
}