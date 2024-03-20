'use client'

import { getODADeaconsAcolyteMembers, getODAMissionContributions, getODAMissionProjects, getODAMissionProjectsContributions, getODAOfficialMembers, getOneODAMissionContributionName, getOneODAMissionProjects } from "@/app/api/v14/controllers/oda/route";
import ODAContributionTable from "../../oda-tables/oda-contributions/payments";
import React from 'react'

const TABLE_HEAD = ["Member", "Contribution", ""];
   
export default function ODAContributionPaymentsHome({session, parameters}) {
    
  const TITLE='Contribution Payments'

  const [TABLE_ROWS, setTABLE_ROWS]=React.useState([])
  const [DeaconsAcolytes, setDeaconsAcolytes] = React.useState([]);
  const [OneProject, setOneProject] = React.useState([]);



  React.useEffect(()=>{
    getODAContributionPayments()
    getAllODAMembers()
    getOneContributionName()
  },[])

  const getODAContributionPayments=async()=>{

    const data={
      searchParams:'',
      page:0,
      project:parameters.id,
      pageLimit:30
    }

    const response=await getODAMissionContributions(data)

    setTABLE_ROWS(response.data)

  }

  const getAllODAMembers=async()=>{

    const mission=parameters.level

    const response=await getODADeaconsAcolyteMembers(mission)

    setDeaconsAcolytes(response.data.ODAMembers)

  }

  const getOneContributionName=async()=>{

    let data={
      code:parameters.id,
      mission:parameters.level,
    }

    const response=await getOneODAMissionContributionName(data)

    setOneProject(response.data)

  }

  const data={TABLE_HEAD,TABLE_ROWS,TITLE,DeaconsAcolytes,OneProject}

  return (
    <>
      <ODAContributionTable propData={data} parameters={parameters}/>
    </>
  )
}