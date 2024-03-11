'use client'

import { Footer } from "../../../../../utils/footer"
import { NavbarAfterLogin } from "../../../../../utils/header/headerAfterLogin"
import NewDiocesHome from "./home"

export default function NewDiocesPage({session}) {

    return (
        <>
        <NavbarAfterLogin session={session}/>
        <NewDiocesHome />
        <Footer />
        </>
    )
}