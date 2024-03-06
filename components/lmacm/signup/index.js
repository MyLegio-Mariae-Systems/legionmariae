'use client'

import { Footer } from "../../utils/footer"
import React from "react";
import { useCountries } from "use-react-countries";
import { Country,State,City } from 'country-state-city'
import {
    Input,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
    Select,
    Option,
    Alert, Typography, Dialog, DialogHeader, DialogBody, DialogFooter
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import toast, { ToastBar, Toaster} from 'react-hot-toast'
import NavbarB4Login from "../../utils/header/headerB4Login";

export default function SignUpPage({session}) {

    // const { countries } = useCountries();
    let countries=Country.getAllCountries()
    let router=useRouter()

    const country = React.useRef(countries.find(detail => detail.isoCode === 'KE'));
    const { name, isoCode, phonecode } = country.current;
    const [Cities, setCity]=React.useState(City.getCitiesOfCountry(country.current.isoCode))
    const [formData, setformData] = React.useState({
        country:name,
        phonecode,
        isoCode,
    });
    const [open, setOpen] = React.useState(false);
    const [dialogMessage, setdialogMessage] = React.useState({
        message:'',
        subTitle:'',
        success:true
    });
 
    let handleOpen = () => setOpen(!open);

    React.useEffect(()=>{

    })

    const validate=async()=>{

        if(
            !formData.first_name || 
            // !formData.submited_by_name1 || 
            // !formData.submited_by_name2 || 
            // !formData.submited_by_contact || 
            // !formData.submited_by_email || 
            !formData.first_contact || 
            !formData.mission_name || 
            !formData.dioces_name || 
            !formData.arch_dioces_name || 
            !formData.last_name ||
            !formData.city ||
            !formData.email ||
            !formData.estate
            ){
            toast.error('Please fill in all required fields')

            return false
        }

        if(
            !email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
            ){
                toast.error('Please enter a valid email address')
                return false
        }

        return true
        
    }

    const Submit=async(e)=>{

        e.preventDefault()

        let valid=await validate()

        if (valid) {
             
            setdialogMessage({
                subTitle:'Submission is successful',
                message:'Your submission have been received and is currently under review. You will receive a notification through provided emails within 24 hours. Thank you for trusting in us.',
                success:true
            })
    
            console.log(formData);
            handleOpen()
    
        } 

        

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });

    }

    const handleInputChange1 = () => {
        setformData({ ...formData, country: country.current.name, isoCode:country.current.isoCode, phonecode:country.current.phonecode});
        setCity(City.getCitiesOfCountry(country.current.isoCode))
    }

    const returnCities = () => {

        let result=[]

        for (let i = 0; i < Cities.length; i++) {
            result.push(
                <option key={i} value={Cities[i].name} className="text-dark">{Cities[i].name}</option>
            )
            
        }

        return result

    }

    return (
        <>
        <Toaster 

            toastOptions={{
                success:{
                    style:{
                        background:'green',
                        color:'white'
                    }
                },
                error:{
                    style:{
                        background:'red',
                        color:'white'
                    }
                },
                
            }}

            >
        </Toaster>
        <NavbarB4Login session={session}/>
        <section style={{backgroundImage: "url('/images/background.jpg')", backgroundSize: "cover"}} className='pb-2 '>
        {/* <Button onClick={handleOpen}>Notification</Button> */}
        <Dialog open={open} handler={handleOpen}>
            <DialogHeader>
            <Typography variant="h5" color="blue-gray">
                Your Attention is Required!
            </Typography>
            </DialogHeader>
            <DialogBody divider className="grid place-items-center gap-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-11 w-11 text-red-500"
            >
                <path
                fillRule="evenodd"
                d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                clipRule="evenodd"
                />
            </svg>
            <Typography color={dialogMessage.success ? 'green' : 'red'} variant="h4">
                {dialogMessage.subTitle}
            </Typography>
            <Typography className="text-center font-normal">
                {dialogMessage.message}
            </Typography>
            </DialogBody>
            <DialogFooter className="space-x-2">
            <Button variant="text" color="blue-gray" onClick={handleOpen}>
                close
            </Button>
            <Button variant="gradient" onClick={handleOpen}>
                Ok, Got it
            </Button>
            </DialogFooter>
        </Dialog>
        <div className='flex justify-center'>
        <div class="col-md-5 relative flex flex-col text-light bg-transparent shadow-none rounded-xl bg-clip-border bg-white ">
        <h4 class="block text-center m-4 font-sans text-2xl antialiased fw-bold leading-snug tracking-normal text-warning">
            Register Mission
        </h4>
        <p class="block font-sans text-base antialiased font-normal leading-relaxed text-light text-center">
            Fill in below sections to register.
        </p>
        <SubmitAlert />
        <form class="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96 mb-5" onSubmit={Submit}>
            
            <div class="relative mb-3">
                <h6 class="mb-0">
                <button
                    type='button'
                    class="relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 text-slate-700 rounded-t-1 group text-dark-500"
                    data-collapse-target="animated-collapse-1"
                >
                    <span className='text-warning'>Mission Details</span>
                    <i class="absolute right-0 pt-1 text-base transition-transform fa fa-chevron-down group-open:rotate-180"></i>
                </button>
                </h6>
                <div
                data-collapse="animated-collapse-1"
                class="h-0 overflow-hidden transition-all duration-300 ease-in-out"
                >
                <div class="p-4 text-sm leading-normal">
                    
                    <h6
                        class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-light mt-2">
                        Mission Name *
                    </h6>
                    <div class="relative h-11 w-full min-w-[200px]">
                    <Input size="md" placeholder='e.g., St. Teresa Kariobangi' required onChange={handleInputChange} name='mission_name' minLength='8'
                    class="peer  h-full w-full text-light rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                    </div>

                    <h6
                        class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-light mt-2">
                        Dioces Name *
                    </h6>
                    <div class="relative h-11 w-full min-w-[200px] mt-3">
                    <Input size="md" placeholder='e.g., Nairobi' required onChange={handleInputChange} name='dioces_name' minLength='3'
                    class="peer  h-full w-full text-light rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                    </div>

                    <h6
                        class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-light mt-2">
                        Arch Dioces Name *
                    </h6>
                    <div class="relative h-11 w-full min-w-[200px] mt-3">
                    <Input size="md" placeholder='e.g., Nairobi' required onChange={handleInputChange} name='arch_dioces_name' minLength='3'
                    class="peer  h-full w-full text-light rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                    </div>

                    <h6
                        class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-light mt-2">
                        Country *
                    </h6>
                    <div className="relative flex h-11 w-full min-w-[200px] mt-3">
                    <Menu placement="bottom-start" >
                        <MenuHandler>
                        <Button
                            ripple={false}
                            variant="text"
                            color="blue-gray"
                            className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                        >
                            
                            +{phonecode}
                        </Button>
                        </MenuHandler>
                        <MenuList className="h-50 w-auto overflow-auto">
                        {countries.map(({ name, phonecode, isoCode }, index) => {
                            return (
                            <MenuItem
                                key={name}
                                value={name}
                                className="flex items-center gap-2"
                                onClick={() => {
                                    country.current=(countries.find(detail => detail.isoCode === isoCode))
                                    handleInputChange1()
                                }}
                            >
                                {/* <img
                                src={flag}
                                alt={name}
                                className="h-5 w-5 rounded-full object-cover"
                                /> */}
                                {name} <span className=" ml-auto">+{phonecode}</span>
                            </MenuItem>
                            );
                        })}
                        </MenuList>
                    </Menu>
                    {/* <Input
                        type="tel"
                        placeholder="Mobile Number"
                        className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                        className: "before:content-none after:content-none",
                        }}
                        containerProps={{
                        className: "min-w-0",
                        }}
                    /> */}
                    <Input
                        className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900 text-light"
                        value={name} required name='country' onChange={handleInputChange}
                        
                    />
                    </div>
                    
                </div>
                </div>
            </div>

            <div class="relative mb-3">
                <h6 class="mb-0">
                <button
                    type='button'
                    class="relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 text-slate-700 rounded-t-1 group text-dark-500"
                    data-collapse-target="animated-collapse-2"
                >
                    <span className='text-warning'>Chairman Details</span>
                    <i class="absolute right-0 pt-1 text-base transition-transform fa fa-chevron-down group-open:rotate-180"></i>
                </button>
                </h6>
                <div
                data-collapse="animated-collapse-2"
                class="h-0 overflow-hidden transition-all duration-300 ease-in-out"
                >
                <div class="p-4 text-sm leading-normal">
                    
                    <h6
                        class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-light mt-2">
                        First Name *
                    </h6>
                    <div class="relative h-11 w-full min-w-[200px]">
                    <Input size="md" placeholder='' required onChange={handleInputChange} name='first_name' minLength='3'
                    class="peer  h-full w-full text-light rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                    </div>

                    <h6
                        class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-light mt-2">
                        Middle Names
                    </h6>
                    <div class="relative h-11 w-full min-w-[200px] mt-3">
                    <Input size="md" placeholder='' onChange={handleInputChange} name='middle_names' minLength='3'
                    class="peer  h-full w-full text-light rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                    </div>

                    <h6
                        class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-light mt-2">
                        Last Name *
                    </h6>
                    <div class="relative h-11 w-full min-w-[200px] mt-3">
                    <Input size="md" placeholder='' required onChange={handleInputChange} name='last_name' minLength='3'
                    class="peer  h-full w-full text-light rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                    </div>

                    <h6
                        class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-light mt-2">
                        Email Address *
                    </h6>
                    <div class="relative h-11 w-full min-w-[200px] mt-3">
                    <Input size="md" placeholder='A working email address' type='email' required onChange={handleInputChange} name='email' minLength='13'
                    class="peer  h-full w-full text-light rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                    </div>

                    <h6
                        class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-light mt-2">
                        First Contact *
                    </h6>
                    <div class="relative h-11 w-full min-w-[200px] mt-3">
                    <Input size="md" placeholder='' type='tel' required onChange={handleInputChange} name='first_contact' minLength='10'
                    class="peer  h-full w-full text-light rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                    </div>

                    <h6
                        class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-light mt-2">
                        Second Contact
                    </h6>
                    <div class="relative h-11 w-full min-w-[200px] mt-3">
                    <Input size="md" placeholder='' type='tel' onChange={handleInputChange} name='second_contact' minLength='10'
                    class="peer  h-full w-full text-light rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                    </div>

                    <h6
                        class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-light mt-2">
                        Country *
                    </h6>
                    <div className="relative flex h-11 w-full min-w-[200px] mt-3">
                    <Menu placement="bottom-start" >
                        <MenuHandler>
                        <Button
                            ripple={false}
                            variant="text"
                            color="blue-gray"
                            className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                        >
                            {/* <img
                            src={flags.svg}
                            alt={name}
                            className="h-4 w-4 rounded-full object-cover"
                            /> */}
                            +{phonecode}
                        </Button>
                        </MenuHandler>
                        <MenuList className="h-50 w-auto overflow-auto">
                        {countries.map(({ name, phonecode, isoCode }, index) => {
                            return (
                            <MenuItem
                                key={name}
                                value={name}
                                className="flex items-center gap-2"
                                onClick={() => {
                                    country.current=(countries.find(detail => detail.isoCode === isoCode))
                                    handleInputChange1()
                                }}
                            >
                                
                                {name} <span className=" ml-auto">+{phonecode}</span>
                            </MenuItem>
                            );
                        })}
                        </MenuList>
                    </Menu>
                    
                    <Input
                        className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900 text-light"
                        value={name} required readOnly
                        
                    />
                    </div>

                    <h6
                        class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-light mt-2">
                        City *
                    </h6>
                    <div className="relative flex h-11 w-full min-w-[200px] mt-3">
                    <select
                        required name='city' onChange={handleInputChange}
                        class="peer h-full w-full text-light rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 font-sans " 
                    >
                        <option></option>
                        {
                            returnCities()
                        } 
                        
                    </select>
                    
                    </div>

                    <h6
                        class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-light mt-2">
                        Estate 
                    </h6>
                    <div class="relative h-11 w-full min-w-[200px] mt-3">
                    <Input size="md" placeholder='' onChange={handleInputChange} name='estate' minLength='5'
                    class="peer  h-full w-full text-light rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                    </div>
                    
                </div>
                </div>
            </div>

            {/* <div class="relative mb-3">
                <h6 class="mb-0">
                <button
                    type='button'
                    class="relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 text-slate-700 rounded-t-1 group text-dark-500"
                    data-collapse-target="animated-collapse-3"
                >
                    <span className='text-warning'>Submited By</span>
                    <i class="absolute right-0 pt-1 text-base transition-transform fa fa-chevron-down group-open:rotate-180"></i>
                </button>
                </h6>
                <div
                data-collapse="animated-collapse-3"
                class="h-0 overflow-hidden transition-all duration-300 ease-in-out"
                >
                <div class="p-4 text-sm leading-normal">
                    
                    <h6
                        class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-light mt-2">
                        First Name *
                    </h6>
                    <div class="relative h-11 w-full min-w-[200px]">
                    <Input size="md" placeholder='' required onChange={handleInputChange} name='submited_by_name1' minLength='3'
                    class="peer  h-full w-full text-light rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                    </div>

                    <h6
                        class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-light mt-2">
                        Last Name *
                    </h6>
                    <div class="relative h-11 w-full min-w-[200px] mt-3">
                    <Input size="md" placeholder='' required onChange={handleInputChange} name='submited_by_name2' minLength='3'
                    class="peer  h-full w-full text-light rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                    </div>

                    <h6
                        class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-light mt-2">
                        Email Address *
                    </h6>
                    <div class="relative h-11 w-full min-w-[200px] mt-3">
                    <Input size="md" placeholder='' required onChange={handleInputChange} name='submited_by_email' minLength='13'
                    class="peer  h-full w-full text-light rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                    </div>

                    <h6
                        class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-light mt-2">
                        Contact Number *
                    </h6>
                    <div class="relative h-11 w-full min-w-[200px] mt-3">
                    <Input size="md" placeholder='' type='tel' required onChange={handleInputChange} name='submited_by_contact' minLength='10'
                    class="peer  h-full w-full text-light rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                    </div>

                </div>
                </div>
            </div> */}

            <button
            class="mt-6 block w-full select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit">
            Submit
            </button>

            {/* <button
            class="mt-6 block w-full select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button" onClick={Submit}>
            Submit
            </button> */}
            
            
        </form>
        
        <div>
        
        {/* <p class="block mt-4 font-sans text-base antialiased font-normal leading-relaxed text-center text-light">
            Already have an account? <a href="/lmacm/signin" class="fw-bold text-warning"> Sign In </a>
        </p> */}
        </div>
        </div>  
        </div>  
        </section>
        <Footer />
        </>
    )

}

 
function IconOutlined() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
      />
    </svg>
  );
}
 
function IconSolid() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}
 
export function SubmitAlert() {
  return (
    <div className="flex w-full flex-col gap-2">
        <Alert color='red'>This exercise should be done by mission chairman only.</Alert>
      <Alert  icon={<IconOutlined />}>
        <Typography className="font-medium">
          Kindly provide a working email address, for it will be used for verification. Thank you for choosing us automate your mission processes.
        </Typography>
      </Alert>
    </div>
  );
}