'use client'

import { Footer } from "../../../../../utils/footer"
import { NavbarAfterLogin } from "../../../../../utils/header/headerAfterLogin"
import ODANewContributionHome from "./home"

export default function ODANewContributionPage({session}) {

    return (
        <>
        <NavbarAfterLogin session={session}/>
        <ODANewContributionHome />
        <Footer />
        </>
    )
}