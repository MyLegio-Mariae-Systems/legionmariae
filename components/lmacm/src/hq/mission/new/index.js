'use client'

import { Footer } from "../../../../../utils/footer"
import { NavbarAfterLogin } from "../../../../../utils/header/headerAfterLogin"
import NewMissionHome from "./home"

export default function NewMissionPage({session}) {

    return (
        <>
        <NavbarAfterLogin session={session}/>
        <NewMissionHome />
        <Footer />
        </>
    )
}