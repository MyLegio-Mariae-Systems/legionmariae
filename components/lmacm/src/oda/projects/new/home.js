'use client'

import { getArchDioces_Select } from "@/app/api/v14/controllers/arch-dioces/route";
import { getDioces_Select } from "@/app/api/v14/controllers/dioces/route";
import { getMission_Select } from "@/app/api/v14/controllers/mission/route";
import { newODAMissionProject } from "@/app/api/v14/controllers/oda/route";
import {
  Card,
  Button,
  Typography,
  Alert,
  Textarea,
} from "@material-tailwind/react";
import React from 'react'
import toast, { Toaster } from "react-hot-toast";
 
export default function ODANewProjectHome() {

  let toastId

  const [FormData, setFormData] = React.useState();
  const [ArchDioces, setArchDioces] = React.useState([]);
  const [Dioces, setDioces] = React.useState([]);
  const [Mission, setMission] = React.useState([]);
  const [responseMessage, setresponseMessage] = React.useState('');
  const [Error, setError] = React.useState(false);
  const [Success, setSuccess] = React.useState(false);

  React.useEffect(()=>{
    getArchDioces()
  },[])


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });

  }

  const validate=async()=>{

    if(
      !FormData.name || 
      !FormData.description || 
      !FormData.mission
      )
    {
      toast.error('Please fill in all required fields')
      return false
    }

    return true
  }

  function IconOutlined() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        />
      </svg>
    );
  }

  const getArchDioces=async()=>{
    
    try {

      let response=await getArchDioces_Select()

      setArchDioces(response.data)
      
    } catch (error) {
      console.log(error);
    }
  }

  const getDioces=async(e)=>{

    const { value } =await e.target;
    
    try {

      let response=await getDioces_Select(value)

      setDioces(response.data)
      
    } catch (error) {
      console.log(error);
    }
  }

  const getMission=async(e)=>{

    const { value } =await e.target;
    
    try {

      let response=await getMission_Select(value)

      setMission(response.data)
      
    } catch (error) {
      console.log(error);
    }
  }

  const newProject=async(e)=>{

    setSuccess(false)
    setError(false)

    e.preventDefault()

    let valid=await validate()


    try {

      if (valid) {
        toastId=toast.loading('Loading. Please wait...',{id:toastId})

        let response=await newODAMissionProject(FormData)

        toast.dismiss(toastId)

        if (response.success) {

          setresponseMessage('Successful!')
          toast.success('Successful!')
          setSuccess(true)
          setError(false)

          
        } else {
          setresponseMessage(response.message)
          toast.error(response.message)
          setError(true)
          setSuccess(false)
          
        }
      }
      
      
    } catch (error) {
      setresponseMessage('Unknown Error occured', error.message)
      toast.error('Unknown Error occured')
      setError(true)
      setSuccess(false)
      console.log(error);
    }

  }


  return (
    
    <div className='col-md-12 flex justify-center bg-white'>
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
      <Card color="transparent" shadow={false} className='col-md-5 p-2'>
        <Typography variant="h2" color="blue" className='text-center m-3 fw-bold'>
          New Project
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter project&apos;s details to register.
        </Typography>

        {
          Success && (
            <Alert color='green' className='mb-2'>{responseMessage}</Alert>
          )
        }

        {
          Error && (
            <Alert color='red' className='mb-2'>{responseMessage}</Alert>
          )
        }
        

        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Arch Dioces
        </Typography>
        <select
          size="lg"
          className=" form-select !border-t-blue-gray-200 focus:!border-t-gray-900 mb-2"
          onChange={getDioces}
        >
          <option></option>
          {
            ArchDioces?.map(({code,name,country},key)=>{
              return  (
              <option key={key} value={code}>{name} ({country})</option>
              )
            })
          }
        </select>
        <Typography
        variant="small"
        color="gray"
        className=" flex items-center gap-1 font-normal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="-mt-px h-4 w-4 text-danger"

          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>
          This field is required
        </Typography>

        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Dioces
        </Typography>
        <select
          size="lg"
          className=" form-select !border-t-blue-gray-200 focus:!border-t-gray-900 mb-2"
          onChange={getMission}
        >
          <option></option>
          {
            Dioces?.map(({code,name},key)=>{
              return  (
              <option key={key} value={code}>{name}</option>
              )
            })
          }
        </select>
        <Typography
        variant="small"
        color="gray"
        className=" flex items-center gap-1 font-normal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="-mt-px h-4 w-4 text-danger"

          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>
          This field is required
        </Typography>

        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Mission
        </Typography>
        <select
          size="lg"
          className=" form-select !border-t-blue-gray-200 focus:!border-t-gray-900 mb-2"
          onChange={handleInputChange}
          name='mission'
        >
          <option></option>
          {
            Mission?.map(({code,name},key)=>{
              return  (
              <option key={key} value={code}>{name}</option>
              )
            })
          }
        </select>
        <Typography
        variant="small"
        color="gray"
        className=" flex items-center gap-1 font-normal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="-mt-px h-4 w-4 text-danger"

          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>
          This field is required
        </Typography>
        <hr />

        <>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 " onSubmit={newProject}>
          <div className="mb-1 flex flex-col gap-6">

          
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Project Name
            </Typography>
            <input
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mb-2 form-control"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name='name'
              required
              onChange={handleInputChange}
              minLength={3}
              inputProps={{
                autoComplete: "off",
              }}
            />
            <Typography
            variant="small"
            color="gray"
            className=" flex items-center gap-1 font-normal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="-mt-px h-4 w-4 text-danger"

              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
              This field is required
            </Typography>

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Description
            </Typography>
            <Textarea
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mb-2 form-control"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name='description'
              onChange={handleInputChange}
              required
              minLength={3}
              inputProps={{
                autoComplete: "off",
              }}
            />
            <Typography
            variant="small"
            color="gray"
            className=" flex items-center gap-1 font-normal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="-mt-px h-4 w-4 text-danger"

              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
              This field is required
            </Typography>
            
            
            
          </div>

          
          <Button className="mt-6" fullWidth type='submit'>
            Register
          </Button>
          
        </form>
        </>
          

        
        
      </Card>
    </div>
     
  );
}