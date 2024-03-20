'use client'

import { Footer } from "../../../../../utils/footer"
import { NavbarAfterLogin } from "../../../../../utils/header/headerAfterLogin"
import ODAAllContributionsHome from "./home"

export default function ODAAvailableContributionsPage({session}) {

    return (
        <>
        <NavbarAfterLogin session={session}/>
        <ODAAllContributionsHome session={session}/>
        <Footer />
        </>
    )
}