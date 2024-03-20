'use client'

import { getODADeaconsAcolyteMembers, getODAMissionProjects, getODAOfficialMembers } from "@/app/api/v14/controllers/oda/route";
import ODAProjectsTable from "../../oda-tables/oda-projects";
import React from 'react'

 
  const TABS = [
    {
      label: "All",
      value: "All",
    },
    {
      label: "Completed",
      value: 3,
    },
    {
      label: "Ongoing",
      value: 2,
    },
    {
      label: "Future",
      value: 1,
    },
    {
      label: "Pending",
      value: 4,
    },
    
  ];
   
  const TABLE_HEAD = ["Project", "Description", "Contribution", "Mission","Status", ""];
   
  
   
export default function ODAAllProjectsHome({session}) {
    
  const TITLE='All Projects'

  const [TABLE_ROWS, setTABLE_ROWS]=React.useState([])
  const [Missions, setMissions] = React.useState([]);



  React.useEffect(()=>{
    getODAProjects()
  },[])

  const getODAProjects=async()=>{

    const data={
      status:'All',
      searchParams:'',
      mission:'All',
      page:0,
      pageLimit:30
    }

    const response=await getODAMissionProjects(data)

    setTABLE_ROWS(response.data)

  }

  const getAllODAMembers=async()=>{

    const mission='All'

    const response=await getODADeaconsAcolyteMembers(mission)

    setMissions(response.data.Missions)

  }

  const data={TABS,TABLE_HEAD,TABLE_ROWS,TITLE,Missions}

  return (
    <>
      <ODAProjectsTable propData={data}/>
    </>
  )
}