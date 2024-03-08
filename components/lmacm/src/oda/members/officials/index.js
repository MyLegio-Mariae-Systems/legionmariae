'use client'

import { Footer } from "../../../../../utils/footer"
import { NavbarAfterLogin } from "../../../../../utils/header/headerAfterLogin"
import ODAOfficialMembersHome from "./home"

export default function ODAOfficialMembersPage({session}) {

    return (
        <>
        <NavbarAfterLogin session={session}/>
        <ODAOfficialMembersHome />
        <Footer />
        </>
    )
}