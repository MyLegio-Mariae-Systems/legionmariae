'use client'

import { Footer } from "../../../../../utils/footer"
import { NavbarAfterLogin } from "../../../../../utils/header/headerAfterLogin"
import ODACompletedProjectsHome from "./home"

export default function ODACompletedProjectsPage({session}) {

    return (
        <>
        <NavbarAfterLogin session={session}/>
        <ODACompletedProjectsHome />
        <Footer />
        </>
    )
}