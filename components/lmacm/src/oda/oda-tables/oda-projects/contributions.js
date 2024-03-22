'use client'

import { editODAMissionProject, getODAMembers, getODAMissionProjects, getODAMissionProjectsContributions, getODAMissionProjectsContributionsDetails, getODAOfficialMembers, newODAMissionProjectContribution } from "@/app/api/v14/controllers/oda/route";
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
  Option,
  Select,
  Dialog,
  Alert,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import toast, { ToastBar, Toaster} from 'react-hot-toast'
import React from 'react'
import pluralize from 'pluralize'
import { DateOnly } from "../../../../../utils";

export default function ODAProjectsTable({propData, parameters}) {

  const router=useRouter()

  const date=new Date()

  let toastId

  const Dialog_Table_Head=["Date","Amount","Added_By"]

  const [TABLE_ROWS, setTABLE_ROWS] = React.useState([]);
  const [Dialog_TABLE_ROWS, setDialog_TABLE_ROWS] = React.useState([]);
  const [Data, setData] = React.useState({searchParams:'',project:parameters.id,page:'',pageLimit:''});
  const [Data1, setData1] = React.useState({searchParams:'',project:parameters.id,page:'',pageLimit:''});
  const [PageCount,setPageCount]=React.useState(0)
  const [PageCount1,setPageCount1]=React.useState(0)
  const [DeaconsAcolytes,setDeaconsAcolytes]=React.useState([])
  const [ContributionsFound,setContributionsFound]=React.useState(0)
  const [FormData,setFormData]=React.useState({code:parameters.id,mission:parameters.level})
  const [OneProject, setOneProject] = React.useState();
  const [OneContribution, setOneContribution] = React.useState();


  const page=React.useRef(1)
  const page1=React.useRef(1)
  const pageLimit=React.useRef(30)
  const pageLimit1=React.useRef(5)

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const handleOpen1 = () => setOpen1((cur) => !cur);

  React.useEffect(() => {
    Data.pageLimit=pageLimit.current
    Data.page=page.current
    Data1.pageLimit=pageLimit1.current
    Data1.page=page1.current
    toast.loading('Loading. Please wait...',{id:toastId})
    if (propData && propData.TABLE_ROWS) {
      let pages=Math.ceil(propData.TABLE_ROWS[0]?.pageCount / pageLimit.current)
      setPageCount(pages)
      setTABLE_ROWS(propData.TABLE_ROWS);
      setDeaconsAcolytes(propData.DeaconsAcolytes);
      setOneProject(propData.OneProject[0]);

    }

    if (propData) {
      toast.dismiss(toastId)
    }
  }, [propData]);

  

  // console.log(OneProject);
  const handlePageClick=(value)=>{
    page.current=page.current + value
    getODAProjectsContribution()
  }

  const handlePageClick1=(value)=>{
    page1.current=page1.current + value
    getODAProjectsContributionDetails()
  }

  const totalAmount=()=>{
    let total=0

    TABLE_ROWS?.map(({documents})=>{

      total +=documents.amount

    })

    return total
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });
  }

//   const newContribution=()=>{

//     console.log(FormData);
//     toast('Hi')
//     handleOpen()
//   }


  const searchData=async(e)=> {

    const {value}=await e.target

    Data.searchParams=value

    getODAProjectsContribution()
    
  }

  const getODAProjectsContribution=async()=>{

    Data.page=page.current-1

    toastId=toast.loading('Loading. Please wait...',{id:toastId})
    let response

    response=await getODAMissionProjectsContributions(Data)

    let pages=Math.ceil(response.data[0]?.pageCount / pageLimit.current)
    
    setPageCount(pages)
    toast.dismiss(toastId)

    setTABLE_ROWS(response.data)

  }

  const getODAProjectsContributionDetails=async()=>{

    Data1.page=page1.current-1

    toastId=toast.loading('Loading. Please wait...',{id:toastId})
    let response

    response=await getODAMissionProjectsContributionsDetails(Data1)
  
    let pages=Math.ceil(response.data[0]?.pageCount / pageLimit1.current)
    
    setPageCount1(pages)
    setContributionsFound(response.data[0]?.pageCount)

    toast.dismiss(toastId)

    setDialog_TABLE_ROWS(response.data)
  }

  const newContribution=async()=>{

    try {

      toastId=toast.loading('Loading. Please wait...',{id:toastId})

      let response=await newODAMissionProjectContribution(FormData)

      toast.dismiss(toastId)

      if (response.success) {

        toast.success('Successful!')
        getODAProjectsContribution()
        handleOpen()
      } else {
        toast.error(response.message)
      }
      
    } catch (error) {
      toast.error('Unknown Error occured')
      console.log(error);
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
                <CardBody className="flex flex-col  gap-1 overflow-auto">
                    <Typography variant="h5" color="blue" className='text-center'>
                    New Contribution
                    </Typography>
                    
                    <Typography
                    className="mb-2 fw-bold text-center"
                    color="black"
                    >
                    {OneProject?.name}
                    </Typography>
                    {/* <Alert color={openAlert.color} open={openAlert.open} onClose={() => setOpenAlert({open:false})}>
                    {openAlert.message}
                    </Alert> */}
                    <Typography className="-mb-2" variant="h6">
                    Member
                    </Typography>
                    <select label="member" className="form-select" size="lg" name='oda_username' onChange={handleInputChange}>
                        <option value={''}>Choose Member</option>
                        {
                          DeaconsAcolytes?.map(({oda_username,first_name,middle_names,last_name},key)=>{

                            return <option key={key} value={oda_username}>{oda_username} {first_name} {middle_names} {last_name}</option>

                          })
                        }
                        
                    </select>
                    <Typography className="-mb-2" variant="h6">
                    Amount
                    </Typography>
                    <Input label="Amount" size="lg" name='amount' onChange={handleInputChange}/>
                    
                </CardBody>
                <CardFooter className="pt-0">
                    <Button variant="gradient" onClick={newContribution} fullWidth>
                    Save
                    </Button>
                    
                </CardFooter>
                </Card>
            </Dialog>

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
                  Contribution Details
              </Typography>
              <div className="flex w-full justify-between fw-bold flex-wrap">
                <Typography color={'red'} className="fw-bold">
                  {OneContribution?.ODAMembers.oda_username}
                </Typography>
                <Typography color={'green'} className="fw-bold">
                  {OneContribution?.ODAMembers.first_name} {OneContribution?.ODAMembers.middle_names} {OneContribution?.ODAMembers.last_name}
                </Typography>
              </div>
              </DialogHeader>
              <DialogBody divider >
              
              <Typography color={'black'} className="text-end">
                Contributed <span className="text-danger fw-bold">{ContributionsFound.toLocaleString()}</span> times.
              </Typography>
              <CardBody className="flex w-full px-0">
                <table className="mt-0 w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {Dialog_Table_Head.map((head, index) => (
                        <th
                          key={head}
                          className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-3 transition-colors hover:bg-blue-gray-50"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
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
                                  {documents?.amount}
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
                <Typography variant="small" color="purple" className="font-normal">
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
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-8">
              <div>
                <Typography  className='text-3xl text-primary fw-bold'>
                  {OneProject?.name}
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about all {propData.TITLE.toLocaleLowerCase()}
                </Typography>
              </div>

              {
                OneProject?.status===2 && (
                  <div className="">
                      <Button className="flex items-center gap-1" size="sm" onClick={handleOpen}>
                        <PlusCircleIcon strokeWidth={2} className="h-4 w-4" /> New Contribution
                      </Button>
                  </div>
                )
              }
                
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="w-full md:w-72">
                <select
                  label="Search"
                  className="form-select"
                  onChange={searchData}
                >
                    <option value={''}>All Members</option>
                    {
                      OneProject && (
                        DeaconsAcolytes?.map(({oda_username,first_name,middle_names,last_name},key)=>{

                          return <option key={key} value={oda_username}>{oda_username} {first_name} {middle_names} {last_name}</option>

                        })
                      )
                    }
                </select>
              </div>
              
            </div>
            <Typography color="gray" className="mt-3 fw-bold text-end me-3">
                Total Contributions : <span className="text-danger">{totalAmount().toLocaleString()}</span>
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
                                {documents?.ODAMembers.oda_username} {documents?.ODAMembers.first_name} {documents?.ODAMembers.middle_names} {documents?.ODAMembers.last_name}
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
                              {documents?.amount}
                            </Typography>
                            
                          </div>
                        </td>

                        <td className={`${classes} flex gap-1`}>
                          <Tooltip content="View More">
                            <IconButton variant="text" color="blue" onClick={()=>{
                              Data1.searchParams=documents?.ODAMembers.oda_username
                              setOneContribution(documents);
                              handleOpen1()
                              getODAProjectsContributionDetails()
                            }}>
                              <EyeIcon className="h-5 w-5" />
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
              <Button variant="outlined" size="sm" onClick={()=>handlePageClick(+1)} disabled={page.current === PageCount ? true : PageCount < 1 ? true : isNaN(PageCount) ? true : false}>
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        </>
    )
}