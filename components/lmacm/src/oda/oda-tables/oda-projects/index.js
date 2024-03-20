'use client'

import { editODAMissionProject, getODAMembers, getODAMissionProjects, getODAOfficialMembers } from "@/app/api/v14/controllers/oda/route";
import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, ChevronUpDownIcon, EyeIcon, ArrowsPointingOutIcon, ArrowLongRightIcon, ArrowRightEndOnRectangleIcon, ArrowRightCircleIcon, ForwardIcon, PauseCircleIcon, LinkIcon, ArchiveBoxIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

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

export default function ODAProjectsTable({propData}) {

  const router=useRouter()

  const date=new Date()

  let toastId

  const [TABLE_ROWS, setTABLE_ROWS] = React.useState([]);
  const [Data, setData] = React.useState({searchParams:'',status:'All',mission:'All',page:'',pageLimit:''});
  const [PageCount,setPageCount]=React.useState(0)
  const [ProjectsFound,setProjectsFound]=React.useState(0)


  const page=React.useRef(1)
  const pageLimit=React.useRef(30)


  React.useEffect(() => {
    Data.pageLimit=pageLimit.current
    Data.page=page.current
    toast.loading('Loading. Please wait...',{id:toastId})
    if (propData && propData.TABLE_ROWS) {
      let pages=Math.ceil(propData.TABLE_ROWS[0]?.pageCount / pageLimit.current)
      setProjectsFound(propData.TABLE_ROWS[0]?.pageCount)
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
    getODAProjects()
  }

  const returnTabs=()=>{

    // if (propData.TITLE==='Available Members' || propData.TITLE==='Registered Members') {
      
      return (
        <Tabs value="all" className="w-full md:w-max">
          <TabsHeader>
            {propData.TABS.map(({ label, value }) => (
              <Tab key={value} value={value} onClick={()=>{
                Data.status=value
                getODAProjects()
                }}>
                &nbsp;&nbsp;{label}&nbsp;&nbsp;
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
      )
    // }
  }

  const searchData=async(e)=> {

    const {value}=await e.target

    Data.searchParams=value

    getODAProjects()
    
  }

  const getODAProjects=async()=>{

    // console.log(Data);

    Data.page=page.current-1

    toastId=toast.loading('Loading. Please wait...',{id:toastId})
    let response

    // if (propData.TITLE==='Official Members') {
    //   response=await getODAOfficialMembers(Data)
    // } else if (propData.TITLE==='Registered Members') {
      response=await getODAMissionProjects(Data)
    // }

    let pages=Math.ceil(response.data[0]?.pageCount / pageLimit.current)
    
    setPageCount(pages)
    setProjectsFound(response.data[0]?.pageCount)

    toast.dismiss(toastId)

    // console.log(pages);

    setTABLE_ROWS(response.data)

  }

  const editProjectStatus=async(code,status)=>{

    let FormData={code,status}

    const answer=confirm(`Are you sure you want to change the status of this project? Project code: ${code}.`)

    if (!answer) {
      return
    }

    try {

      toastId=toast.loading('Loading. Please wait...',{id:toastId})

      let response=await editODAMissionProject(FormData,true)

      toast.dismiss(toastId)

      if (response.success) {

        toast.success('Successful!')
        getODAProjects()
      } else {
        toast.error(response.message)
      }
      
    } catch (error) {
      toast.error('Unknown Error occured')
      console.log(error);
    }

  }

  const returnTooltip=(code,value)=>{
    
    if (value===1 || value===4) {

      return (
        <>
          <Tooltip content="Mark Ongoing" >
            <IconButton variant="text" color="green" onClick={()=>{editProjectStatus(code,2)}}>
              <ForwardIcon className="h-5 w-5" />
            </IconButton>
          </Tooltip>
        </>
      )
      
    } 
    else if (value===2) {

      return (
        <>
          <Tooltip content="Mark Completed">
            <IconButton variant="text" color="red" onClick={()=>{editProjectStatus(code,3)}}>
              <ArchiveBoxIcon className="h-5 w-5" />
            </IconButton>
          </Tooltip>

          <Tooltip content="Mark Pending">
            <IconButton variant="text" color="black" onClick={()=>{editProjectStatus(code,4)}}>
              <PauseCircleIcon className="h-5 w-5" />
            </IconButton>
          </Tooltip>
        </>
      )
      
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
                
                <div className=" ">
                    <a className="btn btn-dark" size="sm" href="/lmacm/src/oda/projects/new-projects">
                      <span>New Project</span>
                       
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
                />
              </div>
              
            </div>
            <Typography color="gray" className="mt-3 fw-bold text-end me-3">
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
                                {documents?.code}
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
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
                              color="blue-gray"
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
                              color="blue-gray"
                              className="font-normal"
                            >
                              {documents?.amount.toLocaleString()}
                            </Typography>
                            
                          </div>
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
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={documents?.status===1 ? "Future" : documents?.status===2 ? "Ongoing" : documents?.status===3 ? "Completed" : documents?.status===4 ? "Pending" : "Unknown"}
                              color={documents?.status===1 ? "purple" : documents?.status===2 ? "green" : documents?.status===3 ? "red" : documents?.status===3 ? "black" : "grey"}
                            />
                          </div>
                        </td>
                        <td className={`${classes} flex gap-1`}>
                          <Tooltip content="View More">
                            <IconButton variant="text" color="blue">
                              <EyeIcon className="h-5 w-5" />
                            </IconButton>
                          </Tooltip>

                          {
                            documents?.status !==3 && (
                              <Tooltip content="Edit Project">
                                <IconButton variant="text" color="purple">
                                  <PencilIcon className="h-5 w-5" />
                                </IconButton>
                              </Tooltip>
                            )
                          }
                          
                          {returnTooltip(documents?.code,documents?.status)}

                          {
                            documents?.status !==1 && (
                              <Tooltip content="View Contributions">
                                  <a href={`/lmacm/src/oda/projects/available-projects/contributions?id=${documents?.code.toLocaleLowerCase()}&level=${documents?.mission.code.toLocaleLowerCase()}`}>
                                    <IconButton variant="text" color="blue">
                                      <LinkIcon className="h-5 w-5" />
                                    </IconButton>
                                  </a>
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
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography variant="small" color="blue-gray" className="font-normal">
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