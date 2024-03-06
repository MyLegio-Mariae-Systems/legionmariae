'use client'

import { NavbarAfterLogin } from "../../../../utils/header/headerAfterLogin"
import Home from "./home"

export default function ODADashboardPage({session}) {

    return (
        <>
        <NavbarAfterLogin session={session}/>
        <Home />
        </>
    )
}