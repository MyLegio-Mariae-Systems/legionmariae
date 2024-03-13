'use client'

import { getArchDioces_Select } from "@/app/api/v14/controllers/arch-dioces/route";
import { getDioces_Select } from "@/app/api/v14/controllers/dioces/route";
import { getMission_Select } from "@/app/api/v14/controllers/mission/route";
import NewMissionODAMember from "@/app/api/v14/controllers/oda/route";
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

  const [missionRegistered, setmissionRegistered]=React.useState(true)
  const [isDeacon, setisDeacon]=React.useState(false)
  const [formData, setformData] = React.useState({missionRegistered:'true',middle_names:''});
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

  const newMember=async(e)=>{

    setSuccess(false)
    setError(false)

    e.preventDefault()

    try {
      toastId=toast.loading('Loading. Please wait...',{id:toastId})

      let response=await NewMissionODAMember(formData)

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
      <Card color="transparent" shadow={false} className='col-md-5 p-2'>
        <Typography variant="h2" color="blue" className='text-center m-3 fw-bold'>
          New Member
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter member's details to register.
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
        

        {
          !missionRegistered && (
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
          Registered in Mission?
        </Typography>
        <select
          size="lg"
          className=" form-select !border-t-blue-gray-200 focus:!border-t-gray-900 mb-2"
          onChange={(e)=>{setmissionRegistered(!missionRegistered); handleInputChange(e)}}
          name="missionRegistered"
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        

        {
          missionRegistered ? (

            <>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={newMember}>
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
                Member Username
              </Typography>
              <input
                size="lg"
                placeholder="M012345678"
                className="form-control !border-t-blue-gray-200 focus:!border-t-gray-900 mb-2"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                name='username'
                required
                onChange={handleInputChange}
                minLength={10}
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

          ):(
            <>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 " onSubmit={newMember}>
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
                  First Name
                </Typography>
                <input
                  size="lg"
                  placeholder="Simeo"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mb-2 form-control"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name='first_name'
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
                  Middle Names
                </Typography>
                <input
                  size="lg"
                  placeholder="Simeo"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mb-2 form-control"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name='middle_names'
                  onChange={handleInputChange}
                  minLength={3}
                  inputProps={{
                    autoComplete: "off",
                  }}
                />


                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Last Name
                </Typography>
                <input
                  size="lg"
                  placeholder="Hosea"
                  className="form-control !border-t-blue-gray-200 focus:!border-t-gray-900 mb-2"
                  name='last_name'
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  required
                  onChange={handleInputChange}
                  minLength={3}
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
                  Email Address
                </Typography>
                <input
                  type="email"
                  size="lg"
                  name='email'
                  placeholder="a working email address"
                  className="form-control !border-t-blue-gray-200 focus:!border-t-gray-900 mb-2"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  required={isDeacon}
                  onChange={handleInputChange}
                  minLength={11}
                />
                {
                  isDeacon && (
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
                  )
                }

                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Contact Number
                </Typography>

                <input
                  type="tel"
                  size="lg"
                  name='contact'
                  placeholder="0712345678"
                  className="form-control !border-t-blue-gray-200 focus:!border-t-gray-900 mb-2"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  required={isDeacon}
                  onChange={handleInputChange}
                  maxLength={10}
                />
                {
                  isDeacon && (
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
                  )
                }
                
               
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