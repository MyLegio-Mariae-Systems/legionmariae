import { redirect } from "next/navigation";
import PrayerPage from "../../../../../components/utils/resources/prayer/literature";

export default function Prayers(request) {

    const {title, lang}=request.searchParams

    if ((title === '' || null) || (typeof title === 'undefined')) {
        
        redirect('/not-found')
    }

    if ((lang === '' || null) || (typeof lang === 'undefined')) {
        
        redirect('/not-found')
    }


    return(
        <>
            <PrayerPage title={title.toLocaleLowerCase()} lang={lang.toLocaleLowerCase()}/>
        </>
    )
}