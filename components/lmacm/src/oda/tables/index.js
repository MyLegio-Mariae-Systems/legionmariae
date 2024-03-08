'use client'

import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";

import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Spinner,
  Progress,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import toast, { ToastBar, Toaster} from 'react-hot-toast'

export default function ODAMembersTable({propData}) {

  const router=useRouter()

  const date=new Date()

  let toastId


  const returnTabs=()=>{

    if (propData.TITLE==='Available Members' || propData.TITLE==='Registered Members') {
      
      return (
        <Tabs value="all" className="w-full md:w-max">
          <TabsHeader>
            {propData.TABS.map(({ label, value }) => (
              <Tab key={value} value={value}>
                &nbsp;&nbsp;{label}&nbsp;&nbsp;
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
      )
    }
  }

  const searchData=async(e)=> {

    const {value}=await e.target

    if (propData.TITLE==='Available Members') {
      toastId=toast.loading('Available Members',{id:toastId})
      
    } else if (propData.TITLE==='Registered Members') {
      
      toastId=toast.loading('Registered Members',{id:toastId})

    }
    
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
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-8">
              <div>
                <Typography  className='text-3xl text-primary fw-bold'>
                  {propData.TITLE}
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about all {propData.TITLE.toLocaleLowerCase()}
                </Typography>
              </div>
              {
                propData.TITLE === 'Available Members' && (
                  <div className="flex flex-wrap shrink-0 gap-2 ">
                    {/* <Button variant="outlined" size="sm">
                      view all
                    </Button> */}
                    <select class="rounded-md border ">
                      <option>Available Members</option>
                      <option>Not Registered Members</option>
                    </select>
                    <Button className="flex items-center gap-1" size="sm" onClick={()=> router.push('/lmacm/src/oda/members/new-member')}>
                      <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
                    </Button>
                  </div>
                )
              }
              
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              {returnTabs()}
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  onChange={searchData}
                />
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {propData.TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 fw-bold leading-none opacity-100"
                      >
                        {head}{" "}
                        {index !== propData.TABLE_HEAD.length - 1 && (
                          <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                        )}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {propData.TABLE_ROWS.map(
                  ({ img, name, email, job, org, online, date }, index) => {
                    const isLast = index === propData.TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";
    
                    return (
                      <tr key={name}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Avatar src={img} alt={name} size="sm" />
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {name}
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                {email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {job}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {org}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={online ? "online" : "offline"}
                              color={online ? "green" : "blue-gray"}
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {date}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Tooltip content="Edit User">
                            <IconButton variant="text">
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography variant="small" color="blue-gray" className="font-normal">
              Page 1 of 10
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" size="sm">
                Previous
              </Button>
              <Button variant="outlined" size="sm">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        </>
    )
}