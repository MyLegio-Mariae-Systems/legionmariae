'use client'
import { Button, Card, CardBody, CardHeader, Input, Typography } from "@material-tailwind/react";
import { ArrowDownTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";
import { addDays, eachDayOfInterval, format, getDate, isSunday, startOfWeek, subDays } from "date-fns";
import fixedDates, { fixedSundayFeasts } from "./data";
import moment  from 'moment';
import _ from 'lodash';
import handleDownload from "../../../../src/app/api/v14/utills";
import downloadDivContent from "../download/calendar";
import { usePathname } from "next/navigation";
import NavbarB4Login from "../../header/headerB4Login";
import { PlusIcon } from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";
import { Today } from "../../../utils";
import setCalendar, { getCalendar } from "@/app/api/v14/controllers/hq/route";
 
export default function LiturgicalCalenderPage({pathname, session}) {

    const year=new Date().getFullYear()
    const pathName = pathname+''+usePathname()

    let toastId

    const [Year,setYear]=React.useState(year)
    const [Years,setYears]=React.useState([])
    const [Downloads,setDownloads]=React.useState(0)
    const [TABLE_ROWS, setTABLE_ROWS]=React.useState([])

    const TABLE_HEAD = ["NAME", "DAY", "FEAST/EVENT", "COMMEMORATION", "COLOUR"];
    // const TABLE_ROWS = AshWenesday(Year)
 
    React.useEffect(()=>{
        getTables(year)
        listYears()
        getDownloads()
    },[])

    
    const getTables=async(value)=>{
        const table_ROWS =await AshWenesday(value)
        setTABLE_ROWS(table_ROWS)
    }

    const renderRows=(details)=>{

        const classes = "p-1 border ";

        return (
            <>
            {
                details.map(({ date,feast,saint,color }, index) => {

                    const today = new Date(date)
                    const dayName = format(today, 'EEEE')
                    const dateOfMonth = getDate(today)

                    if (feast !=='' || saint !=='') {
                        
                        return (
                        <tr key={index + 1}>
                            <td className={classes}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {dayName}
                            </Typography>
                            </td>
                            <td className={classes}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {dateOfMonth}
                            </Typography>
                            </td>
                            <td className={`${classes} bg-blue-gray-50/50`}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {feast}
                            </Typography>
                            </td>
                            <td className={classes}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {saint}
                            </Typography>
                            </td>

                            <td className={`${classes} bg-blue-gray-50/50`}>
                            <Typography variant="small" color="blue-gray" className="font-medium">
                                {color}
                            </Typography>
                            </td>
                        </tr>
                        );
                    }
                    
                })
            }

            </>
            
        )

    }

    const searchYear=(e)=>{

        const {value}=e.target
        setYear(value)
        getTables(value)

    }

    async function listYears() {
        
        const {ashWednesdayDates}=await fixedSundayFeasts()
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

    async function downloadCalender() {

        let date= Today()

        if (parseInt(Year) !== parseInt(year)) {
            toast.error(`You can only download ${year} Liturgical Calendar`)
            return
        }

        try {

            toastId=toast.loading('Loading. Please wait...',{id:toastId})

            let response=await setCalendar(date.fullDate,2)
            toast.dismiss(toastId)

            if (response.success) {

                await downloadDivContent(Year, TABLE_HEAD, TABLE_ROWS, 'liturgical_calendar', `${Year}_Liturgical_Calendar.pdf`, pathName);
                toast.success('Download Successful!')
                getDownloads()
                
            } else {
                toast.error(response.message)
                console.log(response.message);
            }
            
        } catch (error) {
            console.log(error);
            toast.error('Client error occured')
        }
    }

    async function getDownloads() {
        
        const response=await getCalendar()

        if (response && response.length>0) {
            setDownloads(response[0]?.downloads.length)
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
    <NavbarB4Login session={session} />
    <Card className="h-full w-full overflow-scroll">

    <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="col-md-12 mb-4 gap-2 md:flex-row md:items-center">
          <div className="col-md-12 flex flex-wrap w-full">
            <div className="col-md-7">
                <Typography variant="h4" color="black ">
                {Year} Liturgical Calender
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                You can search for liturgical calender of any year.
                </Typography>
            </div>
            <div className="col-md-4 flex gap-2">
                
                <Typography color="red" className="fw-bold">
                    {Downloads.toLocaleString()}
                </Typography>
                <Typography color="gray" className="font-normal">
                    Downloads in <span className='text-primary fw-bold'>{Year}</span>
                </Typography>
            </div>
            
          </div>
          
          <div className="col-md-12 flex w-full flex-wrap shrink-0 gap-3 md:w-max ">
            <div className="col-md-9 w-full md:w-72">
            
              <select
                    onChange={searchYear}
                    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                    <option value={Year} key={Year}>{Year}</option>
                    {
                        Years?.map((year,index)=>{
                            return (
                                <option key={index + 1} value={year}>{year}</option>

                            )
                        })
                    }
                    
                </select>
            </div>
            <div className='col-md-2'>
            <Button className="flex items-center gap-3" size="sm" onClick={downloadCalender}>
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
            </Button>
            </div>
            
            
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll p-1" id="liturgical_calendar">
        
        <div className='text-center text-dark'>
            <Typography variant="h3" className="text-danger ">
                LEGION MARIA OF AFRICAN CHURCH MISSION
            </Typography>
            <Typography variant="h4" color="black ">
              {Year} LITURGICAL CALENDAR
            </Typography>
        </div>
        <table className="w-full min-w-max table-auto text-left">
            <thead>
            <tr>
                {TABLE_HEAD?.map((head, index) => (
                <th key={index + 1} className="border bg-primary p-2">
                    <Typography
                    variant="large"
                    color="white"
                    className="font-bold m-2 text-center"
                    >
                    {head}
                    </Typography>
                </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {TABLE_ROWS?.map(({ month, details }, index) => {
                
                return (
                    <>
                    <tr key={index + 1}>
                        <td colSpan={5} className={'p-1 border'}>
                            <Typography variant="large" color="black" className="font-bold text-center text-xl m-1 ms-2">
                                {month}
                            </Typography>
                        </td>
                    </tr>

                    {renderRows(details)}
                    </>
                )
                
                
            })}
            </tbody>
        </table>
    </CardBody>
      
    </Card>
    </>
    
  );
}

// function getSundays(year) {
//     const sundays = [];
//     const date = moment(`${year}-01-01`); // Start from January 1st of the given year
//     const endOfYear = moment(`${year}-12-31`); // End at December 31st of the given year

//     while (date.day(7).isBefore(endOfYear)) { // Increment by 7 days (a week) until reaching the end of the year
//         sundays.push(date.format('YYYY-MM-DD')); // Push the formatted date (YYYY-MM-DD) to the array
//     }

//     return sundays;
// }

function getPreviousSundays(dateString, numberOfSundays) {
    const currentDate = new Date(dateString);

    const sundays = [];

    // Check if the current date is a Sunday
    let date = currentDate;
    if (!isSunday(date)) {
    date = startOfWeek(date);
    }

    while (sundays.length < numberOfSundays) {
        sundays.push(date);
        date = subDays(date, 7);
    }

    const formattedSundays = []

    sundays.forEach((sunday, index) => {
        formattedSundays.push(format(sunday, 'yyyy-MM-dd'))
    });

    return formattedSundays;
}

async function getAfterSundays(dateString, numberOfSundays) {
    const date = new Date(dateString);

    let sundays = [];

    // Check if the current date is a Sunday
    let currentDate = startOfWeek(date);
    while (sundays.length < 2) {
        sundays.push(currentDate);
        // Move to the next week
        currentDate = addDays(currentDate, 7);
    }

    currentDate = startOfWeek(sundays[1]);
    sundays=[]
    while (sundays.length < numberOfSundays) {
        sundays.push(currentDate);
        // Move to the next week
        currentDate = addDays(currentDate, 7);
    }

    const formattedSundays = []

    sundays.forEach((sunday, index) => {
        formattedSundays.push(format(sunday, 'yyyy-MM-dd'))
    });

    const ArrayData = [];

    const {data3}=await fixedSundayFeasts()

    formattedSundays.forEach((item1,key) => {
        
        ArrayData.push({
            date: item1,
            feast: data3[key].feast,
            saint: ``,
            color: data3[key].color,
        });
        
    });


    return ArrayData;
}

function getPreviousDays(dateString, numberOfDays, num) {

    let dateArray=[]
    let currentDate=dateString

    while (dateArray.length < numberOfDays) {
        // Move to the next week
        currentDate = subDays(currentDate, num);
        dateArray.push(currentDate);

    }

    const formattedDays = []

    dateArray.forEach((sunday, index) => {
        formattedDays.push(format(sunday, 'yyyy-MM-dd'))
    });

    return formattedDays
}

function getAfterDays(dateString, numberOfDays, num) {

    let dateArray=[]
    let currentDate=dateString

    while (dateArray.length < numberOfDays) {
        // Move to the next week
        currentDate = subDays(currentDate, num);
        dateArray.push(currentDate);
    }

    const formattedDays = []

    dateArray.forEach((sunday, index) => {
        formattedDays.push(format(sunday, 'yyyy-MM-dd'))
    });

    return formattedDays
}

function getDatesBetweenExcluding(startDate, endDate, excludedDates) {
    // Get an array of dates between the start and end dates
    const dates = eachDayOfInterval({ start: startDate, end: endDate });

    // Filter out the excluded dates
    const filteredDates = dates.filter(date => !excludedDates.includes(format(date, 'yyyy-MM-dd')));

    // Format the filtered dates as strings
    const formattedDates = filteredDates.map(date => format(date, 'yyyy-MM-dd'));

    return formattedDates;
}

async function getSundaysBetweenExcluding(startDate,endDate){

    const StartDate = new Date(startDate);
    const EndDate = new Date(endDate);

    // Get all dates between startDate and endDate
    const allDates = eachDayOfInterval({ start: EndDate, end: StartDate });

    // Filter out Sundays
    const sundays = allDates.filter(date => isSunday(date));

    const firstArray = sundays.slice(0, sundays.length - 3);
    const secondArray = sundays.slice(-3);

    const formattedFirstArray = firstArray.map(date => format(date, 'yyyy-MM-dd'));
    const formattedSecondArray = secondArray.map(date => format(date, 'yyyy-MM-dd'));

    const ArrayData = [];

    const {data1,data2}=await fixedSundayFeasts()

    formattedFirstArray.forEach((item1,key) => {
        
        ArrayData.push({
            date: item1,
            feast: data1[key].feast,
            saint: ``,
            color: data1[key].color,
        });
        
    });

    
    formattedSecondArray.forEach((item1,key) => {
        
        ArrayData.push({
            date: item1,
            feast: data2[key].feast,
            saint: ``,
            color: data2[key].color,
        });
        
    });

    return ArrayData
}

export async function AshWenesday(year) {

    const {data4, ashWednesdayDates}=await fixedSundayFeasts()

    // console.log(ashWednesdayDates,data4);

    const ashWenesdayDate =  ashWednesdayDates?.filter(date => date.startsWith(`${year}-`));

    const ashWednesdayObject={
        date:ashWenesdayDate[0],
        feast:'Ash Wenesday.\n',
        color:'Purple',
    }

    const previousSundays = await getSundaysBetweenExcluding(ashWenesdayDate[0],`${year}-01-06`);
    const afterSundays = await getAfterSundays(ashWenesdayDate, 7);
    let holyWeek= getPreviousDays(afterSundays[6].date,3,1)

    const HolyWeek=[]

    holyWeek.forEach((item1,key) => {
        
        HolyWeek.push({
            date: item1,
            feast: data4[key].feast,
            color: data4[key].color,
        });
        
    });


    const allDates = fixedDates(year)

    const mergedArray = allDates?.map(monthObj => {
        const mergedDetails = monthObj.details.map(detail => {
            const correspondingDetail = previousSundays.find(item => item.date === detail.date);
            const correspondingAshWednesdayDate = detail.date === ashWednesdayObject.date ? ashWednesdayObject : null;
            const correspondingBeforeEasterDate = afterSundays.find(item => item.date === detail.date);
            const correspondingHolyWeekDate = HolyWeek.find(item => item.date === detail.date);

            const correspondingBeforeAshWednesdayObject = {
                ...detail,
                feast: correspondingDetail ? `${correspondingDetail.feast} ${detail.feast}` : detail.feast,
                color: correspondingDetail ? correspondingDetail.color : detail.color
            };
            const correspondingAshWednesdayDateObject = {
                ...correspondingBeforeAshWednesdayObject,
                feast: correspondingAshWednesdayDate ? `${correspondingAshWednesdayDate.feast} ${detail.feast}` : correspondingBeforeAshWednesdayObject.feast,
                color: correspondingAshWednesdayDate ? correspondingAshWednesdayDate.color : correspondingBeforeAshWednesdayObject.color
            };

            const correspondingBeforeEasterDateObject = {
                ...correspondingAshWednesdayDateObject,
                feast: correspondingBeforeEasterDate ? `${correspondingBeforeEasterDate.feast} ${detail.feast}` : correspondingAshWednesdayDateObject.feast,
                color: correspondingBeforeEasterDate ? correspondingBeforeEasterDate.color : correspondingAshWednesdayDateObject.color
            };

            const correspondingHolyWeekDateObject = {
                ...correspondingBeforeEasterDateObject,
                feast: correspondingHolyWeekDate ? `${correspondingHolyWeekDate.feast} ${detail.feast}` : correspondingBeforeEasterDateObject.feast,
                color: correspondingHolyWeekDate ? correspondingHolyWeekDate.color : correspondingBeforeEasterDateObject.color
            };
            return correspondingHolyWeekDateObject;
        });
        return {
            ...monthObj,
            details: mergedDetails
        };
    });

    // Add ashWednesdayObject and previousSundays to mergedArray
    const finalArray = previousSundays.concat(ashWednesdayObject, mergedArray);

    // const previousSundays = getPreviousSundays(ashWenesdayDate, 3);
    // const afterSundays = getAfterSundays(ashWenesdayDate, 7);
    // let goodFriday= subDays(afterSundays[6],2)
    // goodFriday=format(goodFriday,'yyyy-MM-dd')

    // let holyWeek=getPreviousDays(goodFriday,4,1)

    // const excludedDates = [afterSundays[4], afterSundays[5]];
    // const datesBetweenExcluding = getDatesBetweenExcluding(excludedDates[0], excludedDates[1], excludedDates);

    // const TABLE_ROWS = fixedDates(year)

    // console.log(previousSundays,afterSundays,goodFriday,holyWeek,datesBetweenExcluding);
    // console.log(mergedArray);

    return mergedArray
}

