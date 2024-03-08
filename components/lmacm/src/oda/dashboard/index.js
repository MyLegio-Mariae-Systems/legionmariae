'use client'

import { Footer } from "../../../../utils/footer"
import { NavbarAfterLogin } from "../../../../utils/header/headerAfterLogin"
import ODADashboardHome from "./home"

export default function ODADashboardPage({session}) {

    return (
        <>
        <div className="bg-light">
        <NavbarAfterLogin session={session}/>
        <ODADashboardHome />
        <Footer />
        </div>
        
        </>
    )
}