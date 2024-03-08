import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import NewArchDiocesPage from "../../../../../../../../components/lmacm/src/hq/arch-dioces/new";

const year=new Date().getFullYear()

export const metadata = {
    title: "Legion Maria of African Church Mission - New Arch Dioces",
    description: `Registration of a new arch dioces`,
};

export default async function NewArchDioces(request) {

  const session=await getServerSession(authOptions)


    const pathname = process.env.VERCEL_URL

    const toDashboard=()=>{
        redirect('/')
      }

    return(
        <>
        {
            session ? (
                <NewArchDiocesPage pathname={pathname} session={session}/>
            ):(
                toDashboard()
            )
        }
        </>
    )
}