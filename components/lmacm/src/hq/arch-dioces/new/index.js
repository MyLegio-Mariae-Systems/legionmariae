'use client'

import { Footer } from "../../../../../utils/footer"
import { NavbarAfterLogin } from "../../../../../utils/header/headerAfterLogin"
import NewArchDiocesHome from "./home"

export default function NewArchDiocesPage({session}) {

    return (
        <>
        <NavbarAfterLogin session={session}/>
        <NewArchDiocesHome />
        <Footer />
        </>
    )
}