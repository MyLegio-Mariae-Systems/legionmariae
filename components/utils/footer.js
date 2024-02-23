'use client'

export function Footer() {

    return (
        <>
        <div class="col-md-12 max-w-screen-xl  max-w-sm mx-auto rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
            <div class="col-md-12 ">

                <footer
                        class="text-center text-lg-start text-white"
                        style={{backgroundColor: "#1c2331"}}
                        >
                <section
                        class="d-flex justify-content-between p-4"
                        style={{backgroundColor: "#6351ce"}}
                        >
                    <div class="me-5">
                    <span>Get connected with us on social networks:</span>
                    </div>

                    <div>
                    <a href="" class="text-white me-4">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="" class="text-white me-4">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="https://www.legionmariae.com/" class="text-white me-4">
                        <i class="fab fa-google"></i>
                    </a>
                    <a href="" class="text-white me-4">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/mylegio-mariae-systems-8647152a2/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3B%2BKMTZillRGuv6SoFG%2BBzzg%3D%3D" class="text-white me-4">
                        <i class="fab fa-linkedin"></i>
                    </a>
                    <a href="https://github.com/MyLegio-Mariae-Systems" class="text-white me-4">
                        <i class="fab fa-github"></i>
                    </a>
                    </div>
                </section>

                <section class="">
                    <div class="container text-center text-md-start mt-5">
                    <div class="row mt-3">
                        <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                        <h6 class="text-uppercase fw-bold">Legion Maria Church</h6>
                        <hr
                            class="mb-4 mt-0 d-inline-block mx-auto"
                            style={{width: "60px", backgroundColor: "#7c4dff,", height: "2px"}}
                            />
                        <p>
                            
                        </p>
                        </div>

                        <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                        <h6 class="text-uppercase fw-bold">Products</h6>
                        <hr
                            class="mb-4 mt-0 d-inline-block mx-auto"
                            style={{width: "60px", backgroundColor: "#7c4dff,", height: "2px"}}
                            />
                        {/* <p>
                            <a href="#!" class="text-white">MDBootstrap</a>
                        </p>
                        <p>
                            <a href="#!" class="text-white">MDWordPress</a>
                        </p>
                        <p>
                            <a href="#!" class="text-white">BrandFlow</a>
                        </p>
                        <p>
                            <a href="#!" class="text-white">Bootstrap Angular</a>
                        </p> */}
                        </div>

                        <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                        <h6 class="text-uppercase fw-bold">Useful links</h6>
                        <hr
                            class="mb-4 mt-0 d-inline-block mx-auto"
                            style={{width: "60px", backgroundColor: "#7c4dff,", height: "2px"}}
                            />
                        <p>
                            <a href="https://legionmariachurch.com/" class="text-white">Legion Maria Youths</a>
                        </p>
                        {/* <p>
                            <a href="#!" class="text-white">Become an Affiliate</a>
                        </p>
                        <p>
                            <a href="#!" class="text-white">Shipping Rates</a>
                        </p>
                        <p>
                            <a href="#!" class="text-white">Help</a>
                        </p> */}
                        </div>

                        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                        <h6 class="text-uppercase fw-bold">Contact</h6>
                        <hr
                            class="mb-4 mt-0 d-inline-block mx-auto"
                            style={{width: "60px", backgroundColor: "#7c4dff,", height: "2px"}}
                            />
                        <p><i class="fas fa-home mr-3"></i> Nairobi, KE</p>
                        <p><i class="fas fa-envelope mr-3"></i> <a class="text-blue text-decoration-none" href='mailto:mylegiomariae.systems@gmail.com'>mylegiomariae.systems@gmail.com</a></p>
                        <p><i class="fas fa-phone mr-3"></i> + 254 715 931 261</p>
                        <p><i class="fas fa-print mr-3"></i> + 254 759 903 908</p>
                        </div>
                    </div>
                    </div>
                </section>

                <div
                    class="text-center p-3"
                    style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
                    >
                    © {new Date().getFullYear()} Copyright | All Rights Reserved | 
                    <a class="text-blue text-decoration-none" href="#"
                    > MyLegio Mariae Systems </a>
                </div>
                </footer>

            </div>
            </div>
        </>
    )
}