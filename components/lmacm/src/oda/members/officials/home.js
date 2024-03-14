'use client'

import { getODADeaconsAcolyteMembers, getODAOfficialMembers } from "@/app/api/v14/controllers/oda/route";
import ODAOfficialMembersTable from "../../oda-tables/oda-officials";
import React from 'react'

 
  const TABS = [
    {
      label: "All",
      value: "All",
    },
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
  const [DeaconsAcolytes, setDeaconsAcolytes] = React.useState([]);
  const [Missions, setMissions] = React.useState([]);



  React.useEffect(()=>{
    getODA_OfficialMembers()
    getAllODAMembers()
  },[])

  const getODA_OfficialMembers=async()=>{

    const data={
      role:'All',
      searchParams:'',
      mission:'All',
      page:0,
      pageLimit:30
    }

    const response=await getODAOfficialMembers(data)

    setTABLE_ROWS(response.data)

  }

  const getAllODAMembers=async()=>{

    const mission='All'

    const response=await getODADeaconsAcolyteMembers(mission)

    setDeaconsAcolytes(response.data.ODAMembers)
    setMissions(response.data.Missions)

  }

  const data={TABS,TABLE_HEAD,TABLE_ROWS,TITLE,DeaconsAcolytes,Missions}

  return (
    <>
      <ODAOfficialMembersTable propData={data} mission={'All'}/>
    </>
  )
}