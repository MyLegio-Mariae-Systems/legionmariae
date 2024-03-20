'use client'

import { getODADeaconsAcolyteMembers, getODAMissionProjects, getODAMissionProjectsContributions, getODAOfficialMembers, getOneODAMissionProjects } from "@/app/api/v14/controllers/oda/route";
import ODAProjectsTable from "../../oda-tables/oda-projects/contributions";
import React from 'react'

const TABLE_HEAD = ["Member", "Contribution", ""];
   
export default function ODAProjectContributionsHome({session, parameters}) {
    
  const TITLE='Project Contributions'

  const [TABLE_ROWS, setTABLE_ROWS]=React.useState([])
  const [DeaconsAcolytes, setDeaconsAcolytes] = React.useState([]);
  const [OneProject, setOneProject] = React.useState([]);



  React.useEffect(()=>{
    getODAProjectsContributions()
    getAllODAMembers()
    getOneODAProject()
  },[])

  const getODAProjectsContributions=async()=>{

    const data={
      searchParams:'',
      page:0,
      project:parameters.id,
      pageLimit:30
    }

    const response=await getODAMissionProjectsContributions(data)

    setTABLE_ROWS(response.data)

  }

  const getAllODAMembers=async()=>{

    const mission=parameters.level

    const response=await getODADeaconsAcolyteMembers(mission)

    setDeaconsAcolytes(response.data.ODAMembers)

  }

  const getOneODAProject=async()=>{

    let data={
      code:parameters.id,
      mission:parameters.level,
    }

    const response=await getOneODAMissionProjects(data)

    setOneProject(response.data)

  }

  const data={TABLE_HEAD,TABLE_ROWS,TITLE,DeaconsAcolytes,OneProject}

  return (
    <>
      <ODAProjectsTable propData={data} parameters={parameters}/>
    </>
  )
}