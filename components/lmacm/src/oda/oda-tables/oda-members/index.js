'use client'

import { deleteODAMembers, editODAMembers, getODAMembers, getODAOfficialMembers } from "@/app/api/v14/controllers/oda/route";
import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, ChevronUpDownIcon, TrashIcon, EyeIcon, ArchiveBoxIcon } from "@heroicons/react/24/solid";

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
  DialogFooter,
  DialogBody,
  DialogHeader,
  Dialog,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import toast, { ToastBar, Toaster} from 'react-hot-toast'
import React from 'react'
import pluralize from 'pluralize'
import { DateOnly } from "../../../../../utils";

export default function ODAMembersTable({propData, category,session}) {

  const router=useRouter()

  const date=new Date()

  let toastId

  const [TABLE_ROWS, setTABLE_ROWS] = React.useState([]);
  const [Data, setData] = React.useState({searchParams:'',category,page:'',pageLimit:''});
  const [PageCount,setPageCount]=React.useState(0)
  const [MembersFound,setMembersFound]=React.useState(0)
  const [Edit,setEdit]=React.useState(false)
  const [OneMember, setOneMember] = React.useState();


  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2((cur) => !cur);

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
    }

    if (propData) {
      toast.dismiss(toastId)
    }
  }, [propData]);

  

  // console.log(TABLE_ROWS);
  const handlePageClick=(value)=>{
    page.current=page.current + value
    getAllODAMembers()
  }

  const returnTabs=()=>{

    if (propData.TITLE==='Available Members' || propData.TITLE==='Registered Members') {
      
      return (
        <Tabs value="all" className="w-full md:w-max">
          <TabsHeader>
            {propData.TABS.map(({ label, value }) => (
              <Tab key={value} value={value} onClick={()=>{
                Data.category=pluralize.singular(value)
                getAllODAMembers()
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

    getAllODAMembers()
    
  }

  const getAllODAMembers=async()=>{

    // console.log(Data);

    Data.page=page.current-1

    toastId=toast.loading('Loading. Please wait...',{id:toastId})
    let response

    // if (propData.TITLE==='Official Members') {
    //   response=await getODAOfficialMembers(Data)
    // } else if (propData.TITLE==='Registered Members') {
      response=await getODAMembers(Data)
    // }

    let pages=Math.ceil(response.data[0]?.pageCount / pageLimit.current)
    
    setPageCount(pages)
    setMembersFound(response.data[0]?.pageCount)

    toast.dismiss(toastId)

    // console.log(pages);

    setTABLE_ROWS(response.data)

  }

  const validate=async()=>{

    if(
      !OneMember?.first_name || 
      !OneMember?.last_name ||
      !OneMember?.category
      )
    {
      toast.error('Please fill in all required fields')

      return false
    }

    if (OneMember?.email && !OneMember?.category==='Deacon') {
      if(!OneMember.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        )
      {
        toast.error('Please enter a valid email address')
        return false
      }
      
    }


    if (OneMember?.contact && !OneMember?.category==='Deacon') {
      if(isNaN(OneMember?.contact) || OneMember?.contact.length !==10){
        toast.error('Please enter a valid contact number')
        return false
      }
    }
      

      return true
  }

  const editData=async(e)=> {
    e.preventDefault()

    const valid = await validate()

    if (!valid) {
      toast.error('All fields are required')
      return
    }

    let FormData={
      oda_username:OneMember?.oda_username,
      first_name:OneMember?.first_name,
      middle_names:OneMember?.middle_names,
      last_name:OneMember?.last_name,
      mission:session?.user?.level_code,
      session:session?.user?.id,
      contact:OneMember?.contact,
      email:OneMember?.email,
      category:OneMember?.category,
    }

    try {

      toastId=toast.loading('Loading. Please wait...',{id:toastId})

      let response=await editODAMembers(FormData)

      toast.dismiss(toastId)

      if (response.success) {

        toast.success('Successful!')
        getAllODAMembers()
        handleOpen2()
      } else {
        toast.error(response.message)
      }
      
    } catch (error) {
      toast.error('Unknown Error occured')
      console.log(error);
    }
    
  }

  const deleteData=async(oda_username,name,bool)=> {

    let FormData={
      oda_username,
      mission:session?.user?.level_code,
      session:session?.user?.id
    }

    const answer=confirm(`Are you sure you want to ${bool ?'suspend':'delete'} this member: ${oda_username} ${name}`)

    if (!answer) {
      return
    }

    try {

      toastId=toast.loading('Loading. Please wait...',{id:toastId})

      let response=await deleteODAMembers(FormData,bool)

      toast.dismiss(toastId)

      if (response.success) {

        toast.success('Successful!')
        getAllODAMembers()
      } else {
        toast.error(response.message)
      }
      
    } catch (error) {
      toast.error('Unknown Error occured')
      console.log(error);
    }
    
  }

  const handleInputEdit=(e)=> {

    const {name,value}= e.target
    setOneMember({...OneMember,[name]:value})

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

            <Dialog open={open2} handler={handleOpen2} className="shadow-none h-screen flex-col overflow-scroll" size="xm">
              
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

              <form onSubmit={editData}>

              <DialogHeader className="grid w-full gap-2">
              <Typography variant="h4" color="blue-gray" className="text-center">
                {Edit ? 'Edit':'All'} Member Details
              </Typography>
              <div className="flex w-full justify-between fw-bold flex-wrap">
                <Typography color={'red'} className="fw-bold">
                  {OneMember?.oda_username}
                </Typography>
                <Typography color={'green'} className="fw-bold">
                  {OneMember?.first_name} {OneMember?.middle_names} {OneMember?.last_name}
                </Typography>
              </div>
              </DialogHeader>
              <DialogBody divider >
              
              <CardBody className="flex-col w-full px-0">

                  <div className="flex flex-wrap w-full justify-between">
                    <div className="col-md-4">
                    <Typography variant="small" color="black" className="fw-bold">
                      Username
                    </Typography>
                    </div>
                    <div className="col-md-7">
                    <Typography variant="small" color="black" className="font-normal">
                      {OneMember?.oda_username}
                    </Typography>
                    </div>
                  </div>

                  <div className="flex flex-wrap w-full justify-between">
                    <div className="col-md-4">
                      <Typography variant="small" color="black" className="fw-bold">
                        First Name
                      </Typography>
                    </div>
                    
                    <div className="col-md-7">
                    <Typography variant="small" color="black" className="font-normal">
                      {Edit ? (
                        <Input className="form-control" name="first_name" required value={OneMember?.first_name || ''} onChange={handleInputEdit}/>
                      ):(
                        <Typography variant="small" color="black" className="fw-normal">
                          {OneMember?.first_name}
                        </Typography>
                      )}
                      
                    </Typography>
                    </div>
                  </div>

                  <div className="flex flex-wrap w-full justify-between">
                    <div className="col-md-4">
                      <Typography variant="small" color="black" className="fw-bold">
                        Middle Names
                      </Typography>
                    </div>
                    
                    <div className="col-md-7">
                    <Typography variant="small" color="black" className="font-normal">
                      {Edit ? (
                        <Input className="form-control" name="middle_names" value={OneMember?.middle_names || ''} onChange={handleInputEdit}/>
                      ):(
                        <Typography variant="small" color="black" className="fw-normal">
                          {OneMember?.middle_names}
                        </Typography>
                      )}
                      
                    </Typography>
                    </div>
                  </div>

                  <div className="flex flex-wrap w-full justify-between">
                    <div className="col-md-4">
                      <Typography variant="small" color="black" className="fw-bold">
                        Last Name
                      </Typography>
                    </div>
                    
                    <div className="col-md-7">
                    <Typography variant="small" color="black" className="font-normal">
                      {Edit ? (
                        <Input className="form-control" name="last_name" required value={OneMember?.last_name || ''} onChange={handleInputEdit}/>
                      ):(
                        <Typography variant="small" color="black" className="fw-normal">
                          {OneMember?.last_name}
                        </Typography>
                      )}
                      
                    </Typography>
                    </div>
                  </div>

                  <div className="flex flex-wrap w-full justify-between">
                    <div className="col-md-4">
                    <Typography variant="small" color="black" className="fw-bold">
                      Email Address
                    </Typography>
                    </div>
                    <div className="col-md-7">
                      {Edit ? (
                        <Input className="form-control" name="email" required={OneMember?.category==='Deacon' ? true : false} value={OneMember?.email || ''} onChange={handleInputEdit}/>
                      ):(
                        <Typography variant="small" color="black" className="fw-normal">
                          {OneMember?.email}
                        </Typography>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap w-full justify-between">
                    <div className="col-md-4">
                    <Typography variant="small" color="black" className="fw-bold">
                      Contact Number
                    </Typography>
                    </div>
                    <div className="col-md-7">
                      {Edit ? (
                        <Input className="form-control" name="contact" required={OneMember?.category==='Deacon' ? true : false} value={OneMember?.contact || ''} onChange={handleInputEdit}/>
                      ):(
                        <Typography variant="small" color="black" className="fw-normal">
                          {OneMember?.contact}
                        </Typography>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap w-full justify-between">
                    <div className="col-md-4">
                    <Typography variant="small" color="black" className="fw-bold">
                      Category
                    </Typography>
                    </div>
                    <div className="col-md-7">
                      {Edit ? (
                        <select className="form-select" name="category" required onChange={handleInputEdit}>
                          <option>{OneMember?.category}</option>
                          {
                            OneMember?.category === 'Acolyte' && (
                              <option>Deacon</option>
                            )
                          }
                        </select>
                      ):(
                        <Typography variant="small" color="black" className="fw-normal">
                          {OneMember?.category}
                        </Typography>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap w-full justify-between mt-1">
                    <div className="col-md-4">
                    <Typography variant="small" color="black" className="fw-bold">
                      Mission 1
                    </Typography>
                    </div>
                    <div className="col-md-7">
                    <Typography variant="small" color="black" className="font-normal">
                      {OneMember?.primaryMission?.code}, {OneMember?.primaryMission?.name}
                    </Typography>
                    </div>
                  </div>

                  <div className="flex flex-wrap w-full justify-between">
                    <div className="col-md-4">
                    <Typography variant="small" color="black" className="fw-bold">
                      Mission 2
                    </Typography>
                    </div>
                    <div className="col-md-7">
                    <Typography variant="small" color="black" className="font-normal">
                      {OneMember?.secondaryMission?.code}, {OneMember?.secondaryMission?.name}
                    </Typography>
                    </div>
                  </div>

                  <div className="flex flex-wrap w-full justify-between">
                    <div className="col-md-4">
                    <Typography variant="small" color="black" className="fw-bold">
                      Account Verified
                    </Typography>
                    </div>
                    <div className="col-md-7">
                      <Chip
                        variant="ghost"
                        size="md"
                        value={OneMember?.verified ? "Yes" :  "No"}
                        color={OneMember?.verified ? "blue" : "red"}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap w-full justify-between">
                    <div className="col-md-4">
                    <Typography variant="small" color="black" className="fw-bold">
                      Account Status
                    </Typography>
                    </div>
                    <div className="col-md-7">
                      <Chip
                        variant="ghost"
                        size="md"
                        value={OneMember?.isDeleted ===1 ? "Active" : OneMember?.isDeleted===2 ? "Suspended" : OneMember?.isDeleted===-1 ? "Dead" :  "Unknown"}
                        color={OneMember?.isDeleted ===1 ? "blue" : OneMember?.isDeleted===2 ? "purple" : OneMember?.isDeleted===-1 ? "red" : "grey"}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap w-full justify-between">
                    <div className="col-md-4">
                    <Typography variant="small" color="black" className="fw-bold">
                      Registered Date
                    </Typography>
                    </div>
                    <div className="col-md-7">
                    <Typography variant="small" color="black" className="font-normal">
                      {DateOnly(OneMember?.createdAt)}
                    </Typography>
                    </div>
                  </div>

                  <div className="flex flex-wrap w-full justify-between">
                    <div className="col-md-4">
                    <Typography variant="small" color="black" className="fw-bold">
                      Registerd By
                    </Typography>
                    </div>
                    <div className="col-md-7">
                    <Typography variant="small" color="black" className="font-normal">
                      {OneMember?.addedBy?.oda_username}, {OneMember?.addedBy?.first_name} {OneMember?.addedBy?.middle_names} {OneMember?.addedBy?.last_name}
                    </Typography>
                    </div>
                  </div>

                  <div className="flex flex-wrap w-full justify-between">
                    <div className="col-md-4">
                    <Typography variant="small" color="black" className="fw-bold">
                      Last Updated Date
                    </Typography>
                    </div>
                    <div className="col-md-7">
                    <Typography variant="small" color="black" className="font-normal">
                      {DateOnly(OneMember?.updatedAt)}
                    </Typography>
                    </div>
                  </div>

                  <div className="flex flex-wrap w-full justify-between">
                    <div className="col-md-4">
                    <Typography variant="small" color="black" className="fw-bold">
                      Last Updated By
                    </Typography>
                    </div>
                    <div className="col-md-7">
                    <Typography variant="small" color="black" className="font-normal">
                      {OneMember?.updatedBy?.oda_username}, {OneMember?.updatedBy?.first_name} {OneMember?.updatedBy?.middle_names} {OneMember?.updatedBy?.last_name}
                    </Typography>
                    </div>
                  </div>
              </CardBody>
              
              </DialogBody>
              <DialogFooter className="flex gap-4 space-x-2">
              <Button variant="text" color="black" onClick={handleOpen2}>
                  Close
              </Button>
              {Edit && (
                <Button type="submit" className="btn btn-primary fw-bold">
                  Save
                </Button>
              )}
              
              </DialogFooter>

              </form>

            </Dialog>
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
            <Typography color="gray" className="mt-3 fw-bold text-end me-3">
                Total Members : <span className="text-danger">{MembersFound ? MembersFound.toLocaleString() : 0}</span>
            </Typography>

          </CardHeader>
          <CardBody className="overflow-scroll px-0">
            <table className="mt-0 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {propData.TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-100 p-4 transition-colors hover:bg-blue-gray-50"
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
                      : "p-4 border-b border-blue-gray-100";
    
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
                                {documents?.oda_username}  
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                {documents?.category} {documents?.first_name} {documents?.middle_names} {documents?.last_name}
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
                              {documents?.contact}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {documents?.email}
                            </Typography>
                          </div>
                        </td>
                        {/* <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={online ? "online" : "offline"}
                              color={online ? "green" : "blue-gray"}
                            />
                          </div>
                        </td> */}
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {documents?.primaryMission?.code} {documents?.primaryMission?.name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {documents?.secondaryMission?.code} {documents?.secondaryMission?.name}
                          </Typography>
                        </td>
                        <td className={`${classes} flex gap-3`}>
                          <Tooltip content="View " >
                            <IconButton variant="text" color="blue" onClick={()=>{
                              setEdit(false)
                              setOneMember(documents);
                              handleOpen2()
                            }}>
                              <EyeIcon className="h-5 w-5" />
                            </IconButton>
                          </Tooltip>

                          <Tooltip content="Edit User">
                            <IconButton variant="text" color="pink" onClick={()=>{
                              setEdit(true)
                              setOneMember(documents);
                              handleOpen2()
                            }}>
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>

                          {
                            documents?.isDeleted !==2 && (
                              <Tooltip content="Suspend User">
                                <IconButton variant="text" color="purple" onClick={()=>{
                                  const fullname=documents?.first_name+' '+documents?.middle_names+' '+documents?.last_name
                                  deleteData(documents?.oda_username,fullname,true)
                                }}>
                                  <ArchiveBoxIcon className="h-5 w-5" />
                                </IconButton>
                              </Tooltip>
                            )
                          }

                          <Tooltip content="Delete User">
                            <IconButton variant="text" color="red" onClick={()=>{
                              const fullname=documents?.first_name+' '+documents?.middle_names+' '+documents?.last_name
                              deleteData(documents?.oda_username,fullname,false)
                            }}>
                              <TrashIcon className="h-5 w-5" />
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
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-100 p-4">
            <Typography variant="small" color="black" className="font-normal">
              Page {page.current} of {PageCount}
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" size="sm" onClick={()=>handlePageClick(-1)} disabled={page.current < 2 ? true : false}>
                Previous
              </Button>
              <Button variant="outlined" size="sm" onClick={()=>handlePageClick(+1)} disabled={page.current === PageCount ? true : PageCount < 1 ? true : isNaN(PageCount) ? true : false}>
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        </>
    )
}