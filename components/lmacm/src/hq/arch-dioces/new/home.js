'use client'

import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Country } from "country-state-city";
import React from 'react'
import toast, { Toaster } from "react-hot-toast";
 
export default function NewArchDiocesHome() {

  let toastId

  const [missionRegisered, setmissionRegisered]=React.useState(true)
  const [formData, setformData] = React.useState({
    missionRegisered,
  });

  let countryData=Country.getAllCountries()


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });

  }


  return (
    
    <div className='col-md-12 flex justify-center'>
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
          New Arch Dioces
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter arch dioces details to register.
        </Typography>
        
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-6">

                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Arch Dioces Name
                </Typography>
                <Input
                  size="lg"
                  placeholder="Nairobi"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mb-2"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name='first_name'
                  required
                  onChange={handleInputChange}
                  minLength={3}
                  />


                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Choose Country
                </Typography>
                <select
                size="lg"
                className=" form-select !border-t-blue-gray-200 focus:!border-t-gray-900 mb-2"
                name='category'
                required
                onChange={handleInputChange}
                
                >
                    <option></option>
                    {
                        countryData?.map(({name},key)=>{
                            return  <option key={key} value={name}>{name}</option>
                        })
                    }
                </select>

              </div>

              <Button className="mt-6" fullWidth type='submit'>
                Register
              </Button>
              
            </form>
            
      </Card>
    </div>
     
  );
}