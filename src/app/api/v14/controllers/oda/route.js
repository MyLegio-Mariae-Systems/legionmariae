'use server'

import DbConnect, { DayTime, generateCode, getFirstAndLastWord, newMissionODAValidation, sendEmail, today } from "../../utills";
import Archdioces from '../../models/arch-dioces-registration'
import Dioces from '../../models/dicoes-registration'
import Mission from '../../models/mission-registration'
import ODA from '../../models/oda-mission-registration'
import ODAMissionOfficials from '../../models/oda-mission-officials'
import bcrypt from "bcryptjs/dist/bcrypt";

DbConnect()

let tokenId

async function generateUniqueUsername() {
    let oda_username;
    let random;
    do {
        random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
        oda_username = random ;
    } while (await ODA.findOne({ oda_username }));

    return oda_username;
}


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
          missionRegistered,
          category,
          username,
        }=validate.value
  
    //   const NullAddedBy = await Mission.findOne({ addedBy: null });
      
    //   if (NullAddedBy) {
    //     responseData.message='Access denied. Please register a member to proceed.'
    //     responseData.success=false
    //     return responseData
    //   }

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
      // Members.findOne({
      //   username,isDeleted:1
      // })
    ]

    const responses = await Promise.allSettled(promises);
  
    const data = responses.flatMap((response) =>
      [response.value]
    );

    if (missionRegistered==='true') {

      if (data[3]) {
        responseData.message='Member already exists.'
        responseData.success=false
        return responseData
      }

      

      
      ODA.update(
        { status: "inactive" },
        { $unset: { 
          email: "", 
          contact: "", 
          first_name: "", 
          last_name: "", 
          middle_names: "", 
        } },
        { multi: true }
      )

      ODA.update(
        {

        },
        {

        }
      )
     

      
    }

    
  
      // const emailName = await getFirstAndLastWord(name,true);
  
      
  
      
      // Using a transaction to ensure atomicity of operations
  
      try {
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
            username:null,
            // incharge: data[2] ? data[2]._id : tokenId,
            mission1: mission,
            mission2: null,
            category,
            email,
            contact,
            addedBy: tokenId || null,
            updatedBy: tokenId || null,
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

        responseData.message=error.message || 'Please try again later, an unknown error occurred'
        responseData.success=false
        return responseData
  
    }
}

// export const addODAMember=async(res,body)=>{

//   let {mission,id,category,role,official}=body

//   try {

//       if (mission.length===24) {
//           mission=await Mission.findById(mission)
//       } else {
//           mission=await Mission.findOne({code:upperCase(mission)})
          
//       }

//       let saved
//       let roleExist

//       if (category==='Priest') {

//           let userVerified=await Adult.findOne({_id:id,verified:true,__v:0})

//           if (!userVerified) {
//               return res.json({
//                   success:false,
//                   message:`Member's account is not active or verified.`
//               })
//           }
//       }

//       let memberExist=await ODA.findOne({levelId:mission._id,userId:id})

//       if (memberExist) {
//           return res.json({
//               success:false,
//               message:'Member is already registered'
//           })
//       }

//       if (category==='Priest') {
//           let roleMemberExist=await ODA.findOne({userId:id,role})

//           if (roleMemberExist) {
//               return res.json({
//                   success:false,
//                   message:`Member is already a ${role}`
//               })
//           }

//           roleExist=await ODA.findOne({levelId:mission._id,role})

//           if (roleExist) {
              
//               roleExist.userId=id || roleExist.userId,
//               roleExist.updatedBy=tokenId

//               await roleExist.save()

//               return res.json({
//                   success:true
//               })
//           }

//       }

//       saved=await ODA.create({
//           userId:id,
//           role,
//           official,
//           levelId:mission._id,
//           level:'Mission',
//           addedBy:tokenId,
//           updatedBy:tokenId
//       })

//       if (saved) {
          
//           return res.json({
//               success:true
//           })
//       }
//       else{
//           return res.json({
//               success:false,
//               message:'Invalid data'
//           })
//       }
      
//   } catch (error) {
//       console.log('Error=> '+error);
//       return res.json({message:'Server error occured',success:false})
//   }
// }

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
          $match:{...matchQuery, ...matchQueryCategory, isDeleted:1}
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
                primaryMission:{
                  code:1,name:1
                },
                secondaryMission:{
                  code:1,name:1
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

        responseData.message=error.message || 'Please try again later, an unknown error occurred'
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
              { mission1: mission },
              { mission2: mission },
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

    let data = {ODAMembers:JSON.parse(dataODA),Missions:JSON.parse(dataMissions)};
    responseData.data=data

    return responseData
      
  } catch (error) {
      console.log(error);

      responseData.message=error.message || 'Please try again later, an unknown error occurred'
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

      responseData.message=error.message || 'Please try again later, an unknown error occurred'
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

      responseData.message=error.message || 'Please try again later, an unknown error occurred'
      responseData.success=false
      return responseData

  }
}

export async function ODALogin(username, password, req) {
  try {
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

  
