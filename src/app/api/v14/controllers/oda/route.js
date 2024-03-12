'use server'

import DbConnect, { DayTime, generateCode, getFirstAndLastWord, newMissionODAValidation, sendEmail, today } from "../../utills";
import Archdioces from '../../models/arch-dioces-registration'
import Dioces from '../../models/dicoes-registration'
import Mission from '../../models/mission-registration'
import ODA from '../../models/oda-mission-registration'

DbConnect()

let tokenId

// async function generateUniqueCode(prefix) {
//     let code;
//     do {
//         code = await generateCode(prefix);
//     } while (await Mission.findOne({ code }));

//     return code;
// }

async function generateUniqueUsername(prefix) {
    let oda_username;
    let random;
    do {
        random = Math.floor(Math.random() * (999999 - 111111)) + 111111;
        oda_username = prefix + random ;
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
      generateUniqueUsername('O'),
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

export async function getODAMembers (){

    let responseData={
        message:'',
        success:false,
        data:[]
    }

    try {

        let pipeline=[
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
              $project:{
                  oda_username:1,
                  first_name:1,
                  last_name:1,
                  contact:1,
                  middle_names:1,
                  category:1,
                  primaryMission:{
                    code:1,name:1
                  },
                  secondaryMission:{
                    code:1,name:1
                  },
              }
          },
          {
              $project:{
                  _id:0,
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
  
