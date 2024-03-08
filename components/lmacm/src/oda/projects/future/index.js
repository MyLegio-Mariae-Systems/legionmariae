'use client'

import { Footer } from "../../../../../utils/footer"
import { NavbarAfterLogin } from "../../../../../utils/header/headerAfterLogin"
import ODAFutureProjectsHome from "./home"

export default function ODAFutureProjectsPage({session}) {

    return (
        <>
        <NavbarAfterLogin session={session}/>
        <ODAFutureProjectsHome />
        <Footer />
        </>
    )
}