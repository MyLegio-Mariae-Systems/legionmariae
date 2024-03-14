import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import ODADashboardPage from "../../../../../../../components/lmacm/src/oda/dashboard";

const year=new Date().getFullYear()

export const metadata = {
    title: "Legion Maria of African Church Mission - O.D.A Dashboard",
    description: `Legion Maria Organization of Deacons and Acolytes`,
};

export default async function ODADashboard(request) {

  const session=await getServerSession(authOptions)


    const pathname = process.env.VERCEL_URL

    const toDashboard=()=>{
        redirect('/')
    }

    console.log(session);

    return(
        <>
        {
            session ? (
                <ODADashboardPage pathname={pathname} session={session}/>
            ):(
                toDashboard()
            )
        }
        </>
    )
}