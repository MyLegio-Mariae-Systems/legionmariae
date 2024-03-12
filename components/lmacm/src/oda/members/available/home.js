'use client'

import { getODAMembers } from "@/app/api/v14/controllers/oda/route";
import ODAMembersTable from "../../tables";
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

   
export default function ODAAvailableMembersHome() {

  const TITLE='Available Members'

  const [TABLE_ROWS, setTABLE_ROWS]=React.useState([])



  React.useEffect(()=>{
    getAllODAMembers()
  },[])

  const getAllODAMembers=async()=>{

    const response=await getODAMembers()

    console.log(response.data);

    setTABLE_ROWS(response.data)

  }

  const data={TABS,TABLE_HEAD,TABLE_ROWS,TITLE}

  return (
    <ODAMembersTable propData={data}/>
  )
    
}