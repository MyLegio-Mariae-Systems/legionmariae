'use server'

import Calendar from '../../models/calendar'


export default async function setCalendar(date,value){

    let responseData={
        message:'',
        success:false
    }

    try {

        if (!date || (value===1 && !date.date)) {
            responseData.message='Date is required.'      
            return responseData
        }

        let calendarExist=await Calendar.findOne()

        const Details=async()=>{

            if (value===1) {
                calendarExist?.ashWednesday.push(date?.date)
            } else {
                calendarExist?.downloads.push(date)
            }

            let updated=await calendarExist.save()

            if (!updated) {
                responseData.message=error.message || 'Please try again later, an unknown error occurred'
                responseData.success=false
                return responseData
            } 

        }

        if (calendarExist) {

            if (value===1) {
                if (calendarExist?.ashWednesday?.includes(date?.date)) {
                    responseData.message='Selected date already exist'
                    responseData.success=false
                    return responseData
                }
            }
           
            Details()
        } else {
            calendarExist=await Calendar.create({
                ashWednesday:[],
                downloads:[],
            })
            Details()
        }

        responseData.success=true
        return responseData
        
    } catch (error) {
        console.log(error);
        responseData.message=error.message || 'Please try again later, an unknown error occurred'
        responseData.success=false
        return responseData
    }

}

export async function getCalendar(){

    try {

        const pipeline=[
            {
                $project:{
                    ashWednesday:1,
                    downloads:1,
                }
            },
            {
                $project:{
                    _id:0,
                }
            }
        ]
        let downloads=await Calendar.aggregate(pipeline)
        downloads = JSON.stringify(downloads);

        downloads = JSON.parse(downloads);

        return downloads
        
    } catch (error) {
        console.log(error);
    }

}
                           