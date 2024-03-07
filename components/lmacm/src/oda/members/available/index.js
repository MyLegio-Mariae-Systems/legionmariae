'use client'

import { NavbarAfterLogin } from "../../../../../utils/header/headerAfterLogin"
import ODAAvailableMembersHome from "./home"

export default function ODAAvailableMembersPage({session}) {

    return (
        <>
        <NavbarAfterLogin session={session}/>
        <ODAAvailableMembersHome />
        </>
    )
}