'use client'

import { Footer } from "../../../../../utils/footer"
import { NavbarAfterLogin } from "../../../../../utils/header/headerAfterLogin"
import ODAOngoingContributionsHome from "./home"

export default function ODAOngoingContributionsPage({session}) {

    return (
        <>
        <NavbarAfterLogin session={session}/>
        <ODAOngoingContributionsHome />
        <Footer />
        </>
    )
}