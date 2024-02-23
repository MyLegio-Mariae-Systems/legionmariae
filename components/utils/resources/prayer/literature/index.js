'use client'

import { NavbarWithMegaMenu } from "../../../header"
import React from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  CheckIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { Footer } from "../../../footer";
 

export default function PrayerPage({title, lang}) {

    // const LuoSideBar = () =>{

    //     const [open, setOpen] = React.useState(0);
    //     const [openAlert, setOpenAlert] = React.useState(true);
    //     const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
        
    //     const handleOpen = (value) => {
    //         setOpen(open === value ? 0 : value);
    //     };
        
    //     const openDrawer = () => setIsDrawerOpen(true);
    //     const closeDrawer = () => setIsDrawerOpen(false);
        
    //     return (
    //         <>
    //         <IconButton variant="text" size="lg" onClick={openDrawer}>
    //             {isDrawerOpen ? (
    //             <XMarkIcon className="h-8 w-8 stroke-2" />
    //             ) : (
    //             <Bars3Icon className="h-8 w-8 stroke-2" />
    //             )}
    //         </IconButton>
    //         <Drawer open={isDrawerOpen} onClose={closeDrawer} className="overflow-auto">
    //             <Card
    //             color="transparent"
    //             shadow={false}
    //             className="h-[calc(100vh-2rem)] w-full p-4"
    //             >
    //             <div className="mb-1 flex items-center gap-4 p-1">
    //                 <img
    //                 src="/images/logo.jpg"
    //                 alt="brand"
    //                 className="h-12 w-12"
    //                 />
    //                 <Typography variant="h5" color="blue-gray">
    //                 Legion Maria Church
    //                 </Typography>
    //             </div>
    //             <div className="p-2">
    //                 <Input
    //                 icon={<MagnifyingGlassIcon className="h-5 w-5" />}
    //                 label="Search"
    //                 />
    //             </div>
    //             <div >
    //                 <List>
    //                     <Accordion
    //                     open={open === 1}
    //                     icon={
    //                         <ChevronDownIcon
    //                         strokeWidth={2.5}
    //                         className={`mx-auto h-4 w-4 transition-transform ${
    //                             open === 1 ? "rotate-180" : ""
    //                         }`}
    //                         />
    //                     }
    //                     >
    //                     <ListItem className="p-0" selected={open === 1}>
    //                         <AccordionHeader
    //                         onClick={() => handleOpen(1)}
    //                         className="border-b-0 p-3"
    //                         >
    //                         <ListItemPrefix>
    //                             <PresentationChartBarIcon className="h-5 w-5" />
    //                         </ListItemPrefix>
    //                         <Typography color="blue-gray" className="mr-auto font-normal">
    //                             Dashboard
    //                         </Typography>
    //                         </AccordionHeader>
    //                     </ListItem>
    //                     <AccordionBody className="py-1">
    //                         <List className="p-0">
    //                         <ListItem>
    //                             <ListItemPrefix>
    //                             <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
    //                             </ListItemPrefix>
    //                             Analytics
    //                         </ListItem>
    //                         <ListItem>
    //                             <ListItemPrefix>
    //                             <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
    //                             </ListItemPrefix>
    //                             Reporting
    //                         </ListItem>
    //                         <ListItem>
    //                             <ListItemPrefix>
    //                             <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
    //                             </ListItemPrefix>
    //                             Projects
    //                         </ListItem>
    //                         </List>
    //                     </AccordionBody>
    //                     </Accordion>
    //                     <Accordion
    //                     open={open === 2}
    //                     icon={
    //                         <ChevronDownIcon
    //                         strokeWidth={2.5}
    //                         className={`mx-auto h-4 w-4 transition-transform ${
    //                             open === 2 ? "rotate-180" : ""
    //                         }`}
    //                         />
    //                     }
    //                     >
    //                     <ListItem className="p-0" selected={open === 2}>
    //                         <AccordionHeader
    //                         onClick={() => handleOpen(2)}
    //                         className="border-b-0 p-3"
    //                         >
    //                         <ListItemPrefix>
    //                             <ShoppingBagIcon className="h-5 w-5" />
    //                         </ListItemPrefix>
    //                         <Typography color="blue-gray" className="mr-auto font-normal">
    //                             E-Commerce
    //                         </Typography>
    //                         </AccordionHeader>
    //                     </ListItem>
    //                     <AccordionBody className="py-1">
    //                         <List className="p-0">
    //                         <ListItem>
    //                             <ListItemPrefix>
    //                             <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
    //                             </ListItemPrefix>
    //                             Orders
    //                         </ListItem>
    //                         <ListItem>
    //                             <ListItemPrefix>
    //                             <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
    //                             </ListItemPrefix>
    //                             Products
    //                         </ListItem>
    //                         </List>
    //                     </AccordionBody>
    //                     </Accordion>
    //                     <hr className="my-2 border-blue-gray-50" />
    //                     <ListItem>
    //                     <ListItemPrefix>
    //                         <InboxIcon className="h-5 w-5" />
    //                     </ListItemPrefix>
    //                     Inbox
    //                     <ListItemSuffix>
    //                         <Chip
    //                         value="14"
    //                         size="sm"
    //                         variant="ghost"
    //                         color="blue-gray"
    //                         className="rounded-full"
    //                         />
    //                     </ListItemSuffix>
    //                     </ListItem>
    //                     <ListItem>
    //                     <ListItemPrefix>
    //                         <UserCircleIcon className="h-5 w-5" />
    //                     </ListItemPrefix>
    //                     Profile
    //                     </ListItem>
    //                     <ListItem>
    //                     <ListItemPrefix>
    //                         <Cog6ToothIcon className="h-5 w-5" />
    //                     </ListItemPrefix>
    //                     Settings
    //                     </ListItem>
    //                     <ListItem>
    //                     <ListItemPrefix>
    //                         <PowerIcon className="h-5 w-5" />
    //                     </ListItemPrefix>
    //                     Log Out
    //                     </ListItem>
    //                 </List>
    //                 <Alert
    //                     open={openAlert}
    //                     className="mt-auto"
    //                     onClose={() => setOpenAlert(false)}
    //                 >
    //                     <CubeTransparentIcon className="mb-4 h-12 w-12" />
    //                     <Typography variant="h6" className="mb-1">
    //                     Upgrade to PRO
    //                     </Typography>
    //                     <Typography variant="small" className="font-normal opacity-80">
    //                     Upgrade to Material Tailwind PRO and get even more components,
    //                     plugins, advanced features and premium.
    //                     </Typography>
    //                     <div className="mt-4 flex gap-3">
    //                     <Typography
    //                         as="a"
    //                         href="#"
    //                         variant="small"
    //                         className="font-medium opacity-80"
    //                         onClick={() => setOpenAlert(false)}
    //                     >
    //                         Dismiss
    //                     </Typography>
    //                     <Typography
    //                         as="a"
    //                         href="#"
    //                         variant="small"
    //                         className="font-medium"
    //                     >
    //                         Upgrade Now
    //                     </Typography>
    //                     </div>
    //                 </Alert>
    //             </div>
                
    //             </Card>
    //         </Drawer>
    //         </>
    //     );
    // }

    const [titleProp, setTitleProp] = React.useState('Lemo Motelo');

    console.log(titleProp);

    const Navitems=[
        {
            title:'Lemo Motelo',
            child:[
                {
                    title:'Chako Lemo',
                    link:'#Chako_Lemo',
                },
                {
                    title:'Lemo Mar Chiew',
                    link:'#Lemo_Mar_Chiew',
                },
                {
                    title:'Malaika',
                    link:'#Malaika',
                },
                {
                    title:'Lemo Mar Okinyi',
                    link:'#Lemo_Mar_Okinyi',
                },
                {
                    title:'Wuonwa Ma I Polo',
                    link:'#Wuonwa_Ma_I_Polo',
                },
                {
                    title:'Misawa Maria',
                    link:'#Misawa_Maria',
                },
                {
                    title:'Ayie Nyasaye Wuon',
                    link:'#Ayie_Nyasaye_Wuon',
                },
                {
                    title:'Lemo Mar Yie',
                    link:'#Lemo_Mar_Yie',
                },
                {
                    title:'Lemo Mar Geno',
                    link:'#Lemo_Mar_Geno',
                },
                {
                    title:'Lemo Mar Hero',
                    link:'#Lemo_Mar_Hero',
                },
                {
                    title:'Lemo Mar Kwero',
                    link:'#Lemo_Mar_Kwero',
                },
                {
                    title:'Par Bikira Maria',
                    link:'#Par_Bikira_Maria',
                },
                {
                    title:'Lemo Mar Kwayo Ni Jokafiri',
                    link:'#Lemo_Mar_Kwayo_Ni_Jokafiri',
                },
                {
                    title:'Lemo Mar Dhi Chiemo',
                    link:'#Lemo_Mar_Dhi_Chiemo',
                },
                {
                    title:'Lemo Mar Tieko Chiemo',
                    link:'#Lemo_Mar_Tieko_Chiemo',
                },
                {
                    title:'Lemo Mar Odhiambo',
                    link:'#Lemo_Mar_Odhiambo',
                },
                {
                    title:'Buche Nyasaye',
                    link:'#Buche_Nyasaye',
                },
                {
                    title:'Buche Eklesia',
                    link:'#Buche_Eklesia',
                },
                {
                    title:'Duong Obedie',
                    link:'#Duong_Obedie',
                },
                {
                    title:'Lemo Mar Dhi Nindo',
                    link:'#Lemo_Mar_Dhi_Nindo',
                },
                
            ]
        },
        {
            title:'Presdium',
            child:[
                {
                    title:'Wend Chako Presdium',
                    link:'#Wend_Chako_Presdium',
                },
                {
                    title:'Chako Katena',
                    link:'#Chako_Katena',
                },
                {
                    title:'Tieko Katena',
                    link:'#Tieko_Katena',
                },
            ]
        },
    ]

    const LuoSideBar = () =>{

        const [open, setOpen] = React.useState(0);
        const [openAlert, setOpenAlert] = React.useState(true);
        const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
        
        const handleOpen = (value) => {
            setOpen(open === value ? 0 : value);
        };
        
        const openDrawer = () => setIsDrawerOpen(true);
        const closeDrawer = () => setIsDrawerOpen(false);

        
        return (
            <>
            <IconButton variant="text" size="lg" onClick={openDrawer}>
                {isDrawerOpen ? (
                <XMarkIcon className="h-8 w-8 stroke-2" />
                ) : (
                <Bars3Icon className="h-8 w-8 stroke-2" />
                )}
            </IconButton>
            <Drawer open={isDrawerOpen} onClose={closeDrawer} className="overflow-auto">
                <Card
                color="transparent"
                shadow={false}
                className="h-[calc(100vh-2rem)] w-full p-4"
                >
                <div className="mb-1 flex items-center gap-4 p-1">
                    <img
                    src="/images/logo.jpg"
                    alt="brand"
                    className="h-12 w-12"
                    />
                    <Typography variant="h4" color="blue-gray">
                    Legion Maria Church
                    </Typography>
                </div>
                <div className="p-1 flex justify-center col-md-12">
                    <span className='fw-bold text-xl'>All Common Prayers</span>
                </div>
                <div >
                    <List>

                        {
                            Navitems.map((parent,key)=>{
                                return (
                                    <>
                                    <Accordion
                                        open={open === key+1}
                                        icon={
                                            <ChevronDownIcon
                                            strokeWidth={2.5}
                                            className={`mx-auto h-4 w-4 transition-transform ${open === key+1 ? "rotate-180" : ""}`}
                                            />
                                        }
                                        key={key+1}
                                        >
                                        <ListItem className="p-0" selected={open === key+1}>
                                            <AccordionHeader onClick={() => handleOpen(key+1)} className="border-b-0 p-3">
                                            <ListItemPrefix>
                                                <PresentationChartBarIcon className="h-5 w-5" />
                                            </ListItemPrefix>
                                            <Typography color="blue-gray" className="mr-auto font-normal">
                                                {parent.title}
                                            </Typography>
                                            </AccordionHeader>
                                        </ListItem>
                                        <AccordionBody className="py-1">
                                            <List className="p-0">
                                                {
                                                    parent.child.map(({title,link},key)=>{

                                                        return (
                                                        
                                                            <>
                                                                <a onClick={()=>{setTitleProp(parent.title); setIsDrawerOpen(false)}} href={`/resources/prayer/literature?lang=Luo&title=Lemo motelo mag Legion Maria Church${link}`} key={key+1} className='text-decoration-none'>
                                                                    <ListItem>
                                                                    <ListItemPrefix>
                                                                        <ChevronRightIcon  className="h-5 w-5" />
                                                                    </ListItemPrefix>
                                                                    {title}
                                                                    </ListItem>
                                                                </a>
                                                            </>
                                                        )
                                                    })
                                                }
                                            
                                            </List>
                                        </AccordionBody>
                                    </Accordion>
                                    
                                    </>
                                )
                                
                            })
                        }

                        
                    </List>
                    <Alert
                        open={openAlert}
                        className="mt-auto"
                        onClose={() => setOpenAlert(false)}
                    >
                        <CubeTransparentIcon className="mb-4 h-12 w-12" />
                        <Typography variant="h6" className="mb-1">
                        Upgrade to PRO
                        </Typography>
                        <Typography variant="small" className="font-normal opacity-80">
                        Upgrade to Material Tailwind PRO and get even more components,
                        plugins, advanced features and premium.
                        </Typography>
                        <div className="mt-4 flex gap-3">
                        <Typography
                            as="a"
                            href="#"
                            variant="small"
                            className="font-medium opacity-80"
                            onClick={() => setOpenAlert(false)}
                        >
                            Dismiss
                        </Typography>
                        <Typography
                            as="a"
                            href="#"
                            variant="small"
                            className="font-medium"
                        >
                            Upgrade Now
                        </Typography>
                        </div>
                    </Alert>
                </div>
                
                </Card>
            </Drawer>
            </>
        );
    }

    


    return(
        <>
        <NavbarWithMegaMenu />
        
        <div class="col-md-12 sticky-top max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
            <div className='ms-1'>
                <div className='flex justify-center'>
                    <div className='col-md-1 flex gap-5 flex-wrap justify-start m-1'>
                    
                    {
                        lang === 'kiswahili' ? (
                            <>
                                <LuoSideBar />
                            </>
                            
                        ) : lang === 'english' ? (
                            <>
                                <LuoSideBar />
                            </>
                            
                        ) : (
                            <>
                                <LuoSideBar />
                            </>

                        )
                        
                    }

                    </div>
                    <div className='col-md-11 flex justify-center m-2'>
                        <h1 className="text-dark fw-bold">{titleProp}</h1>
                    </div>
                </div>
                
                
            </div>
                
            <div className='flex gap-5 flex-wrap justify-center'>

                {
                    lang === 'kiswahili' ? (
                        <>
                        <a href='/resources/prayer/literature?lang=Luo&title=Lemo motelo mag Legion Maria Church' className='text-decoration-none fw-bold p-2'>Luo</a>
                        <a href='/resources/prayer/literature?lang=English&title=Prayer motelo mag Legion Maria Church' className='text-decoration-none fw-bold p-2'>English</a>
                        </>
                    ):lang === 'english' ? (
                        <>
                        <a href='/resources/prayer/literature?lang=Luo&title=Lemo motelo mag Legion Maria Church' className='text-decoration-none fw-bold p-2'>Luo</a>
                        <a href='/resources/prayer/literature?lang=Kiswahili&title=Maombi motelo mag Legion Maria Church' className='text-decoration-none fw-bold p-2'>Kiswahili</a>
                        </>
                    ):(
                        <>
                        <a href='/resources/prayer/literature?lang=Kiswahili&title=Lemo motelo mag Legion Maria Church' className='text-decoration-none fw-bold p-2'>Kiswahili</a>
                        <a href='/resources/prayer/literature?lang=English&title=Lemo motelo mag Legion Maria Church' className='text-decoration-none fw-bold p-2'>English</a>
                        </>
                    )
                }
                
            </div>
            
        </div>

        {
            lang === 'kiswahili' ? (
                <>
                    <KiswahiliRandomPrayers title={title} link={lang}/>
                </>
                
            ) : lang === 'english' ? (
                    <EnglishRandomPrayers title={title} lang={lang}/>
                
            ) : (
                <>
                <div className='relative'>
                    {
                        titleProp==='Presdium' ? (
                            <LuoPresdiumPrayers />
                        ):(
                            <LuoRandomPrayers />
                        )
                    }
                </div>
                </>

            )
            
        }
        <Footer />

        
        </>
    )
}

// IN LUO

export function LuoRandomPrayers() {

    return(
        <>

            <div id='Chako_Lemo' className='col-md-12 ms-1 me-1 max-w-sm mx-auto p-3 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
                <div className='flex flex-wrap justify-center m-2'>
                    <h3 className='text-danger fw-bold'>Chako Lemo</h3>
                </div>
                <div className='m-1 ps-2'>
                    <p>
                        E nying Wuon, gi Wuowi, gi Chuny Matakatifu. Amen.<br></br>
                        A chuny matakatifu bi, donj e chunya lere, punja rieko mar ng'eyo wach Nyasaye. Kendo mia teko mar makogi maber. Nikech Kristus Ruodhwa. Amen.
                    </p>
                </div>
                
            </div>

            <div id='Lemo_Mar_Chiew' className='col-md-12 ms-1 me-1 max-w-sm mx-auto p-3 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
                <div className='flex flex-wrap justify-center m-2'>
                    <h3 className='text-danger fw-bold'>Lemo Mar Chiew</h3>
                </div>
                <div className='m-1 ps-2'>
                    <p>
                        Nyasacha, alami amiyi chunya, akwayi chieng' ma tinende mondo odoki maber ni chunya kendo maber ni ringra. Amen.<br></br>
                        Nyasacha, agombo nwang'o induljensia duto m'anyalo nwang'o kuom lemona kendo kuom tichna ma tinende. Amen.
                    </p>
                </div>
                
            </div>

            <div id='Malaika' className='col-md-12 ms-1 me-1 max-w-sm mx-auto p-3 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
                <div className='flex flex-wrap justify-center m-2'>
                    <h3 className='text-danger fw-bold'>Malaika</h3>
                </div>
                <div className='m-1 ps-2'>
                    <p>
                        Malaika mar Ruoth nohulo ni Maria,<br></br>
                        Nomako ich kuom Chuny Matakatifu.<br></br>
                        &nbsp;&nbsp;&nbsp;<em><b>Misawa Maria...</b></em><br></br>
                        Ero an misumba Ruoth,<br></br>
                        Otimna kaka iwachono.<br></br>
                        &nbsp;&nbsp;&nbsp;<em><b>Misawa Maria...</b></em><br></br>
                        Wach nodoko dhano,<br></br>
                        Nodak Kuomwa.<br></br>
                        &nbsp;&nbsp;&nbsp;<em><b>Misawa Maria...</b></em><br></br>
                        Ikwanwae min Nyasaye Matakatifu,<br></br>
                        Mondo wadok jomowinjore nwang'o gik ma Kristus nochikowa.

                    </p>
                    <p>
                        <em><b>Walem</b></em><br></br>
                        Wakwayi Ruodhwa, mondo ilung' nemani e chunywa; kendo kaka Malaika nohulonwa timruok dhano mar Kristus Wuodi,
                        mondo kamano nikech sandne gi musalape, wachop e duong' mar chier. Nikech Kristus nogo Ruodhwa. Amen.
                    </p>
                </div>
                
            </div>

            <div id='Lemo_Mar_Okinyi' className='col-md-12 ms-1 me-1 max-w-sm mx-auto p-3 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
                <div className='flex flex-wrap justify-center m-2'>
                    <h3 className='text-danger fw-bold'>Lemo Mar Okinyi</h3>
                </div>
                <div className='m-1 ps-2'>
                    <p>
                        Ayie, Nyasacha, In ka alami, aheri gi chunya duto. Agoyoni erokamano nimar in emanichweya, in emaniwara gi Wuodi m'ihero ahinya,
                        niloka jakristus kendo agoyoni erokamano kuom nema duto mimiya. Kendo agoyoni erokamano nimar irita otieno.<br></br>
                        Amiyi chunya, gi ringra, gi parona, gi wachna, gi tichna, gi chnruokna matinde. Ariwogi kanyakla achiel gi sand Jesus Kristus, Ruodhwa.
                        Amiyi mago duto mapwoyigo kendo machuligo marichona. Adagi chuth ketho tinde to miya nemani nimar ok anyal timo gimoro
                        k'aonge gi nemani.
                    </p>
                </div>
                
            </div>

            <div id='Wuonwa_Ma_I_Polo' className='col-md-12 ms-1 me-1 max-w-sm mx-auto p-3 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
                <div className='flex flex-wrap justify-center m-2'>
                    <h3 className='text-danger fw-bold'>Wuonwa Ma I Polo</h3>
                </div>
                <div className='m-1 ps-2'>
                    <p>
                        Wuonwa ma i polo Nyigi oluor, pinyi obi, kaka idwaro mondo otimre e piny kaka timore e polo. Imiwa tinende chiembwa
                        ma pilepile, iwenwa marichowa kaka waweyo ni ji matimonwa marach. Kiki iterwa kar tem, to iwarwa kama rach. Amen.
                    </p>
                </div>
                
            </div>

            <div id='Misawa_Maria' className='col-md-12 ms-1 me-1 max-w-sm mx-auto p-3 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
                <div className='flex flex-wrap justify-center m-2'>
                    <h3 className='text-danger fw-bold'>Misawa Maria</h3>
                </div>
                <div className='m-1 ps-2'>
                    <p>
                        Misawa Maria ipong gi nema. Ijahawi kuom mon; gi Jesus nyathi mar iyi jahawi. Maria Matakatifu Min Nyasaye, Ikwanwae wan joketho,
                        kawuono gi kar thowa. Amen.
                    </p>
                </div>
                
            </div>

            <div id='Ayie_Nyasaye_Wuon' className='col-md-12 ms-1 me-1 max-w-sm mx-auto p-3 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
                <div className='flex flex-wrap justify-center m-2'>
                    <h3 className='text-danger fw-bold'>Ayie Nyasaye Wuon</h3>
                </div>
                <div className='m-1 ps-2'>
                    <p>
                        Ayie Nyasaye Wuon manyalo gikmoko duto jachwech polo gi piny. Gi Jesus Kristus Wuode ma miderma, Ruodhwa. Manomak
                        ichne kuom Chuny Matakatifu; Bikira Maria ema nonywole. Manosande kuom Pontius Pilato, manogure e musalaba, manotho. Manoyike, nolor e limbo, chieng' mar adek
                        nochier kuom jomotho. Nodum odhi epolo, obet e lwedo ma kor achwich mar Nyasaye Wuon manyalo gikmoko duto.
                        Kama noaye koduogi yalo jomangima gi jomotho.<br></br>
                        Ayie Chuny Matakatifu, Eklesia Makatholik Matakatifu; riwruok mar jotakatifu, golo mar maricho, chier mar ringruok, gi ngima maokrum. Amen.
                    </p>
                </div>
                
            </div>

            <div id='Lemo_Mar_Yie' className='col-md-12 ms-1 me-1 max-w-sm mx-auto p-3 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
                <div className='flex flex-wrap justify-center m-2'>
                    <h3 className='text-danger fw-bold'>Lemo Mar Yie</h3>
                </div>
                <div className='m-1 ps-2'>
                    <p>
                        Nyasacha ayie chuth adier duto ma Eklesia Makatholik puonjowa, ni mar in iwuon emanielonigi, ma ok nyal wuondi, ma ok nyal
                        wuondowa. Amen.
                    </p>
                </div>
                
            </div>

            <div id='Lemo_Mar_Geno' className='col-md-12 ms-1 me-1 max-w-sm mx-auto p-3 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
                <div className='flex flex-wrap justify-center m-2'>
                    <h3 className='text-danger fw-bold'>Lemo Mar Geno</h3>
                </div>
                <div className='m-1 ps-2'>
                    <p>
                        Nyasacha ageno kuomi chuth nikech Jesus Kristus. Inimia nemani e pinyka, gi ngima maokrum i polo k'amako buchi, nimar
                        in emanichikowa, in eber ahinya, in minyalo gikmoko duto, in m'ichopo wachni. Amen
                    </p>
                </div>
                
            </div>

            <div id='Lemo Mar Hero' className='col-md-12 ms-1 me-1 max-w-sm mx-auto p-3 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
                <div className='flex flex-wrap justify-center m-2'>
                    <h3 className='text-danger fw-bold'>Lemo Mar Hero</h3>
                </div>
                <div className='m-1 ps-2'>
                    <p>
                        Nyasacha aheroi ahinya gi chunya duto, moloyo gikmoko duto, nimar iber ahinya, moher ahinya, kendo ahero ji duto
                        kaka aherora awuon nikech in. Amen.
                    </p>
                </div>
                
            </div>

            <div id='Lemo_Mar_Kwero' className='col-md-12 ms-1 me-1 max-w-sm mx-auto p-3 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
                <div className='flex flex-wrap justify-center m-2'>
                    <h3 className='text-danger fw-bold'>Lemo Mar Kwero</h3>
                </div>
                <div className='m-1 ps-2'>
                    <p>
                        Nyasacha akwero marichona gi chunya duto nimar giyanyi kendo gikwinyi. Ajok gi marichona kendo akwerogi nimar aheroi gi nemani, achikora kodi
                        kwero marichona, timo tim mabeyo, adwaro tho moloyo timo marach maduong' kata achiel. Amen.
                    </p>
                </div>
                
            </div>

            <div id='Par_Bikira_Maria' className='col-md-12 ms-1 me-1 max-w-sm mx-auto p-3 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
                <div className='flex flex-wrap justify-center m-2'>
                    <h3 className='text-danger fw-bold'>Par Bikira Maria</h3>
                </div>
                <div className='m-1 ps-2'>
                    <p>
                        Par Bikira Maria, moher ahinya ka nyakanene podi k'wawinjo ka nituono ng'a m'oringo obiro kuomi, mondo irite, m'okwayi
                        mondo ikonye, m'odwari mondo ikwane. Em'omiyo ageno kuomi abiro kuomi. Achung' i nyimi k'akwero marichona. A min Jesus
                        kik ituona gik m'akwayo, to mondo iwinja gi ng'wononi, iyie lemona. Amen.<br></br>
                        A maria manochwe ka onge marach mar kodhi.<br></br>
                        Ikwanwae wan m'waringo kuomi.

                    </p>
                </div>
                
            </div>

            <div id='Lemo_Mar_Kwayo_Ni_Jokafiri' className='col-md-12 ms-1 me-1 max-w-sm mx-auto p-3 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
                <div className='flex flex-wrap justify-center m-2'>
                    <h3 className='text-danger fw-bold'>Lemo Mar Kwayo Ni Jokafiri</h3>
                </div>
                <div className='m-1 ps-2'>
                    <p>
                        A Nyasaye maokrum jachwech gikmoko duto, mondo ipar ka chuny jokafiri gin twich lweti. In emanichweyogi ka kiti, ipar Jesus Kristus
                        Wuodi manosandi malit, manotho mondo gikwo. Kik iyie jokafiri ochaye, to yie lemo ma Eklisia, Chiege Matakatifu ogoloni.
                        Ipar ng'wononi. A Nyasaye wiyi mondo owil ka ok giyie, migi nema mondo giyie ka Nyasaye, Jesus Kristus, Wuodi manioro e piny mondo okwowa,
                        omiwa ngima, ochierwa, kendo manowarowa e mach maoktho. Humbe obedie higini gi higini. Amen.
                    </p>
                </div>
                
            </div>

            <div id='Lemo_Mar_Dhi_Chiemo' className='col-md-12 ms-1 me-1 max-w-sm mx-auto p-3 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
                <div className='flex flex-wrap justify-center m-2'>
                    <h3 className='text-danger fw-bold'>Lemo Mar Dhi Chiemo</h3>
                </div>
                <div className='m-1 ps-2'>
                    <p>
                        Nyasachwa, imiwa hapi kodi chiembwa bende m'wabiro nwang'o kuom ng'wononi. Nikech Kristus Ruodhwa. Amen.
                    </p>
                </div>
                
            </div>

            <div id='Lemo_Mar_Tieko_Chiemo' className='col-md-12 ms-1 me-1 max-w-sm mx-auto p-3 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
                <div className='flex flex-wrap justify-center m-2'>
                    <h3 className='text-danger fw-bold'>Lemo Mar Tieko Chiemo</h3>
                </div>
                <div className='m-1 ps-2'>
                    <p>
                        Nyasachwa manyalo gikmoko duto, wagoyoni erokamano kuom chiemo duto m'imiyowa. Ng'a mobet kendo makwayo ji higini gi higini.
                        Amen. Chuny jomoyie mondo oywe maber nikech ng'wono Nyasaye. Amen.
                    </p>
                </div>
                
            </div>

            <div id='Lemo_Mar_Odhiambo' className='col-md-12 ms-1 me-1 max-w-sm mx-auto p-3 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
                <div className='flex flex-wrap justify-center m-2'>
                    <h3 className='text-danger fw-bold'>Lemo Mar Odhiambo</h3>
                </div>
                <div className='m-1 ps-2'>
                    <p>
                        Ayie Nyasacha, In ka alami, aheri gi chunya duto kendo agoyoni erokamano nimar in emanichweya, in emaniwara gi Wuodi m'ihero. Niloka jakristus
                        kendo agoyoni erokamano kuom nema duto ma nimiya, kendo agoyoni erokamano nimar irita chieng' matinde. Amen.
                    </p>
                </div>
                
            </div>

            <div id='Buche_Nyasaye' className='col-md-12 ms-1 me-1 max-w-sm mx-auto p-3 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
                <div className='flex flex-wrap justify-center m-2'>
                    <h3 className='text-danger fw-bold'>Buche Nyasaye</h3>
                </div>
                <div className='m-1 ps-2'>
                        <ol>
                            <li>Lam Nyasaye achiel kende, ihere ahinya.</li>
                            <li>Kik ikuong'ri kayiem gi nying Nyasaye.</li>
                            <li>Los chieng' Nyasaye.</li>
                            <li>Luor wuoru gi meru.</li>
                            <li>Kik ineki.</li>
                            <li>Kik iwuow.</li>
                            <li>Kik ikwal.</li>
                            <li>Kik ihang ni wadu, kik iriambne.</li>
                            <li>Kik igomb chi ng'ato.</li>
                            <li>Kik igomb gir ng'ato.</li>
                        </ol>
                </div>
                
            </div>

            <div id='Buche_Eklesia' className='col-md-12 ms-1 me-1 max-w-sm mx-auto p-3 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
                <div className='flex flex-wrap justify-center m-2'>
                    <h3 className='text-danger fw-bold'>Buche Eklesia</h3>
                </div>
                <div className='m-1 ps-2'>
                        <ol>
                            <li>Los Dominika duto gi sewini madongo mowachi, k'iwinjo Missa kendo k'iweyo tich matek.</li>
                            <li>Twe ndalo mar tweo, kik icham ring'o ndalo ma Eklesia okwerowa.</li>
                            <li>Nwang' sakrament mar Pentensia ka pok itieko higa.</li>
                            <li>Nwang' sakrament mar Ukarestia ndalo mar Paska ka pok itieko higa.</li>
                            <li>Kony Jopadri k'ichiwonigi kuom gigi.</li>
                            <li>Kik inywom nyotu kendo kik ited sap nyombo maduong' ndalo ma Eklesia okwerowa.</li>
                        </ol>
                </div>
                
            </div>

            <div id='Duong_Obedie' className='col-md-12 ms-1 me-1 max-w-sm mx-auto p-3 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
                <div className='flex flex-wrap justify-center m-2'>
                    <h3 className='text-danger fw-bold'>Duong Obedie</h3>
                </div>
                <div className='m-1 ps-2'>
                    <p>
                        Duong' obedi ni Wuon, ni Wuowi, ni Chuny Matakatifu: Kaka nobet kar kwongo, kendo kawuono, kendo ndalo duto, higini gi higini. Amen
                    </p>
                </div>
                
            </div>

            <div id='Lemo_Mar_Dhi_Nindo' className='col-md-12 ms-1 me-1 max-w-sm mx-auto p-3 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
                <div className='flex flex-wrap justify-center m-2'>
                    <h3 className='text-danger fw-bold'>Lemo Mar Dhi Nindo</h3>
                </div>
                <div className='m-1 ps-2'>
                    <p>
                        Nyasacha, akwayi yweyona m'adhi yweyogo mondo obedi maber ni chunya kendo maber ni ringra. 
                        Bikira Maria Matakatifu, Malaika ma jaritna, gi jotakatifu duto mai polo, mondo urita otienoni gi kar thona. Amen<br />
                        Nying Jesus Kristus mondo opwoe ndalo duto! Higini gi higini. Amen
                    </p>
                </div>
                
            </div>
        </>
    )
}


export function LuoPresdiumPrayers() {

    return(
        <>
            <div id='Wend_Chako_Presdium' className='col-md-12 ms-1 me-1 max-w-sm mx-auto p-3 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
                <div className='flex flex-wrap justify-center m-2'>
                    <h3 className='text-danger fw-bold'>Wend Chako Presdium (x3)</h3>
                </div>
                <div className='m-1 ps-2'>
                    <p>
                        Maria Matakatifu,<br />
                        Minwa m'wahero, nyiswa Wuodi Ruodhwa.<br />
                        Bikira, Minwa m'wahero. Pakeuru Kerubim.<br />
                        Werneuru Serafim. Pakeuru Minwa maler.
                    </p>
                </div>
                
            </div>

            <div id='Chako_Katena' className='col-md-12 ms-1 me-1 max-w-sm mx-auto p-3 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
                <div className='flex flex-wrap justify-center m-2'>
                    <h3 className='text-danger fw-bold'>Chako Katena</h3>
                </div>
                <div className='m-1 ps-2'>
                    <p>
                        A Chuny Matakatifu bi, ipong' chuny jogi moyie gi nemani. Mok ma herani e chunygi.
                        Or chunyi nochwegi, nilok kit piny nodok manyien.
                    </p>
                    <p className="fw-bold text-primary text-center ">
                        <em>Walem</em>
                    </p>
                    <p>
                        A Nyasaye m'osepong'o chuny jomoyie gi ler mar Chuny Matakatifu; miwa mondo gi Chuny Matakatifu nogo,
                        wanwang' rieko modhi kare, mondo wamor gi hochne ndalo duto, nikech Kristus nogo Ruodhwa. Amen.
                    </p>
                    <p>
                        <span><span className="fw-bold">V: </span>A Ruoth heny dend dhoga,</span><br />
                        <span><span className="fw-bold">R: </span>Kendo dhoga noland humbi.</span><br />
                        <span><span className="fw-bold">V: </span>Nyasaye Wuon bi ikonywa,</span><br />
                        <span><span className="fw-bold">R: </span>A Ruoth bi ikonywa.</span><br />
                        <span><span className="fw-bold">V: </span>Nyasaye Wuowi bi iromnwa,</span><br />
                        <span><span className="fw-bold">R: </span>A Ruoth bi iromnwa.</span><br />
                        <span><span className="fw-bold">V: </span>Chuny ma Jahoyo bi itelnwa,</span><br />
                        <span><span className="fw-bold">R: </span>A Ruoth ret itelnwa.</span><br /><br />
                        <span className="walem">Duong' obedie...</span><br /><br />
                        <span><span className="fw-bold">V: </span>Jesus igolnwa marichowa,</span><br />
                        <span><span className="fw-bold">R: </span>Iwarwae kuom sand mach maoktho. Iter chuny ji duto i polo; to moloyo chuny ji madwaro ng'wononi.</span><br /><br />
                        (<span className="walem text-danger">Ka itero midhierni mag Rosari kata Katena</span>)

                    </p>
                </div>
                
            </div>

            <div id='Tieko_Katena' className='col-md-12 ms-1 me-1 max-w-sm mx-auto p-3 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
                <div className='flex flex-wrap justify-center m-2'>
                    <h3 className='text-danger fw-bold'>Tieko Katena</h3>
                </div>
                <div className='m-1 ps-2'>
                    <p>
                        Wamosi ni misawa Ruoth manyako, min ng'wono, Maria in e ngimawa, long'owa, genowa, wamosi; kuomi em'waywakie wan nyithind Eva majodar.
                        Kuomi em'wayweyoe ka waywak ka pi wang'wa chwer e aorani mar pi wang'. Ero jachwakwa mang'won ahinya go wang'i mamuolno kuomwa; inyiswa Jesus Nyathini mar iyi jahawi ka wuodhwa orumo.
                        A Bikira Maria mamuol, mang'won, gi malong'o.
                    </p>
                    <p>
                        <span><span className="fw-bold">V: </span>Ikwanwae Min Nyasaye Matakatifu,</span><br />
                        <span><span className="fw-bold">R: </span>Mondo wadok jomowinjore nwang'o gik ma Kristus nochikowa.</span>
                    </p>
                    <p className=" fw-bold text-primary text-center ">
                        <em>Walem</em>
                    </p>
                    <p>
                        Nyasaye mane Wuode ma miderma onwang'onwa kworuok mochwere gi ngimane, gi thone kendo gi chierne. Omiyo wakwayi Ruoth, k'waparo midhierni duto mag Rosari mar Bikira Maria 
                        Matakatifu. Nimondo watim gik mane gipuonjowa kendo wanwang' gik mane gichikowa, nikech Kristus nogo Ruodhwa. Amen.
                    </p>
                    <p>
                        <span><span className="fw-bold">V: </span>Adundo Matakatifu ahinya mar Jesus,</span><br />
                        <span><span className="fw-bold">R: </span>Kechwa.</span><br />
                        <span><span className="fw-bold">V: </span>Adundo maler mar Bikira Maria,</span><br />
                        <span><span className="fw-bold">R: </span>Ikwanwae.</span><br />
                        <span><span className="fw-bold">V: </span>Josef matakatifu,</span><br />
                        <span><span className="fw-bold">R: </span>Ikwanwae.</span><br />
                        <span><span className="fw-bold">V: </span>Joannes Efanjili matakatifu,</span><br />
                        <span><span className="fw-bold">R: </span>Ikwanwae.</span><br />
                        <span><span className="fw-bold">V: </span>Grignion mar Montfort matakatifu,</span><br />
                        <span><span className="fw-bold">R: </span>Ikwanwae.</span><br /><br />
                        <span className=""><em>E nying Wuon...</em></span>

                    </p>
                    <p className=" fw-bold text-primary text-center">
                        <em><span className=" fw-bold text-primary">Katena Lejio Maria Antifon (<span className="text-dark">Chung' malo</span>)</span></em>
                    </p>
                    <p>
                        En ng'ama othinyore, kaka piny m'oyawore malong'o, ka dwe marieny, ka wang'chieng malich, k'oganda mose ikore ni lweny.<br />
                        (<span className="text-danger"><em>Ranyisi mar musalaba</em></span>) 
                        Chunya pwoyo Ruoth. Chunya n'osemor kod Nyasaye (<span className="text-danger"><em>ikulo wiyi matin</em> </span>) 
                        Jawarna, nimar oseng'iyo tin mar misumbane. Neuru nyaka a kawuono, tienge duto noluonga ni jahawi; nimar ng'ama tek osetimona gik madongo.
                        Nyinge Matakatifu; ng'wonone obet gi ji moluore, nyaka a tieng' kwerewa nyaka chopi tieng' nyikwawa.<br />
                        Osetimo teko gi bade; jonyadhi mane sungore e chunygi, osekeyogi. Oseriembo Ruodhi e kombegi, oseting'o jomatindo malo. Jomane kech kayo, oseyieng'ogi gi gikmoko. 
                        Jomoko noriembo ka gin nono, osekonyo Israel misumbane. K'aparo ng'wonone, kaka nosewacho ni kwerewa, Abraham, gi wan nyikwaye manyaka chieng'.<br /><br />
                        <span className=""><em>Duong' obedie... </em>(<span className="text-danger"> <em>go chongi</em></span>)</span><br />

                    </p>
                    <p className=" fw-bold text-primary text-center ">
                        <em><span className=" fw-bold text-primary">Antifon (<span className="text-dark">Chung' malo</span>)</span></em>
                    </p>
                    <p>
                        En ng'ama othinyore, kaka piny m'oyawore malong'o, ka dwe marieny, ka wang'chieng malich, k'oganda mose ikore ni lweny.<br /><br />
                        <span><span className="fw-bold">V: </span>Maria manochwe ka onge marach mar kodhi,</span><br />
                        <span><span className="fw-bold">R: </span>Ikwanwae wan m'waringo kuomi.</span><br />

                    </p>
                    <p className=" fw-bold text-primary text-center ">
                        <em>Walem</em>
                    </p>
                    <p>
                        A Ruoth Jesus Kristus jakwanwa kuom Nyasaye Wuon, manemor k'oketo Bikira Maria Matakatifu janyuolne, nimondo obed minwa gi jachwakwa e polo. 
                        Mi ji duto m'oringo obiro kuomi, ginwang' ka gimor gikmoko duto ma gikwayo, nikech kwach Bikira Maria Matakatifu. Amen.<br /><br />
                        <span className=""><em>E nying Wuon...</em></span><br /><br />
                        (<span className="text-danger"> <em>go chongi</em></span>)

                    </p>
                    <p>
                        Waringo wabiro iri, mondo iritwa; in Matakatifu janywol Nyasaye, kik icha lemowa k'wachandore, to warwa kuom marichowa ndalo duto.
                        In Bikira Maria maduong' kendo ma jahawi. Ikwa Nyasaye mondo ochwe kodwa ndalo duto higini gi higini. Amen.<br /><br />

                        <span><span className="fw-bold">V: </span>Maria maonge marach,</span><br />
                        <span><span className="fw-bold">R: </span>Japognwa nema duto, ikwanwae.</span><br />
                        <span><span className="fw-bold">V: </span>Dhoranga polo matakatifu (<span className=" text-danger"><em> kata nying Bikira Maria moro</em></span>),</span><br />
                        <span><span className="fw-bold">R: </span>Ikwanwae.</span><br />
                        <span><span className="fw-bold">V: </span>Mikael gi Gabriel malaika matakatifu,</span><br />
                        <span><span className="fw-bold">R: </span>Ukwanwae.</span><br />
                        <span><span className="fw-bold">V: </span>Jotakatifu duto manie polo,</span><br />
                        <span><span className="fw-bold">R: </span>Ukwanwae.</span><br />
                        <span><span className="fw-bold">V: </span>Joannes Baptista matakatifu,</span><br />
                        <span><span className="fw-bold">R: </span>Ikwanwae.</span><br />
                        <span><span className="fw-bold">V: </span>Petrus gi Paulus joote matakatifu,</span><br />
                        <span><span className="fw-bold">R: </span>Ukwanwae.</span><br />
                    </p>
                    <p className="walem fw-bold text-primary text-center ">
                        <em>Walem</em>
                    </p>
                    <p>
                        A Ruoth wan jomatiyo ebwo bandech Maria, miwa yie makare kuomi, gi geno maok-orem kuom jonyuolni. Gikmoko ariyo manyalo loyo pinje duto:<br /><br />
                        <span className="text-primary"><em>Miwa yie motegno moriw gi hera</em></span>, ma nomiwa tiyo tije duto nikwop herani, gineni, kendo gitiyoni. Kwakwayo ni jowetewa, 
                        <span className="text-primary"><em>miwa yie matek ka lwanda maok sudi</em> </span>, ma nomiwa dhil gi chandruok, kendo gi tich, kendo gi masiche m'wayudo e pinyka.<br />
                        <span className="text-primary"><em>miwa yie ma onge luoro</em> </span>, ma nomiwa chir mar chako kendo mar tiyo tije madongo, nikwop Nyasaye, kanyakla achiel gi kwayo ni chunje ji.<br />
                        <span className="text-primary"><em>miwa yie manobedie lejionwa</em> </span>, ka siro mar mach motelonwa. K'wariwre kanyakla achiel, k'wakudho ma herani kuonde duto.<br />
                        <span className="text-primary"><em>miwa yie makelo ler</em> </span>, ni ji manie mudho kendo e tipo tho; mondo wachwak ma herani kuom ji mayomyom, wadwokie ngima mar nema, ni ji ma chunygi otho gi maricho, 
                        mondo chunygi okwe e pinyka. Ero Maria, ka wasetieko wuodhwa e pinyka, mi wan Jolegion Maria duto, wachak wachokore kendo maonge ng'ama orwenyo kata achiel, e piny duong' gi herani. Amen.<br />
                        Chuny Jolegion Maria duto gi chuny ji moyie duto ma Nyasaye Wuon oseomo, mondo giywe mayom nikech ng'wono Nyasaye. Amen.<br /><br />
                        <span><span className="fw-bold">V: </span>Giywe mayom nikech ng'wono Nyasaye.</span><br />
                        <span><span className="fw-bold">R: </span>Amen.</span><br />

                    </p>
                    <p className=" fw-bold text-primary text-center ">
                        <em>Walem</em>
                    </p>
                    <p>
                        Ruoth Jesus Kristus, aringo abiro iri ka, yiena em'okelaka. E yie anakwo, yiena ema nokwoya, jawarna kasetieko wuodha e pinyka. Aringo asudi e tiend musalapi, anwang' yie makare enyim ogandani. 
                        Un malaika ma joritwa, urwakwa gi lewni marochere, kendo uywe wang'wa g'otamba marachar.<br /><br /> 
                        <span><span className="fw-bold">V: </span>Nyasaye yie kodwa,</span><br />
                        <span><span className="fw-bold">R: </span>A Ruoth yie kodwa.</span><br />
                        <span><span className="fw-bold">V: </span>Bikira Maria bi ikonywa,</span><br />
                        <span><span className="fw-bold">R: </span>A Ruoth bi ikonywa.</span><br /><br />
                        <span className=""><em>Duong' obedie...</em></span><br />
                        <span className=""><em><a href="/prayers/literature/luo/3"><u>Litania</u></a> mar Bikira Maria Matakatifu Ahinya...</em></span><br />
                        <span className=""><em>E nying Wuon...</em></span>

                    </p>
                </div>
                
            </div>
        </>
    )
}




// IN KISWAHILI

export function KiswahiliRandomPrayers({title, lang}) {



    return(
        <>

        {
            title === 'lemo motelo mag legion maria church' ? (
                <>
                <a href='/resources/prayer/literature?lang=Luo&title=Lemo motelo mag Legion Maria Church'>Kiswahili 1</a>
                </>
            ):(
                <> 
                <a href='/resources/prayer/literature?lang=Luo&title=Nyasaye'>Kiswahili 2</a>
                </>
            )
        }
        </>
    )
}


// IN ENGLISH

export function EnglishRandomPrayers({title, lang}) {



    return(
        <>

        {
            title === 'lemo motelo mag legion maria church' ? (
                <>
                <a href='/resources/prayer/literature?lang=Luo&title=Lemo motelo mag Legion Maria Church'>English 1</a>
                </>
            ):(
                <> 
                <a href='/resources/prayer/literature?lang=Luo&title=Nyasaye'>English 2</a>
                </>
            )
        }
        </>
    )
}

