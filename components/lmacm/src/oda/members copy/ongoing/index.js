'use client'

import { Footer } from "../../../../../utils/footer"
import { NavbarAfterLogin } from "../../../../../utils/header/headerAfterLogin"
import ODAAcolyteMembersHome from "./home"

export default function ODAAcolyteMembersPage({session}) {

    return (
        <>
        <NavbarAfterLogin session={session}/>
        <ODAAcolyteMembersHome />
        <Footer />
        </>
    )
}