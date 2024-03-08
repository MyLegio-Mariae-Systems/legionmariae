'use client'

import { Footer } from "../../../../../utils/footer"
import { NavbarAfterLogin } from "../../../../../utils/header/headerAfterLogin"
import ODAPendingProjectsHome from "./home"

export default function ODAPendingProjectsPage({session}) {

    return (
        <>
        <NavbarAfterLogin session={session}/>
        <ODAPendingProjectsHome />
        <Footer />
        </>
    )
}