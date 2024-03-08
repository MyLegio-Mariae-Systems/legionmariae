'use client'

import { Footer } from "../../../../../utils/footer"
import { NavbarAfterLogin } from "../../../../../utils/header/headerAfterLogin"
import ODAAvailableContributionsHome from "./home"

export default function ODAAvailableContributionsPage({session}) {

    return (
        <>
        <NavbarAfterLogin session={session}/>
        <ODAAvailableContributionsHome />
        <Footer />
        </>
    )
}