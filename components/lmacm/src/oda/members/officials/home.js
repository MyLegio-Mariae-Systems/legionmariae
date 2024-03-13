'use client'

import { getODAOfficialMembers } from "@/app/api/v14/controllers/oda/route";
import ODAOfficialMembersTable from "../../oda-tables/oda-officials";
import React from 'react'

 
  const TABS = [
    {
      label: "Chairman",
      value: "Chairman",
    },
    {
      label: "Asst. Chairman",
      value: "Assistant Chairman",
    },
    {
      label: "Secretary",
      value: "Secretary",
    },
    {
      label: "Asst. Secretary",
      value: "Assistant Secretary",
    },
    {
      label: "Organizer",
      value: "Organizer",
    },
    {
      label: "Asst. Organizer",
      value: "Assistant Organizer",
    },
    {
      label: "Treasurer",
      value: "Treasurer",
    },
    {
      label: "Asst. Treasurer",
      value: "Assistant Treasurer",
    },
  ];
   
  const TABLE_HEAD = ["Member", "Contact", "Function", "Mission", ""];
   
  
   
export default function ODAOfficialMembersHome() {
    
  const TITLE='Official Members'

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

    const response=await getODAOfficialMembers(data)

    console.log(response.data);

    setTABLE_ROWS(response.data)

  }

  const data={TABS,TABLE_HEAD,TABLE_ROWS,TITLE}

  return (
    <>
    {
      TABLE_ROWS && (
        <ODAOfficialMembersTable propData={data} category={'All'}/>

      )
    }
    </>
  )
}