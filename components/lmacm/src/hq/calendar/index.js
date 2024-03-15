'use client'

import { Footer } from "../../../../utils/footer"
import { NavbarAfterLogin } from "../../../../utils/header/headerAfterLogin"
import LiturgicalCalendarHome from "./home"

export default function LiturgicalCalendarHomePage({session}) {

    return (
        <>
        <NavbarAfterLogin session={session}/>
        <LiturgicalCalendarHome />
        <Footer />
        </>
    )
}