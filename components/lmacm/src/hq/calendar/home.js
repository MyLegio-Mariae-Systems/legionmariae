'use client'

import NewArchDioces from "@/app/api/v14/controllers/arch-dioces/route";
import setCalendar, { getCalendar } from "@/app/api/v14/controllers/hq/route";
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
import Chart from "react-apexcharts";
import _ from 'lodash';
 
export default function LiturgicalCalendarHome() {

  let minDate=new Date().toISOString().split('T')[0]
  const year=new Date().getFullYear()

  let toastId

  const [FormData, setFormData] = React.useState();
  const [responseMessage, setresponseMessage] = React.useState('');
  const [Error, setError] = React.useState(false);
  const [Success, setSuccess] = React.useState(false);
  const [Years,setYears]=React.useState([])
  const [Downloads,setDownloads]=React.useState([])
  const [Year,setYear]=React.useState(year)

  React.useEffect(()=>{
    getDownloads()
  })

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

  async function listYears(ashWednesdayDates) {
        
    const firstAshWednesdayDate = _.first(ashWednesdayDates)
    const lastAshWednesdayDate = _.last(ashWednesdayDates)

    const currentYear = new Date(firstAshWednesdayDate).getFullYear();
    const endYear = new Date(lastAshWednesdayDate).getFullYear();
    // const endYear = 10099


    // Generate an array of years from current year to end year
    const years = Array.from({ length: endYear - currentYear + 1 }, (_, index) => currentYear + index);
    setYears(years)
    // return years;
  }

  async function getDownloads() {
      
      const response=await getCalendar()

      if (response && response.length>0) {
          setDownloads(response[0]?.downloads)
          listYears(response[0]?.ashWednesday)
      }

  }
  
  const options={
    chart:{
      id:'calendar-downloads-charts'
    },
    xaxis:{
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    }
  }

  const series=[
    {
      name:'Calendar Downloads',
      data:[30,40,35,50,49,60,70,91,125,78,37,55]
    }
  ]

  const chartConfig = {
    series: [
      {
        name: "Sales",
        data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
      },
    ],
    chart: {
      type: "line",
      height: 240,
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#020617"],
    stroke: {
      lineCap: "round",
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
  };


  return (
    
    <div className='col-md-12 flex flex-col justify-center bg-white'>
    <div className='col-md-12 flex justify-center bg-white mb-3'>
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
        <Typography variant="h1" color="blue" className='text-center m-3 fw-bold'>
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

            <Button className="mt-6 flex justify-center gap-3" fullWidth type='submit'>
            <PlusIcon strokeWidth={2} className="h-4 w-4 fw-bold" /> Add Ash Wednesday
            </Button>
            
        </form>
            
      </Card>
      

    </div>
    {/* <div className='col-md-12 flex flex-wrap gap-5 justify-center bg-white mb-3 overflow-auto w-full'>

      <Chart options={options} series={series} type="bar" width={'550'} height={'320'} />
      <Chart options={options} series={series} type="line" width={'550'} height={'320'}/>
      <Chart options={options} series={series} type="area" width={'550'} height={'320'}/>
      <Chart options={options} series={series} type="scatter" width={'550'} height={'320'}/>
      <Chart options={options} series={series} type="bubble" width={'550'} height={'320'}/>
      <Chart options={options} series={series} type="heatmap" width={'550'} height={'320'}/>
    </div> */}

    <div className="w-full flex flex-col justify-center mb-5 px-5">
      <Typography color="dark" className='text-start m-1 fw-bold'>
        Choose Year
      </Typography>
      <select className="form-select col-md-6">
        {
          Years?.map((year)=>{
              return (
                <option value={year}>{year}</option>
              )
          })
        }
      </select>
    </div>

    <div className="w-full flex justify-center mb-5 px-5">
      <Typography variant="h2" color="purple" className='text-center m-1 fw-bold'>
        {Year} Calendar Downloads Dashboard
      </Typography>
    </div>

    <div className='col-md-12 flex flex-wrap gap-5 bg-white mb-3 overflow-auto w-full ms-2 me-2'>
      <Chart options={options} series={series} type="bar" width={'400'} height={'320'} />
      <Chart options={options} series={series} type="line" width={'400'}  height={'320'}/>
      <Chart options={options} series={series} type="area" width={'400'}  height={'320'}/>
    </div>

    </div>
     
  );
}