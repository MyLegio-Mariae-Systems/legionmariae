'use client'

import { Footer } from "../../../../../utils/footer"
import { NavbarAfterLogin } from "../../../../../utils/header/headerAfterLogin"
import ODAContributionPaymentsHome from "./home"

export default function ODAProjectsPage({session, parameters}) {

    return (
        <>
        <NavbarAfterLogin session={session}/>
        <ODAContributionPaymentsHome  parameters={parameters} session={session}/>
        <Footer />
        </>
    )
}