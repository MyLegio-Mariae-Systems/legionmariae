'use client'

import { Footer } from "../../../../../utils/footer"
import { NavbarAfterLogin } from "../../../../../utils/header/headerAfterLogin"
import ODAProjectContributionHome from "./home"

export default function ODAProjectsPage({session, parameters}) {

    return (
        <>
        <NavbarAfterLogin session={session}/>
        <ODAProjectContributionHome  parameters={parameters} session={session}/>
        <Footer />
        </>
    )
}