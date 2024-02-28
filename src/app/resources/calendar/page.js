import { redirect } from "next/navigation";
import LiturgicalCalenderPage from "../../../../components/utils/resources/calendar";

const year=new Date().getFullYear()

export const metadata = {
    title: "Legion Maria of African Church Mission - Liturgical Calendar",
    description: `${year} Legion Maria Church Auto Generated Liturgical Calender`,
};

export default function LiturgicalCalender(request) {

    // const pathname = new URL(request.url).pathname
    const pathname = process.env.VERCEL_URL
    // console.log(pathname);

    // const {title}=request.searchParams

    // if ((title === '' || null) || (typeof title === 'undefined')) {
        
    //     redirect('/not-found')
    // }


    return(
        <>
            <LiturgicalCalenderPage pathname={pathname}/>
        </>
    )
}