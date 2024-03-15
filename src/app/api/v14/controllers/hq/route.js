'use server'

import Calendar from '../../models/calendar'


export default async function setCalendar(){

    try {
        
    } catch (error) {
        console.log(error);
    }

    return new Date().toISOString().split('T')[0]

}

export async function getCalendar(){

    try {
        
    } catch (error) {
        console.log(error);
    }

    return new Date().toISOString().split('T')[0]

}
