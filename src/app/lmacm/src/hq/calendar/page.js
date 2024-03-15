import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import LiturgicalCalendarHomePage from "../../../../../../components/lmacm/src/hq/calendar";

const year=new Date().getFullYear()

export const metadata = {
    title: "Legion Maria of African Church Mission - HQ Liturgical Calendar",
};

export default async function LiturgicalCalendar(request) {

  const session=await getServerSession(authOptions)


    const pathname = process.env.VERCEL_URL

    const toDashboard=()=>{
        redirect('/')
      
    }

    return(
        <>
        {
            session ? (
                <LiturgicalCalendarHomePage pathname={pathname} session={session}/>
            ):(
                toDashboard()
            )
        }
        </>
    )
}