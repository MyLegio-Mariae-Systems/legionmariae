'use client'

import { getArchDioces_Select } from "@/app/api/v14/controllers/arch-dioces/route";
import NewDioces from "@/app/api/v14/controllers/dioces/route";
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
 
export default function NewDiocesHome() {

  let toastId

  const [formData, setformData] = React.useState();
  const [ArchDioces, setArchDioces] = React.useState([]);
  const [responseMessage, setresponseMessage] = React.useState('');
  const [Error, setError] = React.useState(false);
  const [Success, setSuccess] = React.useState(false);

  let countryData=Country.getAllCountries()

  React.useEffect(()=>{

    getArchDioces()

  },[])


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
    setSuccess(false)
    setError(false)
  }

  const newDioces=async(e)=>{
    setSuccess(false)
    setError(false)

    e.preventDefault()

    try {
      toastId=toast.loading('Loading. Please wait...',{id:toastId})

      let response=await NewDioces(formData)

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

  const getArchDioces=async()=>{
    
    try {

      let response=await getArchDioces_Select()

      console.log(response);

      setArchDioces(response.data)
      
    } catch (error) {
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
      <Card color="transparent" shadow={false} className='col-md-5'>
        <Typography variant="h2" color="blue" className='text-center m-3 fw-bold'>
          New Dioces
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter dioces details to register.
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
        
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={newDioces}>
              <div className="mb-1 flex flex-col gap-6">

              <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Choose Arch Dioces
                </Typography>
                <select
                size="lg"
                className=" form-select !border-t-blue-gray-200 focus:!border-t-gray-900 mb-2"
                name='archDioces'
                required
                onChange={handleInputChange}
                >
                    <option></option>
                    {
                        ArchDioces?.map(({code,name,country},key)=>{
                          return  (
                          <option key={key} value={code} className='flex justify-between gap-5'>
                            {name} ({country})
                          </option>
                          )
                        })
                    }
                </select>

                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Dioces Name
                </Typography>
                <Input
                  size="lg"
                  placeholder="Nairobi"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mb-2"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name='name'
                  required
                  onChange={handleInputChange}
                  minLength={3}
                />


              </div>

              <Button className="mt-6" fullWidth type='submit'>
                Register
              </Button>
              
            </form>
            
      </Card>
    </div>
     
  );
}