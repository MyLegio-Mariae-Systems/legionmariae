import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import ODACompletedProjectsPage from "../../../../../../../components/lmacm/src/oda/projects/completed";

const year=new Date().getFullYear()

export const metadata = {
    title: "Legion Maria of African Church Mission - O.D.A Registered Members",
    description: `Legion Maria Organization of Deacons and Acolytes Registered Members`,
};

export default async function ODACompletedProjects(request) {

  const session=await getServerSession(authOptions)


    const pathname = process.env.VERCEL_URL

    const toDashboard=()=>{
        redirect('/')
      }

    return(
        <>
        {
            session ? (
                <ODACompletedProjectsPage pathname={pathname} session={session}/>
            ):(
                toDashboard()
            )
        }
        </>
    )
}