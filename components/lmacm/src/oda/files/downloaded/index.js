'use client'

import { Footer } from "../../../../../utils/footer"
import { NavbarAfterLogin } from "../../../../../utils/header/headerAfterLogin"
import ODADownloadedFilesHome from "./home"

export default function ODADownloadedFilesPage({session}) {

    return (
        <>
        <NavbarAfterLogin session={session}/>
        <ODADownloadedFilesHome />
        <Footer />
        </>
    )
}