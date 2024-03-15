'use client'

import NewArchDioces from "@/app/api/v14/controllers/arch-dioces/route";
import setCalendar from "@/app/api/v14/controllers/hq/route";
import { PlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Input,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { Country } from "country-state-city";
import React from 'react'
import toast, { Toaster } from "react-hot-toast";
 
export default function LiturgicalCalendarHome() {

  let minDate=new Date().toISOString().split('T')[0]

  let toastId

  const [FormData, setFormData] = React.useState();
  const [responseMessage, setresponseMessage] = React.useState('');
  const [Error, setError] = React.useState(false);
  const [Success, setSuccess] = React.useState(false);

  let countryData=Country.getAllCountries()


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });
    setSuccess(false)
    setError(false)
  }

  const addAshWednesday=async(e)=>{
    setSuccess(false)
    setError(false)

    e.preventDefault()

    if (!FormData?.date) {
      setresponseMessage('Date is required')
      toast.error('Date is required')
      setError(true)
      return
    }

    try {

      toastId=toast.loading('Loading. Please wait...',{id:toastId})

      let response=await setCalendar(FormData,1)

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
      <Card color="transparent" shadow={false} className='col-md-5 p-1'>
        <Typography variant="h2" color="blue" className='text-center m-3 fw-bold'>
          Liturgical Calendar
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

        
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={addAshWednesday}>
            <div className="mb-1 flex flex-col gap-6">

            <Typography variant="h6" color="blue-gray" className="-mb-3">
                Ash Wednesday Date
            </Typography>
            <Input
                size="lg"
                type='date'
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mb-2"
                labelProps={{
                className: "before:content-none after:content-none",
                }}
                name='date'
                required
                onChange={handleInputChange}
                min={minDate}
            />

            </div>

            <Button className="mt-6" fullWidth type='submit'>
            <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Ash Wednesday
            </Button>
            
        </form>
            
      </Card>
    </div>
     
  );
}