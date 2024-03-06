import Image from "next/image";
import HomePage from "../../components/utils/home"
import { getServerSession } from "next-auth";
import authOptions from "./api/auth/[...nextauth]/options";

export default async function Home() {

  const session=await getServerSession(authOptions)

  const toDashboard=()=>{
    redirect('/sc/dashboard')
  }

  console.log(session);

  return (
    <>
    <HomePage session={session}/>
    </>
  );
}

