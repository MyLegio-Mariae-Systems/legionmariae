'use client'

import { Footer } from "../../../../../utils/footer"
import { NavbarAfterLogin } from "../../../../../utils/header/headerAfterLogin"
import ODAOngoingProjectsHome from "./home"

export default function ODAOngoingProjectsPage({session}) {

    return (
        <>
        <NavbarAfterLogin session={session}/>
        <ODAOngoingProjectsHome />
        <Footer />
        </>
    )
}