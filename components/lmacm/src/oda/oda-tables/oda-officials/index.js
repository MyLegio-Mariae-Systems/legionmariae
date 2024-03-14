'use client'

import { NewMissionODAOfficialMember, getODAMembers, getODAOfficialMembers } from "@/app/api/v14/controllers/oda/route";
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
import React from 'react'
import pluralize from 'pluralize'

export default function ODAOfficialMembersTable({propData, mission}) {

  const router=useRouter()

  const date=new Date()

  let toastId

  const [TABLE_ROWS, setTABLE_ROWS] = React.useState([]);
  const [DeaconsAcolytes, setDeaconsAcolytes] = React.useState([]);
  const [Missions, setMissions] = React.useState([]);
  const [Data, setData] = React.useState({searchParams:'',mission,page:'',pageLimit:'',role:''});
  const [PageCount,setPageCount]=React.useState(0)
  const [FormData,setFormData]=React.useState()
  const [MembersFound,setMembersFound]=React.useState(0)


  const page=React.useRef(1)
  const pageLimit=React.useRef(30)


  React.useEffect(() => {
    Data.pageLimit=pageLimit.current
    Data.page=page.current
    toast.loading('Loading. Please wait...',{id:toastId})
    if (propData && propData.TABLE_ROWS) {
      let pages=Math.ceil(propData.TABLE_ROWS[0]?.pageCount / pageLimit.current)
    
      setMembersFound(propData.TABLE_ROWS[0]?.pageCount)
      setPageCount(pages)
      setTABLE_ROWS(propData.TABLE_ROWS);
      setDeaconsAcolytes(propData.DeaconsAcolytes);
      setMissions(propData.Missions);
    }

    if (propData) {
      toast.dismiss(toastId)
    }
  }, [propData]);

  

  // console.log(TABLE_ROWS);
  const handlePageClick=(value)=>{
    page.current=page.current + value
    getAllODAOfficialMembers()
  }

  const returnTabs=()=>{

    if (propData.TITLE==='Official Members' ) {
      
      return (
        <Tabs value="all" className="w-full overflow-auto ">
          <TabsHeader className='bg-white'>
            {propData.TABS.map(({ label, value }) => (
              <Tab className='' key={value} value={value} onClick={()=>{
                Data.role=value
                getAllODAOfficialMembers()
                }}>
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

    Data.searchParams=value

    getAllODAOfficialMembers()
    
  }

  const getAllODAOfficialMembers=async()=>{

    // console.log(Data);

    Data.page=page.current-1

    toastId=toast.loading('Loading. Please wait...',{id:toastId})

    let response=await getODAOfficialMembers(Data)

    let pages=Math.ceil(response.data[0]?.pageCount / pageLimit.current)

    setMembersFound(response.data[0]?.pageCount)
    setPageCount(pages)

    toast.dismiss(toastId)

    setTABLE_ROWS(response.data)

  }

  const newODAOfficialMember=async()=>{

    try {

      toastId=toast.loading('Loading. Please wait...',{id:toastId})
      
      let response=await NewMissionODAOfficialMember(FormData)
      toast.dismiss(toastId)

      if (response.success) {
        toast.success('Successful!')
        getAllODAOfficialMembers()
      } else {
        toast.error(response.message)
      }
      
      
    } catch (error) {
      toast.error('Client error occurred')
      console.log(error);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });

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
                propData.TITLE === 'Official Members' && (
                  <div className="flex flex-wrap shrink-0 gap-4 overflow-scroll w-full mt-2 mb-2">
                    {/* <Button variant="outlined" size="sm">
                      view all
                    </Button> */}
                    <select class="rounded-md border " onChange={handleInputChange} name="oda_username">
                      <option value={''}>Choose Member</option>
                      {
                        DeaconsAcolytes?.map((result,key)=>{

                          return <option key={key} value={result?.oda_username}>{result?.oda_username}, {result?.category} {result?.first_name} {result?.middle_names} {result?.last_name}</option>

                        })
                      }
                      
                    </select>
                    <select class="rounded-md border " onChange={handleInputChange} name="role">
                      <option value={''}>Choose Role</option>
                      {
                        propData.TABS?.map(({ label, value },key)=>{

                          return <option key={key} value={value}>{label}</option>

                        })
                      }
                      
                    </select>
                    <select class="rounded-md border " onChange={handleInputChange} name="mission">
                      <option value={''}>Choose Mission</option>
                      {
                        Missions?.map((result,key)=>{

                          return <option value={result?.code}>{result?.code}, {result?.name}</option>

                        })
                      }
                    </select> 

                    <Button className="flex items-center gap-1" size="sm" onClick={newODAOfficialMember}>
                      <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Official
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
            <Typography color="gray" className="mt-3 fw-bold text-end me-3">
                Total Members : <span className="text-danger">{MembersFound ? MembersFound : 0}</span>
            </Typography>
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
                {TABLE_ROWS?.map(
                  ({documents}, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";
    
                    return (
                      <tr key={index}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            {/* <Avatar src={img} alt={name} size="sm" /> */}
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {documents?.odaMembers?.oda_username}  
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                {documents?.odaMembers?.category} {documents?.odaMembers?.first_name} {documents?.odaMembers?.middle_names} {documents?.odaMembers?.last_name}
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
                              {documents?.odaMembers?.contact}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {documents?.odaMembers?.email}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {documents?.role}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {documents?.mission?.code} {documents?.mission?.name}
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
              Page {page.current} of {PageCount}
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" size="sm" onClick={()=>handlePageClick(-1)} disabled={page.current < 2 ? true : false}>
                Previous
              </Button>
              <Button variant="outlined" size="sm" onClick={()=>handlePageClick(+1)} disabled={page.current === PageCount ? true : false || PageCount < 1 ? true : false}>
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        </>
    )
}