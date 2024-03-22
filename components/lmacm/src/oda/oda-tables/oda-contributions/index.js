'use client'

import { deleteODAMissionContributionName, editODAMissionContributionName, editODAMissionProject, getODAMembers, getODAMissionContributionNames, getODAMissionContributionsDetails, getODAMissionProjects, getODAOfficialMembers, getOneODAMissionContributionName } from "@/app/api/v14/controllers/oda/route";
import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, ChevronUpDownIcon, EyeIcon, ArrowsPointingOutIcon, ArrowLongRightIcon, ArrowRightEndOnRectangleIcon, ArrowRightCircleIcon, ForwardIcon, PauseCircleIcon, LinkIcon, ArchiveBoxIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid";

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
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import toast, { ToastBar, Toaster} from 'react-hot-toast'
import React from 'react'
import pluralize from 'pluralize'
import { DateOnly } from "../../../../../utils";

export default function ODAProjectsTable({propData,session}) {

  const router=useRouter()

  const date=new Date()

  const Dialog_Table_Head=["Date","Amount","Added_By"]

  const page1=React.useRef(1)
  const page=React.useRef(1)
  const pageLimit=React.useRef(30)
  const pageLimit1=React.useRef(5)

  let toastId

  const [TABLE_ROWS, setTABLE_ROWS] = React.useState([]);
  const [MyContribution, setMyContribution] = React.useState([]);
  const [Data, setData] = React.useState({searchParams:'',status:'All',mission:'All',page:'',pageLimit:'',me:session?.user?.id});
  const [Data1, setData1] = React.useState({searchParams:session?.user?.id,project:'',page:'',pageLimit:pageLimit1.current});
  const [PageCount,setPageCount]=React.useState(0)
  const [ProjectsFound,setProjectsFound]=React.useState(0)
  const [OneContribution, setOneContribution] = React.useState();
  const [ContributionsFound,setContributionsFound]=React.useState('0')
  const [Dialog_TABLE_ROWS, setDialog_TABLE_ROWS] = React.useState([]);
  const [PageCount1,setPageCount1]=React.useState(0)
  const [Edit,setEdit]=React.useState(false)

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2((cur) => !cur);

  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1((cur) => !cur);


  React.useEffect(() => {
    Data.pageLimit=pageLimit.current
    Data.page=page.current
    toast.loading('Loading. Please wait...',{id:toastId})
    if (propData && propData.TABLE_ROWS && propData.TABLE_ROWS.data) {
      let pages=Math.ceil(propData.TABLE_ROWS?.data[0]?.pageCount / pageLimit.current)
      setProjectsFound(propData.TABLE_ROWS?.data[0]?.pageCount)
      setPageCount(pages)
      setTABLE_ROWS(propData.TABLE_ROWS?.data);
      setMyContribution(propData.TABLE_ROWS?.myContribution);
    }

    if (propData) {
      toast.dismiss(toastId)
    }
  }, [propData]);

  

  // console.log(TABLE_ROWS);
  const handlePageClick=(value)=>{
    page.current=page.current + value
    getODAContributions()
  }

  const returnTabs=()=>{

      return (
        <Tabs value="all" className="w-full md:w-max">
          <TabsHeader>
            {propData.TABS.map(({ label, value }) => (
              <Tab key={value} value={value} onClick={()=>{
                Data.status=value
                getODAContributions()
                }}>
                &nbsp;&nbsp;{label}&nbsp;&nbsp;
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
      )
  }

  const searchData=async(e)=> {

    const {value}=await e.target

    Data.searchParams=value

    getODAContributions()
    
  }

  const getODAContributions=async()=>{

    Data.page=page.current-1

    toastId=toast.loading('Loading. Please wait...',{id:toastId})
    let response

    response=await getODAMissionContributionNames(Data)

    let pages=Math.ceil(response.data?.data[0]?.pageCount / pageLimit.current)
    
    setPageCount(pages)
    setProjectsFound(response.data?.data[0]?.pageCount)

    toast.dismiss(toastId)

    // console.log(pages);

    setTABLE_ROWS(response.data?.data)
    setMyContribution(response.data?.myContribution)

  }

  const editContributionStatus=async(code,status)=>{

    let FormData={code,status,session:session?.user?.id}

    const answer=confirm(`Are you sure you want to change the status of this project? Project code: ${code}.`)

    if (!answer) {
      return
    }

    try {

      toastId=toast.loading('Loading. Please wait...',{id:toastId})

      let response=await editODAMissionContributionName(FormData,true)

      toast.dismiss(toastId)

      if (response.success) {

        toast.success('Successful!')
        getODAContributions()
      } else {
        toast.error(response.message)
      }
      
    } catch (error) {
      toast.error('Unknown Error occured')
      console.log(error);
    }

  }

  const returnTooltip=(code,value)=>{
    
    if (value===1) {

      return (
        <>
          <Tooltip content="Mark Completed">
            <IconButton variant="text" color="black" onClick={()=>{editContributionStatus(code,2)}}>
              <ArchiveBoxIcon className="h-5 w-5" />
            </IconButton>
          </Tooltip>

        </>
      )
      
    }
    
  }

  const handlePageClick1=(value)=>{
    page1.current=page1.current + value
    getODAContributionDetails()
  }

  const getODAContributionDetails=async()=>{

    Data1.page=page1.current-1

    toastId=toast.loading('Loading. Please wait...',{id:toastId})
    let response

    response=await getODAMissionContributionsDetails(Data1)

    // console.log(response);
  
    let pages=Math.ceil(response.data[0]?.pageCount / pageLimit1.current)
    
    setPageCount1(pages)
    setContributionsFound(response.data[0]?.pageCount)

    toast.dismiss(toastId)

    setDialog_TABLE_ROWS(response.data)
  }

  const editData=async(e)=> {
    e.preventDefault()
    

    if (!OneContribution.name || !OneContribution.description) {
      toast.error('All fields are required')
      return
    }

    let FormData={
      code:OneContribution?.code,
      name:OneContribution?.name,
      description:OneContribution?.description,
      mission:OneContribution?.mission?.code,
      session:session?.user.id
    }


    try {

      toastId=toast.loading('Loading. Please wait...',{id:toastId})

      let response=await editODAMissionContributionName(FormData)

      toast.dismiss(toastId)

      if (response.success) {

        toast.success('Successful!')
        getODAContributions()
        handleOpen2()
      } else {
        toast.error(response.message)
      }
      
    } catch (error) {
      toast.error('Unknown Error occured')
      console.log(error);
    }
    
  }

  const deleteData=async(code,name)=> {

    let FormData={
      code,
    }

    const answer=confirm(`Are you sure you want to delete this contribution: ${code} ${name}`)

    if (!answer) {
      return
    }

    try {

      toastId=toast.loading('Loading. Please wait...',{id:toastId})

      let response=await deleteODAMissionContributionName(FormData)

      toast.dismiss(toastId)

      if (response.success) {

        toast.success('Successful!')
        getODAContributions()
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
    setOneContribution({...OneContribution,[name]:value})

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
            <Dialog open={open1} handler={handleOpen1} className="shadow-none h-screen flex-col overflow-scroll" size="xm">
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

              <DialogHeader className="grid w-full gap-2">
              <Typography variant="h4" color="blue-gray" className="text-center">
                  Payment Details
              </Typography>
              <div className="flex w-full justify-between fw-bold flex-wrap">
                <Typography color={'red'} className="fw-bold">
                  {OneContribution?.code}
                </Typography>
                <Typography color={'green'} className="fw-bold">
                  {OneContribution?.name}
                </Typography>
              </div>
              </DialogHeader>
              <DialogBody divider >
              
              <Typography color={'black'} className="text-end">
                Contributed <span className="text-danger fw-bold">{ContributionsFound?.toLocaleString()}</span> time (s).
              </Typography>
              <CardBody className="flex w-full px-0">
                <table className="mt-0 w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {Dialog_Table_Head.map((head, index) => (
                        <th
                          key={head}
                          className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-100 p-3 transition-colors hover:bg-blue-gray-50"
                        >
                          <Typography
                            variant="small"
                            color="black"
                            className="flex items-center justify-between gap-2 fw-bold leading-none opacity-100"
                          >
                            {head}{" "}
                            {index !== Dialog_Table_Head.length - 1 && (
                              <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                            )}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Dialog_TABLE_ROWS?.map(
                      ({documents}, index) => {
                        const isLast = index === Dialog_TABLE_ROWS.length - 1;
                        const classes = isLast
                          ? "p-2"
                          : "p-2 border-b border-blue-gray-50";
        
                        return (
                          <tr key={index}>
                            <td className={classes}>
                              <div className="flex items-center gap-1">
                                {/* <Avatar src={img} alt={name} size="sm" /> */}
                                <div className="flex flex-col">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    {DateOnly(documents?.createdAt)}
                                  </Typography>
                                  
                                </div>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="flex flex-col gap-1">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {documents?.amount.toLocaleString()}
                                </Typography>
                                
                              </div>
                            </td>

                            <td className={`${classes} flex gap-1`}>
                              <Tooltip >
                                  <Typography  className="btn btn-default" onClick={()=>{toast(`${documents?.ODAMembers.first_name} ${documents?.ODAMembers.middle_names} ${documents?.ODAMembers.last_name}`)}}>
                                    {documents?.ODAMembers.oda_username}
                                  </Typography>
                              </Tooltip>

                            </td>
                          </tr>
                        );
                      },
                    )}
                  </tbody>
                </table>
              </CardBody>
              <CardFooter className="flex items-center w-full flex-wrap justify-between border-t border-blue-gray-50 p-2">
                <Typography variant="small" color="black" className="font-normal">
                  Page {page1.current} of {PageCount1}
                </Typography>
                <div className="flex gap-2">
                  <Button variant="outlined" size="sm" onClick={()=>handlePageClick1(-1)} disabled={page1.current < 2 ? true : false}>
                    Previous
                  </Button>
                  <Button variant="outlined" size="sm" onClick={()=>handlePageClick1(+1)} disabled={page1.current === PageCount1 ? true : PageCount1 < 1 ? true : isNaN(PageCount1) ? true : false}>
                    Next
                  </Button>
                </div>
              </CardFooter>
              
              </DialogBody>
              <DialogFooter className="space-x-2">
              <Button variant="text" color="black" onClick={handleOpen1}>
                  Close
              </Button>
              </DialogFooter>
            </Dialog>

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
                {Edit ? 'Edit':'All'} Contribution Details
              </Typography>
              <div className="flex w-full justify-between fw-bold flex-wrap">
                <Typography color={'red'} className="fw-bold">
                  {OneContribution?.code}
                </Typography>
                <Typography color={'green'} className="fw-bold">
                  {OneContribution?.name}
                </Typography>
              </div>
              </DialogHeader>
              <DialogBody divider >
              
              <CardBody className="flex-col w-full px-0">


                  <div className="flex flex-wrap w-full justify-between">
                    <div className="col-md-4">
                    <Typography variant="small" color="black" className="fw-bold">
                      Code
                    </Typography>
                    </div>
                    <div className="col-md-7">
                    <Typography variant="small" color="black" className="font-normal">
                      {OneContribution?.code}
                    </Typography>
                    </div>
                  </div>

                  <div className="flex flex-wrap w-full justify-between">
                    <div className="col-md-4">
                      <Typography variant="small" color="black" className="fw-bold">
                        Name
                      </Typography>
                    </div>
                    <div className="col-md-7">
                    <Typography variant="small" color="black" className="font-normal">
                      {Edit ? (
                        <Input className="form-control" name="name" required value={OneContribution?.name || ''} onChange={handleInputEdit}/>
                      ):(
                        <Typography variant="small" color="black" className="fw-normal">
                          {OneContribution?.name}
                        </Typography>
                      )}
                      
                    </Typography>
                    </div>
                  </div>

                  <div className="flex flex-wrap w-full justify-between">
                    <div className="col-md-4">
                    <Typography variant="small" color="black" className="fw-bold">
                      Description
                    </Typography>
                    </div>
                    <div className="col-md-7">
                      {Edit ? (
                        <Textarea className="form-control" name="description" required value={OneContribution?.description || ''} onChange={handleInputEdit}/>
                      ):(
                        <Typography variant="small" color="black" className="fw-normal">
                          {OneContribution?.description}
                        </Typography>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap w-full justify-between mt-1">
                    <div className="col-md-4">
                    <Typography variant="small" color="black" className="fw-bold">
                      Total Amount
                    </Typography>
                    </div>
                    <div className="col-md-7">
                    <Typography variant="small" color="black" className="font-normal">
                      {OneContribution?.amount.toLocaleString()}
                    </Typography>
                    </div>
                  </div>

                  <div className="flex flex-wrap w-full justify-between">
                    <div className="col-md-4">
                    <Typography variant="small" color="black" className="fw-bold">
                      Mission
                    </Typography>
                    </div>
                    <div className="col-md-7">
                    <Typography variant="small" color="black" className="font-normal">
                      {OneContribution?.mission?.code}, {OneContribution?.mission?.name}
                    </Typography>
                    </div>
                  </div>

                  <div className="flex flex-wrap w-full justify-between">
                    <div className="col-md-4">
                    <Typography variant="small" color="black" className="fw-bold">
                      Status
                    </Typography>
                    </div>
                    <div className="col-md-7">
                      <Chip
                        variant="ghost"
                        size="md"
                        value={OneContribution?.status===1 ? "Ongoing" : OneContribution?.status===2 ? "Completed" : "Unknown"}
                        color={OneContribution?.status===1 ? "green" : OneContribution?.status===2 ? "red" : "grey"}
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
                      {DateOnly(OneContribution?.createdAt)}
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
                      {OneContribution?.addedBy?.oda_username}, {OneContribution?.addedBy?.first_name} {OneContribution?.addedBy?.middle_names} {OneContribution?.addedBy?.last_name}
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
                      {DateOnly(OneContribution?.updatedAt)}
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
                      {OneContribution?.updatedBy?.oda_username}, {OneContribution?.updatedBy?.first_name} {OneContribution?.updatedBy?.middle_names} {OneContribution?.updatedBy?.last_name}
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
                
                <div className=" ">
                    <a className="btn btn-dark" size="sm" href="/lmacm/src/oda/contributions/new-contribution">
                      <span>New Contribution</span>
                       
                    </a>
                </div>
              
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              {returnTabs()}
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  onChange={searchData}
                  className="form-control w-full"
                />
              </div>
              
            </div>
            <Typography color="black" className="mt-3 fw-bold text-end me-3">
                Total Projects : <span className="text-danger">{ProjectsFound ? ProjectsFound.toLocaleString() : 0}</span>
            </Typography>

          </CardHeader>
          <CardBody className="overflow-scroll px-0">
            <table className="mt-0 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {propData.TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className="cursor-pointer  border-y border-blue-gray-100 bg-blue-gray-100 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                      <Typography
                        variant="small"
                        color="black"
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
                    const classes = isLast ? "p-4" :"p-4 border-b border-blue-gray-100 ";
    
                    return (
                      <tr key={index}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            {/* <Avatar src={img} alt={name} size="sm" /> */}
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="black"
                                className="font-normal"
                              >
                                {index + 1}
                              </Typography>
                              
                              
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            {/* <Avatar src={img} alt={name} size="sm" /> */}
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="black"
                                className="font-normal"
                              >
                                {documents?.code}
                              </Typography>
                              <Typography
                                variant="small"
                                color="black"
                                className="font-normal"
                              >
                                {documents?.name} 
                              </Typography>
                              
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="black"
                              className="font-normal"
                            >
                              {documents?.description}
                            </Typography>
                            
                          </div>
                        </td>

                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="black"
                              className="font-normal"
                            >
                              {documents?.amount?.toLocaleString()}
                            </Typography>
                            
                          </div>
                        </td>
                        
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="black"
                            className="font-normal"
                          >
                            {documents?.mission?.code} {documents?.mission?.name}
                          </Typography>
                          
                        </td>

                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="black"
                            className="font-normal"
                          >
                            {MyContribution[index]?.toLocaleString()} {MyContribution[index] > 0 && <>
                              <Tooltip content="View My Contributions" >
                                <IconButton variant="text" color="pink" onClick={()=>{
                                  Data1.project=documents?.code
                                  setOneContribution(documents);
                                  handleOpen1()
                                  getODAContributionDetails()
                                }}>
                                  <EyeIcon className="h-5 w-5" />
                                </IconButton>
                              </Tooltip>
                            </>}
                          </Typography>
                          
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={documents?.status===1 ? "Ongoing" : documents?.status===2 ? "Completed" : "Unknown"}
                              color={documents?.status===1 ? "green" : documents?.status===2 ? "red" : "grey"}
                            />
                          </div>
                        </td>
                        <td className={`${classes} flex gap-1`}>
                          <Tooltip content="View More">
                            <IconButton variant="text" color="blue" onClick={()=>{
                              setEdit(false)
                              Data1.project=documents?.code
                              setOneContribution(documents);
                              handleOpen2()
                            }}>
                              <EyeIcon className="h-5 w-5" />
                            </IconButton>
                          </Tooltip>

                          {
                            documents?.status !==2 && (
                              <Tooltip content="Edit Contribution">
                                <IconButton variant="text" color="purple" onClick={()=>{
                                  setEdit(true)
                                  Data1.project=documents?.code
                                  setOneContribution(documents);
                                  handleOpen2()
                                }}> 
                                  <PencilIcon className="h-5 w-5" />
                                </IconButton>
                              </Tooltip>
                            )
                          }
                          
                          {documents?.amount > 0 && returnTooltip(documents?.code,documents?.status)}
                      
                          <Tooltip content="View Payments">
                              <a href={`/lmacm/src/oda/contributions/available-contributions/payments?id=${documents?.code?.toLocaleLowerCase()}&level=${documents?.mission.code?.toLocaleLowerCase()}`}>
                                <IconButton variant="text" color="blue">
                                  <LinkIcon className="h-5 w-5" />
                                </IconButton>
                              </a>
                          </Tooltip>

                          {
                            !documents?.amount > 0 && (
                              <Tooltip content="Delete Contribution">
                                <IconButton variant="text" color="red" onClick={()=>{
                                  deleteData(documents?.code,documents?.name)
                                }}>
                                  <TrashIcon className="h-5 w-5" />
                                </IconButton>
                              </Tooltip>
                            )
                          }
                          
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