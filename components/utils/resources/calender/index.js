'use client'
import { Button, Card, CardBody, CardHeader, Input, Typography } from "@material-tailwind/react";
import { NavbarWithMegaMenu } from "../../header";
import { ArrowDownTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";
import { addDays, eachDayOfInterval, format, getDate, isSunday, startOfWeek, subDays } from "date-fns";
import fixedDates, { fixedSundayFeasts } from "./data";
import moment  from 'moment';
import _ from 'lodash';
import handleDownload from "../../../../src/app/api/v14/utills/route";

 
export default function LiturgicalCalenderPage() {

    const year=new Date().getFullYear()

    const [Year,setYear]=React.useState(year)
    const [Years,setYears]=React.useState([])

    const TABLE_HEAD = ["NAME", "DAY", "FEAST/EVENT", "COMMEMORATION", "COLOUR"];
 
    React.useEffect(()=>{
        listYears()
        downloadeCalender()
        
    },[])

    
    
    const renderRows=(details)=>{

        const classes = "p-1 border ";

        return (
            details.map(({ date,feast,saint,color }, index) => {

                const today = new Date(date)
                const dayName = format(today, 'EEEE')
                const dateOfMonth = getDate(today)

                if (feast !=='' || saint !=='') {
                    return (
                    <tr key={date}>
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
        )

    }

    const searchYear=(e)=>{

        let year=new Date().getFullYear()

        const {value}=e.target

        if (isNaN(value)) {

            console.log('Invalid Year');

            return
            
        } else if (value.length>=4) {
            
            if (value.length>4) {
            console.log(`Year must be equal or greater than ${year}`);

            return
                
            }else if (value < year) {
            console.log('Invalid Input');

            return
            }
            else{
                setYear(value)
            }
            
        } 


        console.log((value));
    }

    function listYears() {
        
        const {ashWednesdayDates}=fixedSundayFeasts()
        const lastAshWednesdayDate = _.last(ashWednesdayDates)

        const currentYear = new Date().getFullYear();
        // const endYear = new Date(lastAshWednesdayDate).getFullYear();
        const endYear = 10099

    
        // Generate an array of years from current year to end year
        const years = Array.from({ length: endYear - currentYear + 1 }, (_, index) => currentYear + index);
        setYears(years)
        // return years;
    }

    async function downloadeCalender() {
        let a=await handleDownload()
    console.log(a);
    }

    const TABLE_ROWS = AshWenesday(Year)

  return (
    <>
    <NavbarWithMegaMenu />
    <Card className="h-full w-full overflow-scroll">

    <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h4" color="black ">
              {Year} Liturgical Calender
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              You can search for liturgical calender of any year.
            </Typography>
          </div>
          <div className="flex flex-wrap w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
            {/* <label
                    class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Select a Year
                </label> */}
              <select
                    onChange={searchYear}
                    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                    {
                        Years?.map((year)=>{
                            return (
                                <option value={year}>{year}</option>

                            )
                        })
                    }
                    
                </select>
                
              
            </div>
            
            <Button className="flex items-center gap-3" size="sm">
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-1">
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
                {TABLE_HEAD?.map((head) => (
                <th key={head} className="border bg-primary p-2">
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
                // const isLast = index === TABLE_ROWS1.length - 1;
                // // const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                // const classes = "p-1 border ";
                
                return (
                    <>
                    <tr>
                        <td colSpan={5} className={'p-1 border'}>
                            <Typography variant="large" color="black" className="font-bold text-center text-xl m-1">
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

function getAfterSundays(dateString, numberOfSundays) {
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

    const {data3}=fixedSundayFeasts()

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

function getSundaysBetweenExcluding(startDate,endDate){

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

    const {data1,data2}=fixedSundayFeasts()

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

function AshWenesday(year) {

    const {data4, ashWednesdayDates}=fixedSundayFeasts()

    const ashWenesdayDate = ashWednesdayDates.filter(date => date.startsWith(`${year}-`));

    const ashWednesdayObject={
        date:ashWenesdayDate[0],
        feast:'Ash Wenesday',
        color:'Purple',
    }

    const previousSundays = getSundaysBetweenExcluding(ashWenesdayDate[0],`${year}-01-06`);
    const afterSundays = getAfterSundays(ashWenesdayDate, 7);
    let holyWeek=getPreviousDays(afterSundays[6].date,3,1)

    const HolyWeek=[]

    holyWeek.forEach((item1,key) => {
        
        HolyWeek.push({
            date: item1,
            feast: data4[key].feast,
            color: data4[key].color,
        });
        
    });


    const allDates = fixedDates(year)

    const mergedArray = allDates.map(monthObj => {
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

