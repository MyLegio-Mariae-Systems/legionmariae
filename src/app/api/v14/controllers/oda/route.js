'use server'

import DbConnect, { DayTime, generateCode, getFirstAndLastWord, newMissionODAValidation, newProjectValidation, sendEmail, today } from "../../utills";
import Archdioces from '../../models/arch-dioces-registration'
import Dioces from '../../models/dicoes-registration'
import Mission from '../../models/mission-registration'
import ODA from '../../models/oda-mission-registration'
import ODAMissionOfficials from '../../models/oda-mission-officials'
import ODAMissionProjects from '../../models/oda-mission-projects'
import ODAMissionProjectsContribution from '../../models/oda-mission-project-contributions'
import ODAMissionProjectsContributionDetails from '../../models/oda-mission-project-contributions-details'
import ODAMissionContributionName from '../../models/oda-mission-contribution-name'
import ODAMissionContribution from '../../models/oda-mission-contributions'
import ODAMissionContributionDetails from '../../models/oda-mission-contributions-details'
import bcrypt from "bcryptjs/dist/bcrypt";
import _ from 'lodash';
import authOptions from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";



// const session=await getServerSession(authOptions)

// console.log(session);

let sessionId=null //session?.user?.id

DbConnect()

async function generateUniqueUsername() {
    let oda_username;
    let random;
    do {
        random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
        oda_username = random ;
    } while (await ODA.findOne({ oda_username }));

    return oda_username;
}

async function generateUniqueProjectCode(collection,prefix) {
  let code;
  let random;
  do {
      random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
      code = random+prefix;
  } while (await collection.findOne({ code }));

  return code;
}

// COPILOT CODE STARTS HERE



// COPILOT CODE ENDS HERE

//...................................................................................

export default async function NewMissionODAMember(value) {
    let responseData={
      message:'',
      success:false
    }
  
    try {

        const validate=await newMissionODAValidation(value)

        if (validate.error) {
          console.log(validate.error);
          responseData.message=validate?.error?.message     

          return responseData
        }

        let {
          first_name,
          last_name,
          middle_names,
          mission,
          contact,
          email,
          category,
          session
        }=validate.value

  
      let promises=[
        generateUniqueUsername(),
        ODA.findOne({email: { $regex: new RegExp('^' + email + '$', 'i') }}),
        ODA.findOne({contact}),
        ODA.findOne({
          $or: [
            { mission1: mission },
            { mission2: mission }
          ],
          username
        }),
        
      ]

      try {
        const responses = await Promise.allSettled(promises);
  
        const data = responses.flatMap((response) =>
          [response.value]
        );

        if (data[1]) {
          responseData.message='Email address already exists.'
          responseData.success=false
          return responseData
        }
        
        if (data[2]) {
            responseData.message='Contact number already exists.'
            responseData.success=false
            return responseData
        }
  
        const oda = await ODA.create(
          {
            oda_username:data[0],
            first_name,
            last_name,
            middle_names,
            mission1: mission,
            mission2: null,
            category,
            email,
            contact,
            addedBy: session || null,
            updatedBy: session || null,
            password:new Date(),
            verified: email ? false : true,
            isDeleted:1,
          }
        );
  
        if (!oda) {
            responseData.message='Invalid data'
            responseData.success=false
            return responseData
        }
  
        let addedByData;
        let fullname = 'Administrator';
  
        // if (session) {
        //   addedByData = await Admin.findOne({ userId: sessionId }).select('-password');
  
        //   if (!addedByData) {
        //     addedByData = await Members.findById(tokenId).select('-password');
        //     fullname = addedByData.category + ' ' + addedByData.firstname + ' ' + addedByData.middlenames + ' ' + addedByData.lastname;
        //   } else {
        //     fullname = addedByData.category;
        //   }
        // }
  
        const message = `
          <h3>Registration to Mission O.D.A</h3>
          <p>Your O.D.A registration is successful.</p>
          <p>Registered By: <b>${fullname}</b></p>
          <p>Registered Date: <b>${await DayTime()}</b></p>
          
          <p>Kind Regards</p>
          <p>Legio Mariae</p>
        `;
        const subject = 'ODA Registration';
        const send_to = email;

        if (email) {
          await sendEmail(subject, message, send_to);
        }

        responseData.success=true
        return responseData
  
      } catch (error) {
        console.log(error);

        responseData.message='Please try again later, server error occurred'
        responseData.success=false
        return responseData
        
      }
    } catch (error) {
        console.log(error);

        responseData.message='Please try again later, an unknown error occurred'
        responseData.success=false
        return responseData
  
    }
}

export async function getODAMembers (Params){

    let responseData={
        message:'',
        success:false,
        data:[]
    }

    let searchParams=Params.searchParams
    let category=Params.category
    let limit=Params.pageLimit
    let page=Params.page

    try {

      const matchQuery =
      searchParams === ''
          ? {}
          : {
              $or: [
                { oda_username: { $regex: searchParams, $options: 'i' } },
                { first_name: { $regex: searchParams, $options: 'i' } },
                { last_name: { $regex: searchParams, $options: 'i' } },
                { email: { $regex: searchParams, $options: 'i' } },
                { middle_names: { $regex: searchParams, $options: 'i' } },
              ],
          };
      
      const matchQueryCategory =
      category === 'All'
        ? {}
        : 
        { category }


      let pipeline=[
        {
          $match:{...matchQuery, ...matchQueryCategory}
        },
        {
          $lookup: {
            from: 'misxions',
            localField: 'mission1',
            foreignField: 'code',
            as: 'primaryMission',
          },
        },
        {
          $unwind: { path: '$primaryMission', preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: 'misxions',
            localField: 'mission2',
            foreignField: 'code',
            as: 'secondaryMission',
          },
        },
        {
          $unwind: { path: '$secondaryMission', preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: 'misxionadomemdas',
            localField: 'addedBy',
            foreignField: 'oda_username',
            as: 'addedBy',
          },
        },
        {
          $unwind: { path: '$addedBy', preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: 'misxionadomemdas',
            localField: 'updatedBy',
            foreignField: 'oda_username',
            as: 'updatedBy',
          },
        },
        {
          $unwind: { path: '$updatedBy', preserveNullAndEmptyArrays: true },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $group: {
            _id: null,
            pageCount: { $sum: 1 },
            documents: {
              $push: '$$ROOT',
            },
          },
        },
        {
          $unwind: '$documents',
        },
        {
          $skip:page * limit
        },
        {
          $limit:limit
        },
        
        {
            $project:{
              _id: 0,
              documents:{
                oda_username:1,
                first_name:1,
                last_name:1,
                contact:1,
                email:1,
                middle_names:1,
                category:1,
                createdAt:1,
                updatedAt:1,
                isDeleted:1,
                primaryMission:{
                  code:1,name:1
                },
                secondaryMission:{
                  code:1,name:1
                },
                addedBy:{
                  oda_username:1,
                  first_name:1,
                  middle_names:1,
                  last_name:1,
                },
                updatedBy:{
                  oda_username:1,
                  first_name:1,
                  middle_names:1,
                  last_name:1,
                },
              },
              pageCount: 1,
            }
        }

      ]

      let aggregatedDocuments =await ODA.aggregate(pipeline)

      let data = JSON.stringify(aggregatedDocuments);

      data = JSON.parse(data);
      responseData.data=data

      return responseData
        
    } catch (error) {
        console.log(error);

        responseData.message='Please try again later, an unknown error occurred'
        responseData.success=false
        return responseData
    }


}

export const editODAMembers=async(value)=>{

  let responseData={
    message:'',
    success:false
  }

  let oda_username=value.oda_username
  let validate

  let toBeValidatedData={
    first_name:value.first_name,
    last_name:value.last_name,
    middle_names:value.middle_names,
    mission:value.mission,
    session:value.session,
    contact:value.contact,
    category:value.category,
    email:value.email,
  }


  validate=await newMissionODAValidation(toBeValidatedData)

  if (validate.error) {
    console.log(validate.error);
    responseData.message=validate?.error?.message     
    return responseData
  }

  try {

    let filter={oda_username}
    let update

    update = {
      first_name:validate?.value.first_name,
      middle_names:validate?.value.middle_names,
      contact:validate?.value.contact,
      email:validate?.value.email,
      updatedBy:validate?.value.session,
      category:validate?.value.category,
    };
    

    const updated=await ODA.findOneAndUpdate(filter, update, {
      upsert: false, // Creates a new document when no document matches the query criteria
      new: true, // Returns the updated document
      runValidators: true // Applies Mongoose validators to the update operation
    })
    
    if (!updated) {
      responseData.message='Invalid data'
      responseData.success=false
      return responseData
    } 

    responseData.success=true
    return responseData
  } catch (error) {
    console.log(error);
    responseData.message='Please try again later, an unknown error occurred'
    responseData.success=false
    return responseData
  }

}

export const deleteODAMembers=async(value,suspend)=>{

  let responseData={
    message:'',
    success:false
  }

  let oda_username=value.oda_username
  let mission=value.mission
  let sessionId=value.session

  try {

    let filter={oda_username}

    const member=await ODA.findOne(filter)
    
    if (!member) {
      responseData.message='Unknown error occured'
      responseData.success=false
      return responseData
    }

    if (!suspend) {
      if (member?.mission1 === mission) {
        member.mission1=null
      } else if (member?.mission2 === mission) {
        member.mission2=null
      }
    } else {
      member.isDeleted=2
    }
    member.updatedBy=sessionId
    
    await member.save()

    responseData.success=true
    return responseData
  } catch (error) {
    console.log(error);
    responseData.message='Please try again later, an unknown error occurred'
    responseData.success=false
    return responseData
  }

}

export async function getODADeaconsAcolyteMembers (mission){

  let responseData={
      message:'',
      success:false,
      data:[]
  }

  try {

    let Missions=[]

    const matchQuery =
      mission === 'All'
        ? {}
        : {
            $or: [
              { mission1: { $regex: mission, $options: 'i' } },
              { mission2: { $regex: mission, $options: 'i' } },
            ],
        };


    let pipelineODA=[
      {
        $match:{...matchQuery, isDeleted:1}
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
      {
          $project:{
            oda_username:1,
            first_name:1,
            last_name:1,
            contact:1,
            email:1,
            middle_names:1,
            category:1,
          }
      },
      {
        $project:{
          _id: 0,
        }
    }

    ]

    let pipelineMissions=[
      {
          $project:{
            name:1,
            code:1,
          }
      },
      {
        $project:{
          _id: 0,
        }
    }

    ]

    let aggregatedDocuments =await ODA.aggregate(pipelineODA)

    // console.log(aggregatedDocuments);

    if (mission==='All') {

      Missions=await Mission.aggregate(pipelineMissions)
      
    }

    let dataODA = JSON.stringify(aggregatedDocuments);
    let dataMissions = JSON.stringify(Missions);

    let data = {ODAMembers:JSON.parse(dataODA),Missions:mission==='All' ? JSON.parse(dataMissions) : []};
    responseData.data=data

    return responseData
      
  } catch (error) {
      console.log(error);

      responseData.message='Please try again later, an unknown error occurred'
      responseData.success=false
      return responseData
  }


}

export async function getODAOfficialMembers (Params){

  let responseData={
      message:'',
      success:false,
      data:[]
  }

  let searchParams=Params.searchParams
  let role=Params.role
  let mission=Params.mission
  let limit=Params.pageLimit
  let page=Params.page

  try {

    const matchQuery =
    searchParams === ''
        ? {}
        : {
            $or: [
              { oda_username: { $regex: searchParams, $options: 'i' } },
            ],
        };
    
    const matchQueryRole =
      role === 'All'
        ? {}
        : {role};
    

    const matchQueryMission =
      mission === 'All'
      ? {}
      : 
      { mission }


    let pipeline=[
      {
        $match:{...matchQuery, ...matchQueryMission, ...matchQueryRole, isDeleted:1}
      },
      {
        $lookup: {
          from: 'misxionadomemdas',
          localField: 'oda_username',
          foreignField: 'oda_username',
          as: 'odaMembers',
        },
      },
      {
        $unwind: { path: '$odaMembers', preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: 'misxions',
          localField: 'mission',
          foreignField: 'code',
          as: 'mission',
        },
      },
      {
        $unwind: { path: '$mission', preserveNullAndEmptyArrays: true },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $group: {
          _id: null,
          pageCount: { $sum: 1 },
          documents: {
            $push: '$$ROOT',
          },
        },
      },
      {
        $unwind: '$documents',
      },
      {
        $skip:page * limit
      },
      {
        $limit:limit
      },
      
      {
          $project:{
            _id: 0,
            documents:{
              role:1,
              mission:{
                code:1,name:1
              },
              odaMembers:{
                oda_username:1,
                first_name:1,
                last_name:1,
                contact:1,
                email:1,
                middle_names:1,
                category:1,
              },
            },
            pageCount: 1,
          }
      }

    ]

    let aggregatedDocuments =await ODAMissionOfficials.aggregate(pipeline)

    let data = JSON.stringify(aggregatedDocuments);

    data = JSON.parse(data);
    responseData.data=data

    return responseData
      
  } catch (error) {
      console.log(error);

      responseData.message='Please try again later, an unknown error occurred'
      responseData.success=false
      return responseData
  }


}

export async function NewMissionODAOfficialMember(value) {
  let responseData={
      message:'',
      success:false
  }

  try {

      let {
        oda_username,
        role,
        mission,
      }=value

  //   const NullAddedBy = await Mission.findOne({ addedBy: null });
    
  //   if (NullAddedBy) {
  //     responseData.message='Access denied. Please register a member to proceed.'
  //     responseData.success=false
  //     return responseData
  //   }

  
  // await ODAMissionOfficials.deleteMany()
  let promises=[
    ODAMissionOfficials.findOne({oda_username}),
    ODA.findOne({oda_username}),
  ]

  const responses = await Promise.allSettled(promises);

  const data = responses.flatMap((response) =>
    [response.value]
  );

    try {

      if (data[1].mission1 !== mission && data[1].mission2 !== mission ) {
        responseData.message=`Member with username, ${oda_username} is not a member of the mission's O.D.A you selected.`
        responseData.success=false
        return responseData
      }

      let filter={}

      if (data[0]) {
        
        filter = {
          oda_username
        };
      }
      else{
        filter = {
          role,
          mission
        };
      }
      
      const update = {
        role,
        oda_username,
        mission,
        updatedBy: null,
        isDeleted: 1
      };
      
      const oda=await ODAMissionOfficials.findOneAndUpdate(filter, update, {
        upsert: true, // Creates a new document when no document matches the query criteria
        new: true, // Returns the updated document
        runValidators: true // Applies Mongoose validators to the update operation
      })
      
// console.log(oda);
      if (!oda) {
          responseData.message='Invalid data'
          responseData.success=false
          return responseData
      }

      let addedByData;
      let fullname = 'Administrator';

      if (tokenId) {
        addedByData = await Admin.findOne({ userId: tokenId }).select('-password');

        if (!addedByData) {
          addedByData = await Members.findById(tokenId).select('-password');
          fullname = addedByData.category + ' ' + addedByData.firstname + ' ' + addedByData.middlenames + ' ' + addedByData.lastname;
        } else {
          fullname = addedByData.category;
        }
      }

      const message = `
        <h3>Registration to Mission O.D.A Official</h3>
        <p>You have been registered successfully as the O.D.A ${role} of your mission. </p>
        <p>Registered By: <b>${fullname}</b></p>
        <p>Registered Date: <b>${await DayTime()}</b></p>
        
        <p>Kind Regards</p>
        <p>Legio Mariae</p>
      `;
      const subject = 'ODA Official Registration';
      const send_to = data[1]?.email;

      if (data[1]?.email) {
        // await sendEmail(subject, message, send_to);
      }

      responseData.success=true
      return responseData

    } catch (error) {
      console.log(error);

      responseData.message='Please try again later, server error occurred'
      responseData.success=false
      return responseData
      
    }
  } catch (error) {
      console.log(error);

      responseData.message='Please try again later, an unknown error occurred'
      responseData.success=false
      return responseData

  }
}

//......................................................................................

export async function ODALogin(username, password, req) {
  try {
    let a=await getODADeaconsAcolyteMembers('All')

    console.log(a.data.ODAMembers);
    if (!username || !password) {
      return {
        message: 'Please enter username and password',
        success: false,
      };
    }

    let promises=[
      ODA.findOne({ oda_username:username}),
      ODAMissionOfficials.findOne({ oda_username:username}),
    ]
  
    const responses = await Promise.allSettled(promises);
  
    const data = responses.flatMap((response) =>
      [response.value]
    );
    const user = data[0]
    const official = data[1]

    if (!user || user.isDeleted === -1) {
      return {
        message: 'Invalid username or password',
        success: false,
      };
    }

    if (user.isDeleted > 1) {
      return {
        message: 'This account has been suspended',
        success: false,
      };
    }

    // if (!user.verified) {
    //   return {
    //     message: 'Email not verified. Please verify your business email address',
    //     success: false,
    //   };
    // }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {

      // const cashierName = user.firstName + ' ' + user.lastName + ' (' + user.username + ')';
      // if (process.env.NODE_ENV === 'production') {
      //   loginDetails(req, cashierUser.cashier, butchery.email, butchery.name, cashierName);
      // }

      let sessionData={
        id:'',
        role:'',
        access:'',
        name:'',
        level_name:'',
        level_code:'',
        access_name:'',
      }

      if (official) {

        sessionData.id=official.oda_username
        sessionData.role=official.role
        sessionData.access_name='oda'
        sessionData.name=user.first_name+' '+user.last_name
        sessionData.access=1
        sessionData.level_name='Mission'
        sessionData.level_code=official.mission
      }

      return {
        success: true,
        sessionData
      };
    } else {
      return {
        message: 'Invalid username or password',
        success: false,
      };
    }
  } catch (error) {
    console.log('Error =>' + error);
    return {
      message: 'Unknown server error has occurred',
      success: false,
    };
  }
}

//.................................................................................

export const newODAMissionProject=async(value)=>{

  let responseData={
    message:'',
    success:false
  }

  const validate=await newProjectValidation(value)

  if (validate.error) {
    console.log(validate.error);
    responseData.message=validate?.error?.message     

    return responseData
  }

  let {
    name,
    description,
    mission,
  }=validate.value

  try {

    const promises=[
      generateUniqueProjectCode(ODAMissionProjects,'M'),
      ODAMissionProjects.findOne({name,mission})
    ]

    const responses = await Promise.allSettled(promises);
  
    const data = responses.flatMap((response) =>
      [response.value]
    );

    const code='P'+ data[0]

    const nameExist=data[1]

    if (nameExist) {
      responseData.message='Project Exist'
      responseData.success=false
      return responseData
    }

    const project=await ODAMissionProjects.create({
      code,
      name,
      description,
      amount:0,
      mission,
      status:1,
      addedBy:null,
      updatedBy:null,
      isDeleted:1
    })

    if (!project) {
      responseData.message='Invalid data'
      responseData.success=false
      return responseData
    } 

    responseData.success=true
    return responseData
  } catch (error) {
    responseData.message='Please try again later, an unknown error occurred'
    responseData.success=false
    return responseData
  }

}

export const editODAMissionProject=async(value,status=false)=>{

    let responseData={
      message:'',
      success:false
    }

    let code=value.code
    let validate

    if (!status) {
      let toBeValidatedData={
        name:value.name,
        description:value.description,
        mission:value.mission,
        session:value.session,
      }
  
      validate=await newProjectValidation(toBeValidatedData)
  
      if (validate.error) {
        console.log(validate.error);
        responseData.message=validate?.error?.message     
        return responseData
      }
  
    }

    let name
    let description
    let sessionId

    if (!status) {
      name=validate?.value.name
      description=validate?.value.description
      sessionId=validate?.value.session
    }
    
    try {

      let filter={code}
      let update

      if (!status) {

        // const nameExist=await ODAMissionProjects.findOne({name:{ $regex: name, $options: 'i' },mission:value.mission})
        // console.log(nameExist);
        // if (nameExist) {
        //   responseData.message='Project name exist'
        //   responseData.success=false
        //   return responseData
        // }

        update = {
          name,
          description,
          updatedBy:sessionId,
        };
      } else {

        update = {
          status:value.status,
          updatedBy:value.session
        };
      }

      const updated=await ODAMissionProjects.findOneAndUpdate(filter, update, {
        upsert: false, // Creates a new document when no document matches the query criteria
        new: true, // Returns the updated document
        runValidators: true // Applies Mongoose validators to the update operation
      })
      
      if (!updated) {
        responseData.message='Invalid data'
        responseData.success=false
        return responseData
      } 

      responseData.success=true
      return responseData
    } catch (error) {
      responseData.message='Please try again later, an unknown error occurred'
      responseData.success=false
      return responseData
    }

}

export const deleteODAMissionProject=async(value)=>{

  let responseData={
    message:'',
    success:false
  }

  let code=value.code
  
  try {

    let filter={code}

    const deleted=await ODAMissionProjects.deleteOne(filter)
    
    if (!deleted) {
      responseData.message='Unknown error occured'
      responseData.success=false
      return responseData
    } 

    responseData.success=true
    return responseData
  } catch (error) {
    responseData.message='Please try again later, an unknown error occurred'
    responseData.success=false
    return responseData
  }

}

export const newODAMissionProjectContribution=async(value)=>{

  let responseData={
    message:'',
    success:false
  }

  let {
    code,
    oda_username,
    amount,
  }=value

  if (!code || !oda_username || !amount) {
    console.log(code, oda_username, amount);
    responseData.message='All fields are required'    
    return responseData
  }

  if (isNaN(amount) || !parseInt(amount)>0 ) {
    responseData.message='Invalid amount'    
    return responseData
  }

  try {
    
    let filter={project:code.toUpperCase(), oda_username:oda_username.toUpperCase()}
    let filter1={code:code.toUpperCase()}
    let update={
      $inc: { amount:parseInt(amount) },
      updatedBy:sessionId,
      isDeleted:1
    }
    let update1={
      $inc: { amount:parseInt(amount) },
    }

    let promises=[
      ODAMissionProjectsContribution.findOneAndUpdate(filter, update, {
        upsert: true, 
        new: false, 
        runValidators: true 
      }),
      ODAMissionProjects.findOneAndUpdate(filter1, update1, {
        upsert: false, 
        new: false, 
        runValidators: true 
      }),
      ODAMissionProjectsContributionDetails.create({
        project:code.toUpperCase(),
        oda_username,
        amount:parseInt(amount),
        addedBy:sessionId,
        isDeleted:1
      })
    ]

    let promise=await Promise.allSettled(promises)

    if (!promise) {
      responseData.message='Invalid data'
      responseData.success=false
      return responseData
    } 

    responseData.success=true
    return responseData
  } catch (error) {
    responseData.message='Please try again later, an unknown error occurred'
    responseData.success=false
    return responseData
  }

}

export async function getODAMissionProjects (Params){

  let responseData={
      message:'',
      success:false,
      data:[]
  }

  let searchParams=Params.searchParams
  let status=Params.status
  let mission=Params.mission
  let limit=Params.pageLimit
  let page=Params.page
  let me=Params.me

  try {

    // await ODAMissionProjects.deleteMany()

    const matchQuery =
    searchParams === ''
        ? {}
        : {
            $or: [
              { name: { $regex: searchParams, $options: 'i' } },
              { code: { $regex: searchParams, $options: 'i' } },
            ],
        };
    
    const matchQueryRole =
      status === 'All'
        ? {}
        : {status};
    

    const matchQueryMission =
      mission === 'All'
      ? {}
      : 
      { mission }


    let pipeline=[
      {
        $match:{...matchQuery, ...matchQueryMission, ...matchQueryRole}
      },
      {
        $lookup: {
          from: 'misxions',
          localField: 'mission',
          foreignField: 'code',
          as: 'mission',
        },
      },
      {
        $unwind: { path: '$mission', preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: 'misxionadomemdas',
          localField: 'addedBy',
          foreignField: 'oda_username',
          as: 'addedBy',
        },
      },
      {
        $unwind: { path: '$addedBy', preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: 'misxionadomemdas',
          localField: 'updatedBy',
          foreignField: 'oda_username',
          as: 'updatedBy',
        },
      },
      {
        $unwind: { path: '$updatedBy', preserveNullAndEmptyArrays: true },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $group: {
          _id: null,
          pageCount: { $sum: 1 },
          documents: {
            $push: '$$ROOT',
          },
        },
      },
      {
        $unwind: '$documents',
      },
      {
        $skip:page * limit
      },
      {
        $limit:limit
      },
      
      {
          $project:{
            _id: 0,
            documents:{
              status:1,
              description:1,
              name:1,
              amount:1,
              code:1,
              createdAt:1,
              updatedAt:1,
              mission:{
                code:1,name:1
              },
              addedBy:{
                oda_username:1,
                first_name:1,
                middle_names:1,
                last_name:1,
              },
              updatedBy:{
                oda_username:1,
                first_name:1,
                middle_names:1,
                last_name:1,
              },
              
            },
            pageCount: 1,
          }
      }

    ]

    let aggregatedDocuments =await ODAMissionProjects.aggregate(pipeline)

    let myContribution=[]

    await Promise.allSettled(
      aggregatedDocuments?.map(async({documents},index)=>{

        let collections=await ODAMissionProjectsContribution.findOne({project:documents?.code,oda_username:me})

        if (collections) {
          myContribution[index] = collections.amount;
        } else {
            myContribution[index] = 0;
        }
      })
    )

    let data = JSON.stringify(aggregatedDocuments);
    myContribution = JSON.stringify(myContribution);

    data = JSON.parse(data);
    myContribution = JSON.parse(myContribution);
    responseData.data={data,myContribution}

    return responseData
      
  } catch (error) {
      console.log(error);

      responseData.message='Please try again later, an unknown error occurred'
      responseData.success=false
      return responseData
  }


}

export async function getOneODAMissionProjects (value){

  let responseData={
      message:'',
      success:false,
      data:[]
  }

  try {

    // await ODAMissionProjects.deleteMany()


    let pipeline=[
      {
        $match:{code: { $regex: value.code, $options: 'i' }, mission: { $regex: value.mission, $options: 'i' }}
      },
      {
          $project:{
            status: 1,
            name:1
          }
      },
      {
        $project:{
          _id: 0,
        }
    }

    ]

    let aggregatedDocuments =await ODAMissionProjects.aggregate(pipeline)

    let data = JSON.stringify(aggregatedDocuments);

    data = JSON.parse(data);
    responseData.data=data

    return responseData
      
  } catch (error) {
      console.log(error);

      responseData.message='Please try again later, an unknown error occurred'
      responseData.success=false
      return responseData
  }


}

export async function getODAMissionProjectsContributions (Params){

  let responseData={
      message:'',
      success:false,
      data:[]
  }

  let searchParams=Params.searchParams
  let project=Params.project
  let limit=Params.pageLimit
  let page=Params.page

  try {

    // await ODAMissionProjects.deleteMany()

    const matchQuery =
    searchParams === ''
        ? {}
        : {
            oda_username: { $regex: searchParams, $options: 'i' },
        };
    
    let pipeline=[
      {
        $match:{project: { $regex: project, $options: 'i' }, ...matchQuery}
      },
      {
        $lookup: {
          from: 'misxionadomemdas',
          localField: 'oda_username',
          foreignField: 'oda_username',
          as: 'ODAMembers',
        },
      },
      {
        $unwind: { path: '$ODAMembers', preserveNullAndEmptyArrays: true },
      },
      {
        $sort: {
          updatedAt: -1,
        },
      },
      {
        $group: {
          _id: null,
          pageCount: { $sum: 1 },
          documents: {
            $push: '$$ROOT',
          },
        },
      },
      {
        $unwind: '$documents',
      },
      {
        $skip:page * limit
      },
      {
        $limit:limit
      },
      
      {
          $project:{
            _id: 0,
            documents:{
              amount:1,
              ODAMembers:{
                first_name:1,
                last_name:1,
                middle_names:1,
                oda_username:1,
              },
            },
            pageCount: 1,
          }
      }

    ]

    let aggregatedDocuments =await ODAMissionProjectsContribution.aggregate(pipeline)

    let data = JSON.stringify(aggregatedDocuments);

    data = JSON.parse(data);
    responseData.data=data

    return responseData
      
  } catch (error) {
      console.log(error);

      responseData.message='Please try again later, an unknown error occurred'
      responseData.success=false
      return responseData
  }


}

export async function getODAMissionProjectsContributionsDetails (Params){

  let responseData={
      message:'',
      success:false,
      data:[]
  }

  let oda_username=Params.searchParams
  let project=Params.project
  let limit=Params.pageLimit
  let page=Params.page

  try {

    // await ODAMissionProjects.deleteMany()

    
    let pipeline=[
      {
        $match:{project: { $regex: project, $options: 'i' }, oda_username: { $regex: oda_username, $options: 'i' }}
      },
      {
        $lookup: {
          from: 'misxionadomemdas',
          localField: 'oda_username',
          foreignField: 'oda_username',
          as: 'ODAMembers',
        },
      },
      {
        $unwind: { path: '$ODAMembers', preserveNullAndEmptyArrays: true },
      },
      {
        $sort: {
          updatedAt: -1,
        },
      },
      {
        $group: {
          _id: null,
          pageCount: { $sum: 1 },
          documents: {
            $push: '$$ROOT',
          },
        },
      },
      {
        $unwind: '$documents',
      },
      {
        $skip:page * limit
      },
      {
        $limit:limit
      },
      
      {
          $project:{
            _id: 0,
            documents:{
              amount:1,
              createdAt:1,
              ODAMembers:{
                first_name:1,
                last_name:1,
                middle_names:1,
                oda_username:1,
              },
            },
            pageCount: 1,
          }
      }

    ]

    let aggregatedDocuments =await ODAMissionProjectsContributionDetails.aggregate(pipeline)

    let data = JSON.stringify(aggregatedDocuments);

    data = JSON.parse(data);
    responseData.data=data

    return responseData
      
  } catch (error) {
      console.log(error);

      responseData.message='Please try again later, an unknown error occurred'
      responseData.success=false
      return responseData
  }


}


//........................................................................................

export const newODAMissionContributionName=async(value)=>{

  let responseData={
    message:'',
    success:false
  }

  const validate=await newProjectValidation(value)

  if (validate.error) {
    console.log(validate.error);
    responseData.message=validate?.error?.message     

    return responseData
  }

  let {
    name,
    description,
    mission,
  }=validate.value

  try {

    const promises=[
      generateUniqueProjectCode(ODAMissionContributionName,'M'),
      ODAMissionContributionName.findOne({name,mission})
    ]

    const responses = await Promise.allSettled(promises);
  
    const data = responses.flatMap((response) =>
      [response.value]
    );

    const code='C'+ data[0]

    const nameExist=data[1]

    if (nameExist) {
      responseData.message='Contribution Exist'
      responseData.success=false
      return responseData
    }

    const contribution=await ODAMissionContributionName.create({
      code,
      name,
      description,
      amount:0,
      mission,
      status:1,
      addedBy:null,
      updatedBy:null,
      isDeleted:1
    })

    if (!contribution) {
      responseData.message='Invalid data'
      responseData.success=false
      return responseData
    } 

    responseData.success=true
    return responseData
  } catch (error) {
    responseData.message='Please try again later, an unknown error occurred'
    responseData.success=false
    return responseData
  }

}

export const newODAMissionContribution=async(value)=>{

  let responseData={
    message:'',
    success:false
  }

  let {
    code,
    oda_username,
    amount,
  }=value

  if (!code || !oda_username || !amount) {
    console.log(code, oda_username, amount);
    responseData.message='All fields are required'    
    return responseData
  }

  if (isNaN(amount) || !parseInt(amount)>0 ) {
    responseData.message='Invalid amount'    
    return responseData
  }

  try {

    let filter={contribution:code.toUpperCase(), oda_username:oda_username.toUpperCase()}
    let filter1={code:code.toUpperCase()}
    let update={
      $inc: { amount:parseInt(amount) },
      updatedBy:sessionId,
      isDeleted:1
    }
    let update1={
      $inc: { amount:parseInt(amount) },
    }

    let promises=[
      ODAMissionContribution.findOneAndUpdate(filter, update, {
        upsert: true, 
        new: false, 
        runValidators: true 
      }),
      ODAMissionContributionName.findOneAndUpdate(filter1, update1, {
        upsert: false, 
        new: false, 
        runValidators: true 
      }),
      ODAMissionContributionDetails.create({
        contribution:code.toUpperCase(),
        oda_username,
        amount:parseInt(amount),
        addedBy:sessionId,
        isDeleted:1
      })
    ]

    let promise=await Promise.allSettled(promises)

    if (!promise) {
      responseData.message='Invalid data'
      responseData.success=false
      return responseData
    } 

    responseData.success=true
    return responseData
  } catch (error) {
    responseData.message='Please try again later, an unknown error occurred'
    responseData.success=false
    return responseData
  }

}

export async function getODAMissionContributionNames (Params){

  let responseData={
      message:'',
      success:false,
      data:[]
  }

  let searchParams=Params.searchParams
  let status=Params.status
  let me=Params.me
  let mission=Params.mission
  let limit=Params.pageLimit
  let page=Params.page

  try {

    // await ODAMissionProjects.deleteMany()

    const matchQuery =
    searchParams === ''
        ? {}
        : {
            $or: [
              { name: { $regex: searchParams, $options: 'i' } },
              { code: { $regex: searchParams, $options: 'i' } },
            ],
        };
    
    const matchQueryRole =
      status === 'All'
        ? {}
        : {status};
    

    const matchQueryMission =
      mission === 'All'
      ? {}
      : 
      { mission }


    let pipeline=[
      {
        $match:{...matchQuery, ...matchQueryMission, ...matchQueryRole}
      },
      {
        $lookup: {
          from: 'misxions',
          localField: 'mission',
          foreignField: 'code',
          as: 'mission',
        },
      },
      {
        $unwind: { path: '$mission', preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: 'misxionadomemdas',
          localField: 'addedBy',
          foreignField: 'oda_username',
          as: 'addedBy',
        },
      },
      {
        $unwind: { path: '$addedBy', preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: 'misxionadomemdas',
          localField: 'updatedBy',
          foreignField: 'oda_username',
          as: 'updatedBy',
        },
      },
      {
        $unwind: { path: '$updatedBy', preserveNullAndEmptyArrays: true },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $group: {
          _id: null,
          pageCount: { $sum: 1 },
          documents: {
            $push: '$$ROOT',
          },
        },
      },
      {
        $unwind: '$documents',
      },
      {
        $skip:page * limit
      },
      {
        $limit:limit
      },
      {
          $project:{
            _id: 0,
            documents:{
              status:1,
              description:1,
              name:1,
              amount:1,
              code:1,
              createdAt:1,
              updatedAt:1,
              mission:{
                code:1,name:1
              },
              addedBy:{
                oda_username:1,
                first_name:1,
                middle_names:1,
                last_name:1,
              },
              updatedBy:{
                oda_username:1,
                first_name:1,
                middle_names:1,
                last_name:1,
              },
              
            },
            pageCount: 1,
          }
      }

    ]

    let aggregatedDocuments =await ODAMissionContributionName.aggregate(pipeline)

    let myContribution=[]

    await Promise.allSettled(
      aggregatedDocuments?.map(async({documents},index)=>{

        let collections=await ODAMissionContribution.findOne({contribution:documents?.code,oda_username:me})

        if (collections) {
          myContribution[index] = collections.amount;
        } else {
            myContribution[index] = 0;
        }
      })
    )

    let data = JSON.stringify(aggregatedDocuments);
    myContribution = JSON.stringify(myContribution);

    data = JSON.parse(data);
    myContribution = JSON.parse(myContribution);
    responseData.data={data,myContribution}

    return responseData
      
  } catch (error) {
      console.log(error);

      responseData.message='Please try again later, an unknown error occurred'
      responseData.success=false
      return responseData
  }


}

export async function getOneODAMissionContributionName (value){

  let responseData={
      message:'',
      success:false,
      data:[]
  }

  try {

    // await ODAMissionProjects.deleteMany()


    let pipeline=[
      {
        $match:{code: { $regex: value.code, $options: 'i' }, mission: { $regex: value.mission, $options: 'i' }}
      },
      {
          $project:{
            status: 1,
            name:1
          }
      },
      {
        $project:{
          _id: 0,
        }
    }

    ]

    let aggregatedDocuments =await ODAMissionContributionName.aggregate(pipeline)

    let data = JSON.stringify(aggregatedDocuments);

    data = JSON.parse(data);
    responseData.data=data

    return responseData
      
  } catch (error) {
      console.log(error);

      responseData.message='Please try again later, an unknown error occurred'
      responseData.success=false
      return responseData
  }


}

export const editODAMissionContributionName=async(value,status=false)=>{

    let responseData={
      message:'',
      success:false
    }

    let code=value.code
    let validate

    if (!status) {
      let toBeValidatedData={
        name:value.name,
        description:value.description,
        mission:value.mission,
        session:value.session,
      }
  
      validate=await newProjectValidation(toBeValidatedData)
  
      if (validate.error) {
        console.log(validate.error);
        responseData.message=validate?.error?.message     
        return responseData
      }
  
    }

    let name
    let description
    let sessionId

    if (!status) {
      name=validate?.value.name
      description=validate?.value.description
      sessionId=validate?.value.session
    }
    
    try {

      let filter={code}
      let update

      if (!status) {

        // const nameExist=await ODAMissionContributionName.findOne({name:{ $regex: name, $options: 'i' },mission:value.mission})

        // if (!nameExist) {
        //   responseData.message='Contribution name exist'
        //   responseData.success=false
        //   return responseData
        // } 

        update = {
          name,
          description,
          updatedBy:sessionId,
        };
      } else {

        update = {
          status:value.status,
          updatedBy:value.session,
        };
      }

      const updated=await ODAMissionContributionName.findOneAndUpdate(filter, update, {
        upsert: false, // Creates a new document when no document matches the query criteria
        new: true, // Returns the updated document
        runValidators: true // Applies Mongoose validators to the update operation
      })
      
      if (!updated) {
        responseData.message='Invalid data'
        responseData.success=false
        return responseData
      } 

      responseData.success=true
      return responseData
    } catch (error) {
      responseData.message='Please try again later, an unknown error occurred'
      responseData.success=false
      return responseData
    }

}

export const deleteODAMissionContributionName=async(value)=>{

  let responseData={
    message:'',
    success:false
  }

  let code=value.code
  
  try {

    let filter={code}

    const deleted=await ODAMissionContributionName.deleteOne(filter)
    
    if (!deleted) {
      responseData.message='Unknown error occured'
      responseData.success=false
      return responseData
    } 

    responseData.success=true
    return responseData
  } catch (error) {
    responseData.message='Please try again later, an unknown error occurred'
    responseData.success=false
    return responseData
  }

}

export async function getODAMissionContributions (Params){

  let responseData={
      message:'',
      success:false,
      data:[]
  }

  let searchParams=Params.searchParams
  let project=Params.project
  let limit=Params.pageLimit
  let page=Params.page

  try {

    // await ODAMissionProjects.deleteMany()

    const matchQuery =
    searchParams === ''
        ? {}
        : {
            oda_username: { $regex: searchParams, $options: 'i' },
        };
    
    let pipeline=[
      {
        $match:{contribution: { $regex: project, $options: 'i' }, ...matchQuery}
      },
      {
        $lookup: {
          from: 'misxionadomemdas',
          localField: 'oda_username',
          foreignField: 'oda_username',
          as: 'ODAMembers',
        },
      },
      {
        $unwind: { path: '$ODAMembers', preserveNullAndEmptyArrays: true },
      },
      {
        $sort: {
          updatedAt: -1,
        },
      },
      {
        $group: {
          _id: null,
          pageCount: { $sum: 1 },
          documents: {
            $push: '$$ROOT',
          },
        },
      },
      {
        $unwind: '$documents',
      },
      {
        $skip:page * limit
      },
      {
        $limit:limit
      },
      
      {
          $project:{
            _id: 0,
            documents:{
              amount:1,
              ODAMembers:{
                first_name:1,
                last_name:1,
                middle_names:1,
                oda_username:1,
              },
            },
            pageCount: 1,
          }
      }

    ]

    let aggregatedDocuments =await ODAMissionContribution.aggregate(pipeline)

    let data = JSON.stringify(aggregatedDocuments);

    data = JSON.parse(data);
    responseData.data=data

    return responseData
      
  } catch (error) {
      console.log(error);

      responseData.message='Please try again later, an unknown error occurred'
      responseData.success=false
      return responseData
  }


}

export async function getODAMissionContributionsDetails (Params){

  let responseData={
      message:'',
      success:false,
      data:[]
  }

  let oda_username=Params.searchParams
  let project=Params.project
  let limit=Params.pageLimit
  let page=Params.page

  try {

    // await ODAMissionProjects.deleteMany()
    
    let pipeline=[
      {
        $match:{contribution: { $regex: project, $options: 'i' }, oda_username: { $regex: oda_username, $options: 'i' }}
      },
      {
        $lookup: {
          from: 'misxionadomemdas',
          localField: 'oda_username',
          foreignField: 'oda_username',
          as: 'ODAMembers',
        },
      },
      {
        $unwind: { path: '$ODAMembers', preserveNullAndEmptyArrays: true },
      },
      {
        $sort: {
          updatedAt: -1,
        },
      },
      {
        $group: {
          _id: null,
          pageCount: { $sum: 1 },
          documents: {
            $push: '$$ROOT',
          },
        },
      },
      {
        $unwind: '$documents',
      },
      {
        $skip:page * limit
      },
      {
        $limit:limit
      },
      {
          $project:{
            _id: 0,
            documents:{
              amount:1,
              createdAt:1,
              ODAMembers:{
                first_name:1,
                last_name:1,
                middle_names:1,
                oda_username:1,
              },
            },
            pageCount: 1,
          }
      }

    ]

    let aggregatedDocuments =await ODAMissionContributionDetails.aggregate(pipeline)

    let data = JSON.stringify(aggregatedDocuments);

    data = JSON.parse(data);
    responseData.data=data

    return responseData
      
  } catch (error) {
      console.log(error);

      responseData.message='Please try again later, an unknown error occurred'
      responseData.success=false
      return responseData
  }


}
  
