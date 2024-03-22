'use client'

import { getODAMembers } from "@/app/api/v14/controllers/oda/route";
import ODAMembersTable from "../../oda-tables/oda-members";
import React from 'react'
   
  const TABS = [
    {
      label: "All",
      value: "All",
    },
    {
      label: "Deacons",
      value: "Deacons",
    },
    {
      label: "Acolytes",
      value: "Acolytes",
    },
  ];
   
  const TABLE_HEAD = ["Member", "Contact", "Mission", ""];

   
export default function ODAAvailableMembersHome({session}) {

  const TITLE='Available Members'

  const [TABLE_ROWS, setTABLE_ROWS]=React.useState([])



  React.useEffect(()=>{
    getAllODAMembers()
  },[])

  const getAllODAMembers=async()=>{

    const data={
      searchParams:'',
      category:'All',
      page:0,
      pageLimit:30
    }

    const response=await getODAMembers(data)

    console.log(response.data);

    setTABLE_ROWS(response.data)

  }

  const data={TABS,TABLE_HEAD,TABLE_ROWS,TITLE}

  return (
    <>
    {
      TABLE_ROWS && (
        <ODAMembersTable propData={data} category={'All'} session={session}/>

      )
    }
    </>
  )
    
}