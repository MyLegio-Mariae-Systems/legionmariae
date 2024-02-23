import { redirect } from "next/navigation";
import LiturgicalCalenderPage from "../../../../components/utils/resources/calender";

export default function LiturgicalCalender(request) {

    const {title}=request.searchParams

    if ((title === '' || null) || (typeof title === 'undefined')) {
        
        redirect('/not-found')
    }


    return(
        <>
            <LiturgicalCalenderPage/>
        </>
    )
}