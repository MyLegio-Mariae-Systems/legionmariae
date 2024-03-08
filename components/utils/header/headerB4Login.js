import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Card, CardBody, CardFooter, Input, Dialog, Alert,
  MobileNav,
  Avatar,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  GlobeAmericasIcon,
  NewspaperIcon,
  PhoneIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
  UserGroupIcon,
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  // ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import {signIn, signOut} from 'next-auth/react'
import toast, { ToastBar, Toaster} from 'react-hot-toast'


const navListMenuItems = [
  {
    title: "Liturgical Calender",
    description: "Find the perfect solution for your needs.",
    icon: CalendarDaysIcon,
    ref:'/resources/calendar'
  },
  {
    title: "Prayers",
    description: "Find the perfect solution for your needs.",
    icon: SquaresPlusIcon,
    ref:'/resources/prayer/literature?lang=Luo&title=Lemo duto mag Legion Maria Church'
  },
  {
    title: "Teachings",
    description: "Find the perfect solution for your needs.",
    icon: RectangleGroupIcon,
    ref:'#'
  },
  {
    title: "Mass",
    description: "Find the perfect solution for your needs.",
    icon: RectangleGroupIcon,
    ref:'#'
  },
  {
    title: "Songs",
    description: "Find the perfect solution for your needs.",
    icon: RectangleGroupIcon,
    ref:'#'
  },
  {
    title: "History",
    description: "Find the perfect solution for your needs.",
    icon: RectangleGroupIcon,
    ref:'#'
  },
  {
    title: "About Us",
    description: "Meet and learn about our dedication",
    icon: UserGroupIcon,
    ref:'#'
  },
  {
    title: "Blog",
    description: "Find the perfect solution for your needs.",
    icon: Bars4Icon,
    ref:'#'
  },
  {
    title: "Services",
    description: "Learn how we can help you achieve your goals.",
    icon: SunIcon,
    ref:'#'
  },
  {
    title: "Support",
    description: "Reach out to us for assistance or inquiries",
    icon: GlobeAmericasIcon,
    ref:'#'
  },
  {
    title: "Contact",
    description: "Find the perfect solution for your needs.",
    icon: PhoneIcon,
    ref:'#'
  },
  {
    title: "News",
    description: "Read insightful articles, tips, and expert opinions.",
    icon: NewspaperIcon,
    ref:'#'
  },
  
  {
    title: "Special Offers",
    description: "Explore limited-time deals and bundles",
    icon: TagIcon,
    ref:'#'
  },
];
 
function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title, description, ref }, key) => (
      <a href={ref} key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg text-decoration-none">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 text-decoration-none">
            {" "}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </a>
    ),
  );
 
  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium m-1">
            <ListItem
              className="flex fw-bold items-center gap-2  py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Resources
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}
 
function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 bg-white">
      <Typography
        as="a"
        href="/"
        variant="small"
        color="blue-gray"
        className="font-medium m-1 font-bold "
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4 ">Home</ListItem>
      </Typography>
      <NavListMenu  />
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium m-1"
      >
        <ListItem className="flex items-center font-bold gap-2 py-2 pr-4">
          Contact Us
        </ListItem>
      </Typography>
    </List>
  );
}
 
export default function NavbarB4Login({session}) {
  const router=useRouter()
  const [openNav, setOpenNav] = React.useState(false);

  let toastId

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const [openAlert, setOpenAlert] = React.useState({
    message:'',
    color:'red',
    open:false,
  });
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const [formData, setFormData] = React.useState();
  
  const validate=async()=>{

    if(!formData.username){
      setOpenAlert({open:true, message:'Username is required',color:'red'})
      return false
    }

    if(!formData.password){
      setOpenAlert({open:true, message:'Password is required',color:'red'})
      return false
    }

    return true
  }

  const handleInputChange = (e) => {
      // if(e.target.files){
      //     setState({...state,[e.target.name]:e.target.files[0]})

      // }
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      setOpenAlert({open:false})
  };

  const login = async (e) => {

      e.preventDefault()

      const valid=await validate()

      if (valid) {
          toastId=toast.loading('Loading, please wait...',{
              id:toastId
          })

          let info=await signIn('credentials',{
              username:formData.username,
              password:formData.password,
              redirect:false
          })
          toast.dismiss(toastId)
      
          if ((info && !info.ok)) {
              toastId=toast.error(info.error,{
                  id:toastId
              })
          }
          else{
              router.push('/lmacm/src/oda/dashboard/home-dashboard')
          }

      }
      
  };
 
  return (
    <>
    
      <Navbar className="mx-auto max-w-screen-xl px-4 py-2 sticky-top" color="blue">
      
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
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
        <Card className="mx-auto w-full max-w-[24rem] overflow-auto">
          <CardBody className="flex flex-col  gap-4 overflow-auto">
            <Typography variant="h2" color="blue-gray" className='text-center flex justify-center gap-3'>
              <img src='/images/logo.jpg'className='w-12 h-12'/>
              Sign In
            </Typography>
            
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter your username and password to Sign In.
            </Typography>
            <Alert color={openAlert.color} open={openAlert.open} onClose={() => setOpenAlert({open:false})}>
              {openAlert.message}
            </Alert>
            <Typography className="-mb-2" variant="h6">
              Your Username
            </Typography>
            <Input label="Username" size="lg" name='username' onChange={handleInputChange}/>
            <Typography className="-mb-2" variant="h6">
              Your Password
            </Typography>
            <Input label="Password" size="lg" type='password' name='password' onChange={handleInputChange}/>
            {/* <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div> */}
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={login} fullWidth>
              Sign In
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              Register Your Mission 
              <Typography
                as="a"
                href="/lmacm/signup"
                variant="small"
                color="blue"
                className="ml-1 fw-bold"
              >
                HERE
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
      <div className="flex items-center justify-between text-blue-gray-900 font-sans hover:font-serif ">
        <Typography
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2 text-4xl fw-bold "
          color="white"
        >
          Legion Maria of African Church Mission
        </Typography>
        <div className="hidden lg:block ">
          {/* <NavList /> */}
        </div>
        <div className="hidden gap-2 lg:flex bg-white bg-white">
          {/* <Button variant="text" size="sm" color="blue-gray">
            Log In
          </Button> */}
          <Button className='m-1' variant="gradient" size="sm" onClick={(e)=>{
            // router.push('/lmacm/signin')
            handleOpen()
          }}>
            Sign In
          </Button>
        </div>
        <IconButton
          variant="text"
          color="white"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden bg-white ">

          {
            session ? (
              <Button variant="gradient" size="sm" color="red" fullWidth onClick={signOut}>
                Sign Out
              </Button>
            ):(
              <Button className='m-1' variant="gradient" size="sm" fullWidth onClick={(e)=>{
                // router.push('/lmacm/signin')
                handleOpen()
              }}>
                Sign In
              </Button>
            )
          }
          
        </div>
      </Collapse>
    </Navbar>
    </>
    
  );
}

