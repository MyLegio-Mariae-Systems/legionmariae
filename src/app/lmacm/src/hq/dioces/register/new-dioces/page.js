import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import NewDiocesPage from "../../../../../../../../components/lmacm/src/hq/dioces/new";

const year=new Date().getFullYear()

export const metadata = {
    title: "Legion Maria of African Church Mission - New Dioces",
    description: `Registration of a new dioces`,
};

export default async function NewDioces(request) {

  const session=await getServerSession(authOptions)


    const pathname = process.env.VERCEL_URL

    const toDashboard=()=>{
        redirect('/')
      
    }

    return(
        <>
        {
            session ? (
                <NewDiocesPage pathname={pathname} session={session}/>
            ):(
                toDashboard()
            )
        }
        </>
    )
}