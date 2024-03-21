'use client'

import { Footer } from "../../../../../utils/footer"
import { NavbarAfterLogin } from "../../../../../utils/header/headerAfterLogin"
import ODANewMemberHome from "./home"

export default function ODANewMemberPage({session}) {

    return (
        <>
        <NavbarAfterLogin session={session}/>
        <ODANewMemberHome session={session}/>
        <Footer />
        </>
    )
}