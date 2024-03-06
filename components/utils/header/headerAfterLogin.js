import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
  Drawer,
  CardBody,
  List,
  Accordion,
  ListItem,
  AccordionHeader,
  ListItemPrefix,
  AccordionBody,
  Alert,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
  ChevronRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { PresentationChartBarIcon } from "@heroicons/react/24/outline";
 
// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];
 
function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const closeMenu = () => setIsMenuOpen(false);
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
 
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
 
export function NavbarAfterLogin({session}) {

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
        <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
        <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">

          <div className=''>
          <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={openDrawer}
            className="ml-auto mr-2 lg:hidden"
          >
            {!isDrawerOpen && (
              <Bars3Icon className="h-8 w-8 stroke-2" />
              ) 
            }
          </IconButton>
          </div>

          <div className='flex'>
          <Typography
            className="mr-4 m-2 cursor-pointer py-1.5 font-medium"
          >
            {session?.user.name}
          </Typography>
          <ProfileMenu />
          </div>
          
        </div>
        
      </Navbar>
      <Drawer open={isDrawerOpen} onClose={closeDrawer} className="overflow-auto">
              <div className='flex justify-end'>
              {isDrawerOpen && (
                <IconButton
                  size="sm"
                  color="blue-gray"
                  variant="text"
                  onClick={closeDrawer}
                  className="ml-auto mr-2 lg:hidden"
                >
                  <XMarkIcon className="h-5 w-5 stroke-2" />
                </IconButton>
                ) 
              }
              </div>
            
            <CardBody
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
            
            </CardBody>
      </Drawer>
      </>

  );
}