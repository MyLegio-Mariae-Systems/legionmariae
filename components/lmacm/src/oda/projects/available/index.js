'use client'

import { Footer } from "../../../../../utils/footer"
import { NavbarAfterLogin } from "../../../../../utils/header/headerAfterLogin"
import ODAAvailableProjectsHome from "./home"

export default function ODAAvailableProjectsPage({session}) {

    return (
        <>
        <NavbarAfterLogin session={session}/>
        <ODAAvailableProjectsHome />
        <Footer />
        </>
    )
}