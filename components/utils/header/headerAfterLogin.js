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
  ChartPieIcon,
  PresentationChartLineIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/react/24/solid";
import { ChartBarIcon, ChevronLeftIcon, LinkIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
 
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
                onClick={isLastItem ? signOut :''}
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

const SideNavitems=[
  {
    title:'Headquaters',
    child:[
      {
          title:'Arch Dioces',
          child:[
            {
              title:'Dashboard',
              child:[

                {
                  title:'Home Dashboard',
                  link:'/lmacm/src/hq/arch-dioces/dashboard/home-dashboard'
                },
                
              ]
              
            },
            {
              title:'Register',
              child:[
                
                {
                  title:'New Arch Dioces',
                  link:'/lmacm/src/hq/arch-dioces/register/new-arch-dioces'
                },
                
              ]
              
            },
            {
              title:'View',
              child:[
                {
                  title:'View Arch Dioces',
                  link:'/lmacm/src/hq/arch-dioces/view/arch-dioces'
                },
                {
                  title:'Available Members',
                  link:'/lmacm/src/arch-dioces/view/available-members'
                },
                {
                  title:'Registered Members',
                  link:'/lmacm/src/arch-dioces/view/registered-members'
                },
                {
                  title:'Deacon Members',
                  link:'/lmacm/src/arch-dioces/view/deacon-members'
                },
                {
                  title:'Acolyte Members',
                  link:'/lmacm/src/arch-dioces/view/acolyte-members'
                },
                {
                  title:'Official Members',
                  link:'/lmacm/src/arch-dioces/view/official-members'
                },
              ]
              
            },
            {
              title:'Projects',
              child:[
                {
                  title:'Available Projects',
                  link:'/lmacm/src/arch-dioces/projects/available-projects'
                },
                
              ]
              
            },
            {
              title:'Contributions',
              child:[
                {
                  title:'My Contributions',
                  link:'/lmacm/src/oda/contributions/my-contributions'
                },
                {
                  title:'Available Contributions',
                  link:'/lmacm/src/arch-dioces/contributions/available-contributions'
                },
                {
                  title:'Ongoing Contributions',
                  link:'/lmacm/src/arch-dioces/contributions/ongoing-contributions'
                },
                
              ]
              
            },
            {
              title:'Files',
              child:[
                {
                  title:'Downloaded Files',
                  link:'/lmacm/src/oda/files/downloaded-files'
                },
                
              ]
              
            },
          ],
      },

      {
        title:'Dioces',
        child:[
          {
            title:'Dashboard',
            child:[

              {
                title:'Home Dashboard',
                link:'/lmacm/src/hq/dioces/dashboard/home-dashboard'
              },
              
            ]
            
          },
          {
            title:'Register',
            child:[
              
              {
                title:'New Dioces',
                link:'/lmacm/src/hq/dioces/register/new-dioces'
              },
              
            ]
            
          },
          {
            title:'View',
            child:[
              {
                title:'View Arch Dioces',
                link:'/lmacm/src/hq/arch-dioces/view/arch-dioces'
              },
              {
                title:'Available Members',
                link:'/lmacm/src/arch-dioces/view/available-members'
              },
              {
                title:'Registered Members',
                link:'/lmacm/src/arch-dioces/view/registered-members'
              },
              {
                title:'Deacon Members',
                link:'/lmacm/src/arch-dioces/view/deacon-members'
              },
              {
                title:'Acolyte Members',
                link:'/lmacm/src/arch-dioces/view/acolyte-members'
              },
              {
                title:'Official Members',
                link:'/lmacm/src/arch-dioces/view/official-members'
              },
            ]
            
          },
          {
            title:'Projects',
            child:[
              {
                title:'Available Projects',
                link:'/lmacm/src/arch-dioces/projects/available-projects'
              },
              {
                title:'Ongoing Projects',
                link:'/lmacm/src/arch-dioces/projects/ongoing-projects'
              },
              {
                title:'Completed Projects',
                link:'/lmacm/src/arch-dioces/projects/completed-projects'
              },
              {
                title:'Pending Projects',
                link:'/lmacm/src/arch-dioces/projects/pending-projects'
              },
              {
                title:'Future Projects',
                link:'/lmacm/src/arch-dioces/projects/future-projects'
              },
            ]
            
          },
          {
            title:'Contributions',
            child:[
              {
                title:'My Contributions',
                link:'/lmacm/src/oda/contributions/my-contributions'
              },
              {
                title:'Available Contributions',
                link:'/lmacm/src/arch-dioces/contributions/available-contributions'
              },
              {
                title:'Ongoing Contributions',
                link:'/lmacm/src/arch-dioces/contributions/ongoing-contributions'
              },
              
            ]
            
          },
          {
            title:'Files',
            child:[
              {
                title:'Downloaded Files',
                link:'/lmacm/src/oda/files/downloaded-files'
              },
              
            ]
            
          },
        ],
      },

      {
        title:'Mission',
        child:[
          {
            title:'Dashboard',
            child:[

              {
                title:'Home Dashboard',
                link:'/lmacm/src/hq/mission/dashboard/home-dashboard'
              },
              
            ]
            
          },
          {
            title:'Register',
            child:[
              
              {
                title:'New Mission',
                link:'/lmacm/src/hq/mission/register/new-mission'
              },
              
            ]
            
          },
          {
            title:'View',
            child:[
              {
                title:'View Mission',
                link:'/lmacm/src/hq/mission/view/mission'
              },
              {
                title:'Available Members',
                link:'/lmacm/src/arch-dioces/view/available-members'
              },
              {
                title:'Registered Members',
                link:'/lmacm/src/arch-dioces/view/registered-members'
              },
              {
                title:'Deacon Members',
                link:'/lmacm/src/arch-dioces/view/deacon-members'
              },
              {
                title:'Acolyte Members',
                link:'/lmacm/src/arch-dioces/view/acolyte-members'
              },
              {
                title:'Official Members',
                link:'/lmacm/src/arch-dioces/view/official-members'
              },
            ]
            
          },
          {
            title:'Projects',
            child:[
              {
                title:'Available Projects',
                link:'/lmacm/src/arch-dioces/projects/available-projects'
              },
              {
                title:'Ongoing Projects',
                link:'/lmacm/src/arch-dioces/projects/ongoing-projects'
              },
              {
                title:'Completed Projects',
                link:'/lmacm/src/arch-dioces/projects/completed-projects'
              },
              {
                title:'Pending Projects',
                link:'/lmacm/src/arch-dioces/projects/pending-projects'
              },
              {
                title:'Future Projects',
                link:'/lmacm/src/arch-dioces/projects/future-projects'
              },
            ]
            
          },
          {
            title:'Contributions',
            child:[
              {
                title:'My Contributions',
                link:'/lmacm/src/oda/contributions/my-contributions'
              },
              {
                title:'Available Contributions',
                link:'/lmacm/src/arch-dioces/contributions/available-contributions'
              },
              {
                title:'Ongoing Contributions',
                link:'/lmacm/src/arch-dioces/contributions/ongoing-contributions'
              },
              
            ]
            
          },
          {
            title:'Files',
            child:[
              {
                title:'Downloaded Files',
                link:'/lmacm/src/oda/files/downloaded-files'
              },
              
            ]
            
          },
        ],
      },
      {
        title:'Calendar',
        child:[
          {
            title:'Liturgical Calendar',
            child:[

              {
                title:'Calendar Dashboard',
                link:'/lmacm/src/hq/calendar'
              },
              
            ]
            
          },
          
        ],
      },
        
    ]
  },
  

  {
    title:'O.D.A',
    child:[
        {
            title:'Mission O.D.A',
            child:[
              {
                title:'Dashboard',
                child:[
                  {
                    title:'Home Dashboard',
                    link:'/lmacm/src/oda/dashboard/home-dashboard'
                  },
                  
                ]
                
              },
              {
                title:'Members',
                child:[
                  {
                    title:'New Member',
                    link:'/lmacm/src/oda/members/new-member'
                  },
                  {
                    title:'Available Members',
                    link:'/lmacm/src/oda/members/available-members'
                  },
                  {
                    title:'Registered Members',
                    link:'/lmacm/src/oda/members/registered-members'
                  },
                  {
                    title:'Deacon Members',
                    link:'/lmacm/src/oda/members/deacon-members'
                  },
                  {
                    title:'Acolyte Members',
                    link:'/lmacm/src/oda/members/acolyte-members'
                  },
                  {
                    title:'Official Members',
                    link:'/lmacm/src/oda/members/official-members'
                  },
                ]
                
              },
              {
                title:'Projects',
                child:[
                  {
                    title:'Available Projects',
                    link:'/lmacm/src/oda/projects/available-projects'
                  },
                  
                  
                ]
                
              },
              {
                title:'Contributions',
                child:[
                  {
                    title:'My Contributions',
                    link:'/lmacm/src/oda/contributions/my-contributions'
                  },
                  {
                    title:'Available Contributions',
                    link:'/lmacm/src/oda/contributions/available-contributions'
                  },
                  {
                    title:'Ongoing Contributions',
                    link:'/lmacm/src/oda/contributions/ongoing-contributions'
                  },
                  
                ]
                
              },
              {
                title:'Files',
                child:[
                  {
                    title:'Downloaded Files',
                    link:'/lmacm/src/oda/files/downloaded-files'
                  },
                  
                ]
                
              },
            ],
        },
        
    ]
  },
 
]

export function NavbarAfterLogin({ session }) {
  const [open, setOpen] = React.useState(0);
  const [open1, setOpen1] = React.useState(0);
  const [open2, setOpen2] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleOpen1 = (value) => {
    setOpen1(open1 === value ? '' : value);
  };

  const handleOpen2 = (value) => {
    setOpen2(open2 === value ? '' : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);


  return (
    <>
      <Navbar className="sticky-top mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
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
          )}
        </div>

        <CardBody
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-1"
        >
          <div className="mb-1 flex gap-4 p-1">
            <img
              src="/images/logo.jpg"
              alt="brand"
              className="h-12 w-12"
            />
            <Typography variant="h3" color="fw-bold blue-gray text-center">
              Legion Maria Church
            </Typography>
          </div>
          <div className="p-1 flex justify-center col-md-12">
            <span className='fw-bold text-xl text-primary'>System Administrator</span>
          </div>
          <div>
            <List>
              {SideNavitems.map((parent, key) => {
                return (
                  <>
                    <Accordion
                      open={open === key + 1}
                      icon={
                        <ChevronDoubleDownIcon
                          strokeWidth={2}
                          className={`mx-auto h-4 w-4 transition-transform ${open === key + 1 ? "rotate-180" : ""}`}
                        />
                      }
                      key={key + 1}
                    >
                      <ListItem className="p-0" selected={open === key + 1}>
                        <AccordionHeader onClick={() => handleOpen(key + 1)} className="border-b-0 p-3">
                          <ListItemPrefix>
                            <PresentationChartLineIcon color="red" className="h-5 w-5" />
                          </ListItemPrefix>
                          <Typography color="black" className="m-auto fw-bold">
                            {parent.title}
                          </Typography>
                        </AccordionHeader>
                      </ListItem>
                      <AccordionBody className="py-1">
                        <List className="p-0">
                          {parent.child.map((subParent1, key) => {
                            return (
                              <>
                                <Accordion
                                  open={open1 === 'a' + key + 1}
                                  icon={
                                    <ChevronRightIcon
                                      strokeWidth={2.5}
                                      className={`mx-auto h-4 w-4 transition-transform ${open1 === 'a' + key + 1 ? "rotate-180" : ""}`}
                                    />
                                  }
                                  key={key + 1}
                                >
                                  <ListItem className="p-0" selected={open1 === 'a' + key + 1}>
                                    <AccordionHeader onClick={() => handleOpen1('a' + key + 1)} className="border-b-0 p-2">
                                      <ListItemPrefix>
                                        <ChartBarIcon color="purple" className="h-5 w-5" />
                                      </ListItemPrefix>
                                      <Typography color="red" className="m-auto font-normal">
                                        {subParent1.title}
                                      </Typography>
                                    </AccordionHeader>
                                  </ListItem>
                                  <AccordionBody className="py-1">
                                    <List className="p-0">
                                    {subParent1.child.map((subParent2, key) => {
                                      return (
                                        <>
                                          <Accordion
                                            open={open2 === 'b' + key + 1}
                                            icon={
                                              <ChevronLeftIcon
                                                strokeWidth={2.5}
                                                className={`mx-auto h-4 w-4 transition-transform ${open2 === 'b' + key + 1 ? "rotate-180" : ""}`}
                                              />
                                            }
                                            key={key + 1}
                                          >
                                            <ListItem className="p-0" selected={open2 === 'b' + key + 1}>
                                              <AccordionHeader onClick={() => handleOpen2('b' + key + 1)} className="border-b-0 p-1">
                                                <ListItemPrefix>
                                                  <ChartPieIcon color='blue' className="h-5 w-5" />
                                                </ListItemPrefix>
                                                <Typography color="purple" className="m-auto font-normal">
                                                  {subParent2.title}
                                                </Typography>
                                              </AccordionHeader>
                                            </ListItem>
                                            <AccordionBody className="py-1">
                                              <List className="p-0">
                                              {
                                                subParent2.child.map((result,key)=>{
                                                  return (
                                                      <>
                                                        <a onClick={()=>{setIsDrawerOpen(false)}} href={result.link} key={'c'+key+1} className='text-decoration-none'>
                                                            <ListItem>
                                                            <ListItemPrefix>
                                                                <LinkIcon color="green"  className="h-5 w-5" />
                                                            </ListItemPrefix>
                                                            {result.title}
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
                                    })}
                                    </List>
                                  </AccordionBody>
                                </Accordion>
                              </>
                            )
                          })}
                        </List>
                      </AccordionBody>
                    </Accordion>
                  </>
                )
              })}
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


