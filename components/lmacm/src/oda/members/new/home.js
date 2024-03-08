'use client'

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import React from 'react'
import toast, { Toaster } from "react-hot-toast";
 
export default function ODANewMemberHome() {

  let toastId

  const [missionRegisered, setmissionRegisered]=React.useState(true)
  const [isDeacon, setisDeacon]=React.useState(false)
  const [formData, setformData] = React.useState({
    missionRegisered,
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });

    if (name==='category') {

      if (value==='Deacon') {
        setisDeacon(true)
      } else {
        setisDeacon(false)
      }

      
    }

  }

  const validate=async()=>{

    if(
      !formData.first_name || 
      !formData.first_contact || 
      !formData.last_name ||
      !formData.email
      )
    {
      toast.error('Please fill in all required fields')

      return false
    }

    if(
        !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ){
        toast.error('Please enter a valid email address')
        return false
      }

      if(isNaN(formData?.first_contact) || formData?.first_contact.length !==10){
        toast.error('Please enter a valid contact number')
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
          New Member
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter member's details to register.
        </Typography>
        

        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Arch Dioces
        </Typography>
        <select
          size="lg"
          className=" form-select !border-t-blue-gray-200 focus:!border-t-gray-900 mb-2"
          onChange={handleInputChange}
          name='arch_dioces'
          
        >
          <option></option>
          <option>Nairobi</option>
          <option>Kisumu</option>
        </select>

        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Dioces
        </Typography>
        <select
          size="lg"
          className=" form-select !border-t-blue-gray-200 focus:!border-t-gray-900 mb-2"
          onChange={handleInputChange}
          name='dioces'
          
        >
          <option></option>
          <option>Nairobi</option>
          <option>Thika</option>
        </select>

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
          <option>St. Teresa Kariobangi</option>
          <option>St. Gabriel Babadogo</option>
        </select>
        <hr />
        

        {
          !missionRegisered && (
            isDeacon && (
            <div className="flex w-full flex-col gap-2 mb-2 ">
              <Alert  icon={<IconOutlined />}>
                <Typography className="font-medium">
                  Kindly provide a working email address, for it will be used for verification.
                </Typography>
              </Alert>
            </div>
          )
          )
        }

        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Mission Registered?
        </Typography>
        <select
          size="lg"
          className=" form-select !border-t-blue-gray-200 focus:!border-t-gray-900 mb-2"
          onChange={()=>setmissionRegisered(!missionRegisered)}
          
        >
          <option>Yes</option>
          <option>No</option>
        </select>

        {
          missionRegisered ? (

            <>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-6">

              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Choose Category
              </Typography>
              <select
                size="lg"
                className=" form-select !border-t-blue-gray-200 focus:!border-t-gray-900 mb-2"
                name='category'
                required
                onChange={handleInputChange}
                
              >
                <option></option>
                <option>Deacon</option>
                <option>Acolyte</option>
              </select>

                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Member Username
                </Typography>
                <Input
                  size="lg"
                  placeholder="M012345678"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mb-2"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name='username'
                  required
                  onChange={handleInputChange}
                  minLength={10}
                />
                
              </div>

              <Button className="mt-6" fullWidth type='submit'>
                Register
              </Button>
            
            </form>
            </>

          ):(
            <>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-6">

              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Choose Category
              </Typography>
              <select
                size="lg"
                className=" form-select !border-t-blue-gray-200 focus:!border-t-gray-900 mb-2"
                name='category'
                required
                onChange={handleInputChange}
                
              >
                <option></option>
                <option>Deacon</option>
                <option>Acolyte</option>
              </select>

                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  First Name
                </Typography>
                <Input
                  size="lg"
                  placeholder="name@mail.com"
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
                  Last Name
                </Typography>
                <Input
                  size="lg"
                  placeholder="name@mail.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mb-2"
                  name='last_name'
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  required
                  onChange={handleInputChange}
                  minLength={3}
                />


                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Email Address
                </Typography>
                <Input
                  type="email"
                  size="lg"
                  name='email'
                  placeholder="a working email address"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mb-2"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  required={isDeacon}
                  onChange={handleInputChange}
                  minLength={11}
                />

                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Contact Number
                </Typography>

                <Input
                  type="tel"
                  size="lg"
                  name='first_contact'
                  placeholder="0712345678"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mb-2"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  required={isDeacon}
                  onChange={handleInputChange}
                  minLength={10}
                />
               
              </div>

              <Checkbox
                label={
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal"

                  >
                    Member agrees with the
                    <a
                      href="#"
                      className="font-medium transition-colors hover:text-gray-900 "
                    >
                      &nbsp;Terms and Conditions
                    </a>
                  </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
                required
              />
              <Button className="mt-6" fullWidth type='submit'>
                Register
              </Button>
              
            </form>
            </>
          )
        }

        
        
      </Card>
    </div>
     
  );
}