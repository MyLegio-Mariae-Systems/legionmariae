'use client'

import { Footer } from "../../utils/footer"
import { NavbarWithMegaMenu } from "../../utils/header/header"

export default function SignInPage() {

    return (
        <>
        <NavbarWithMegaMenu />
        <section style={{backgroundImage: "url('/images/background.jpg')", backgroundSize: "cover"}} className='pb-2 '>
        <div className='flex justify-center'>
        <div class="col-md-5 relative flex flex-col text-light bg-transparent shadow-none rounded-xl bg-clip-border bg-white ">
        <h4 class="block text-center m-4 font-sans text-2xl antialiased fw-bold leading-snug tracking-normal text-warning">
            Sign In
        </h4>
        <p class="block font-sans text-base antialiased font-normal leading-relaxed text-light text-center">
            Enter your username and password to sign in.
        </p>
        <form class="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96 mb-5">
            <div class="flex flex-col gap-6 mb-1">
            <h6
                class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-light">
                Your Username
            </h6>
            <div class="relative h-11 w-full min-w-[200px]">
                <input placeholder=""
                class="peer h-full w-full text-light rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
            </div>
            
            <h6
                class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-light mt-2">
                Password
            </h6>
            <div class="relative h-11 w-full min-w-[200px]">
                <input type="password" placeholder="********"
                class="peer h-full w-full text-light rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
            </div>
            </div>
            <div class="inline-flex items-center">
            
            </div>
            <button
            class="mt-6 block w-full select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button">
            sign In
            </button>
            
        </form>
        <div>
        <p class="block mt-4 font-sans text-base antialiased font-normal leading-relaxed text-center text-light">
            Register a Mission? <a href="/lmacm/signup" class="fw-bold text-warning"> Register </a>
        </p>
        </div>
        </div>  
        </div>  
        </section>
        <Footer />
        </>
    )

}