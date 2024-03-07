'use client'

import { NavbarAfterLogin } from "../../../../utils/header/headerAfterLogin"
import ODADashboardHome from "./home"

export default function ODADashboardPage({session}) {

    return (
        <>
        <NavbarAfterLogin session={session}/>
        <ODADashboardHome />
        </>
    )
}