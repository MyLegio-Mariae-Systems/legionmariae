import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import NewMissionPage from "../../../../../../../../components/lmacm/src/hq/mission/new";

const year=new Date().getFullYear()

export const metadata = {
    title: "Legion Maria of African Church Mission - New Mission",
    description: `Registration of a new mission`,
};

export default async function NewMission(request) {

  const session=await getServerSession(authOptions)


    const pathname = process.env.VERCEL_URL

    const toDashboard=()=>{
        redirect('/')
      }

    return(
        <>
        {
            session ? (
                <NewMissionPage pathname={pathname} session={session}/>
            ):(
                toDashboard()
            )
        }
        </>
    )
}