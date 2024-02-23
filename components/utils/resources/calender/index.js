'use client'
import { Button, Card, CardBody, CardHeader, Input, Typography } from "@material-tailwind/react";
import { NavbarWithMegaMenu } from "../../header";
import { ArrowDownTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";
import { addDays, eachDayOfInterval, format, isSunday, startOfWeek, subDays } from "date-fns";
const moment = require('moment');


 
export default function LiturgicalCalenderPage() {

    const year=new Date().getFullYear()

    const [Year,setYear]=React.useState(year)

    const TABLE_HEAD = ["DATE", "DAY", "FEAST/EVENT", "COLOUR"];

 
    const TABLE_ROWS1 = [
        {
            Month: "January",
            details:[
                {
                    date:`${Year}-1-1`,
                    feast:'Circumcision of Jesus Christ / Holy name of Jesus Christ',
                    color:'White'
                },
                {
                    date:`${Year}-1-2`,
                    feast:'',
                    color:'White'
                },
                {
                    date:`${Year}-1-3`,
                    feast:'',
                    color:'White'
                },
                {
                    date:`${Year}-1-4`,
                    feast:'',
                    color:'White'
                },
                {
                    date:`${Year}-1-5`,
                    feast:'',
                    color:'White'
                },
                {
                    date:`${Year}-1-6`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-7`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-8`,
                    feast:'Baptism of the Lord / First Sunday after Epiphany ',
                    color:'White'
                },
                {
                    date:`${Year}-1-9`,
                    feast:'',
                    color:'White'
                },
                {
                    date:`${Year}-1-10`,
                    feast:`Nyabinga - Anton Ooro's home - Wealth brought by
                    Baba Messiah, Baba Messiah the Worker`,
                    color:'White'
                },
                {
                    date:`${Year}-1-11`,
                    feast:'',
                    color:'White'
                },
                {
                    date:`${Year}-1-12`,
                    feast:'',
                    color:'White'
                },
                {
                    date:`${Year}-1-13`,
                    feast:'',
                    color:'White'
                },
                {
                    date:`${Year}-1-14`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-2`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-2`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-2`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-2`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-2`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-2`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-2`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-2`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-2`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-2`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-2`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-2`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-2`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-2`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-2`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-2`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-2`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-2`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-2`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-2`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-2`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-2`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-2`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-2`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-2`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-2`,
                    feast:'Epiphany',
                    color:'White'
                },
                {
                    date:`${Year}-1-2`,
                    feast:'Epiphany',
                    color:'White'
                },

            ]
        },
    
    ];

    const TABLE_ROWS = [
        {
            name: "John Michael",
            job: "Manager",
            date: "23/04/18",
        },
        {
            name: "Alexa Liras",
            job: "Developer",
            date: "23/04/18",
        },
        {
            name: "Laurent Perrier",
            job: "Executive",
            date: "19/09/17",
        },
        {
            name: "Michael Levi",
            job: "Developer",
            date: "24/12/08",
        },
        {
            name: "Richard Gran",
            job: "Manager",
            date: "04/10/21",
        },
    ];


    AshWenesday(Year)
    

  return (
    <>
    <NavbarWithMegaMenu />
    <Card className="h-full w-full overflow-scroll">

    <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              {Year} Liturgical Calender
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              You can search for liturgical calender of any year.
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button className="flex items-center gap-3" size="sm">
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
            <thead>
            <tr>
                {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                    >
                    {head}
                    </Typography>
                </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {TABLE_ROWS.map(({ name, job, date }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
    
                return (
                <tr key={name}>
                    <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                        {name}
                    </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                        {job}
                    </Typography>
                    </td>
                    <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                        {date}
                    </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                        Edit
                    </Typography>
                    </td>
                </tr>
                );
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

    return formattedSundays;
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

function AshWenesday(year) {

    const dates=[
        '2023-02-22',
        '2024-02-14',
        '2025-03-05',
        '2026-02-18',
        '2027-02-10',
        '2028-03-01',
        '2029-02-14',
        '2030-03-06',
        '2031-02-26',
        '2032-02-11',
        '2033-03-02',
    ]

    const ashWenesdayDate = dates.filter(date => date.startsWith(`${year}-`));

    const previousSundays = getPreviousSundays(ashWenesdayDate, 3);
    const afterSundays = getAfterSundays(ashWenesdayDate, 7);
    let goodFriday= subDays(afterSundays[6],2)
    goodFriday=format(goodFriday,'yyyy-MM-dd')

    let holyWeek=getPreviousDays(goodFriday,4,1)

    const excludedDates = [afterSundays[4], afterSundays[5]];
    const datesBetweenExcluding = getDatesBetweenExcluding(excludedDates[0], excludedDates[1], excludedDates);

    console.log(previousSundays,afterSundays,goodFriday,holyWeek,datesBetweenExcluding);
    
}

// const sundaysOfYear = getSundays(year);
    // console.log(`Sundays in ${year}:`, sundaysOfYear);


