'use client'

import { Footer } from "../../../../../utils/footer"
import { NavbarAfterLogin } from "../../../../../utils/header/headerAfterLogin"
import ODADeaconMembersHome from "./home"

export default function ODADeaconMembersPage({session}) {

    return (
        <>
        <NavbarAfterLogin session={session}/>
        <ODADeaconMembersHome />
        <Footer />
        </>
    )
}