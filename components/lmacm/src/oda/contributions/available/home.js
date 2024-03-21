'use client'

import { getODADeaconsAcolyteMembers, getODAMissionContributionNames, getODAMissionProjects, getODAOfficialMembers, getOneODAMissionContributionName } from "@/app/api/v14/controllers/oda/route";
import ODAContributionsTable from "../../oda-tables/oda-contributions";
import React from 'react'

 
  const TABS = [
    {
      label: "All",
      value: "All",
    },
    {
      label: "Ongoing",
      value: 1,
    },
    {
      label: "Completed",
      value: 2,
    },

    
  ];
   
  const TABLE_HEAD = ["No.","Contribution", "Description", "Total_Amount", "Mission","My_Amount", "Status", ""];
   
  
   
export default function ODAAllContributionsHome({session}) {
    
  const TITLE='All Contributions'

  const [TABLE_ROWS, setTABLE_ROWS]=React.useState([])
  const [Missions, setMissions] = React.useState([]);



  React.useEffect(()=>{
    getContributionNames()
  },[])

  const getContributionNames=async()=>{

    const data={
      status:'All',
      searchParams:'',
      mission:'All',
      page:0,
      pageLimit:30,
      // me:session?.user.id
      me:'211009'
    }

    const response=await getODAMissionContributionNames(data)

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
      <ODAContributionsTable propData={data} session={session}/>
    </>
  )
}