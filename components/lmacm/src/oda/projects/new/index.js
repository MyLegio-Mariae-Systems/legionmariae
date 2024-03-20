'use client'

import { Footer } from "../../../../../utils/footer"
import { NavbarAfterLogin } from "../../../../../utils/header/headerAfterLogin"
import ODANewProjectHome from "./home"

export default function ODANewProjectPage({session}) {

    return (
        <>
        <NavbarAfterLogin session={session}/>
        <ODANewProjectHome />
        <Footer />
        </>
    )
}