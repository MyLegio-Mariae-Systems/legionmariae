'use client'

import { Footer } from "../../../../../utils/footer"
import { NavbarAfterLogin } from "../../../../../utils/header/headerAfterLogin"
import ODAMyContributionsHome from "./home"

export default function ODAMyContributionsPage({session}) {

    return (
        <>
        <NavbarAfterLogin session={session}/>
        <ODAMyContributionsHome />
        <Footer />
        </>
    )
}