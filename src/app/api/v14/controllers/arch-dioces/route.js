'use server'

import DbConnect, { DayTime, generateCode, getFirstAndLastWord, newArchDiocesValidation, sendEmail, today } from "../../utills";
import Archdioces from '../../models/arch-dioces-registration'

DbConnect()

let tokenId

async function generateUniqueCode(prefix) {
    let code;
    do {
        code = await generateCode(prefix);
    } while (await Archdioces.findOne({ code }));

    return code;
}

async function generateUniqueEmail(emailName) {
    let email;
    let random;
    do {
        random = Math.floor(Math.random() * (99 - 10)) + 10;
        email = (emailName + random + `.arch@legionmariae.com`).toLowerCase();
    } while (await Archdioces.findOne({ email }));

    return email;
}


export default async function NewArchDioces (value) {
    let responseData={
        message:'',
        success:false
    }
  
    try {

        const validate=await newArchDiocesValidation(value)

        if (validate.error) {
        console.log(validate.error);
        responseData.message='Fill in all fields.'      

        return responseData
        }

        let {name,country}=validate.value
  
      // const NullAddedBy = await Archdioces.findOne({ addedBy: null });
      
      // if (NullAddedBy) {
      //   responseData.message='Access denied. Please register a member to proceed.'
      //   responseData.success=false
      //   return responseData
      // }
  
      const emailName = await getFirstAndLastWord(name);
  
      let promises=[
        generateUniqueCode('A'),
        generateUniqueEmail(emailName),
        // Members.findOne({email:'info.legionmariae.com'})
      ]
  
      const responses = await Promise.allSettled(promises);
  
      const data = responses.flatMap((response) =>
        [response.value]
      );
      // Using a transaction to ensure atomicity of operations
  
      try {
        const existingArch = await Archdioces.findOne({ 
            name: { $regex: new RegExp('^' + name + '$', 'i') }, 
            country 
        });
        
        if (existingArch) {
            responseData.message='Arch Dioces name already exists.'
            responseData.success=false
            return responseData
        }
  
        const arch = await Archdioces.create(
          {
            code:data[0],
            name,
            // incharge: data[2] ? data[2]._id : tokenId,
            incharge: null,
            country,
            email:data[1],
            addedBy: tokenId || null,
            updatedBy: tokenId || null,
            subscription:await today(),
            isDeleted:1,
          }
        );
  
        if (!arch) {
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
          <h3>Registration of <b class='text-primary'>${arch.name} Arch Dioces</b></h3>
          <p>New arch dioces has been registered successfully.</p>
          <p>Registered By: <b>${fullname}</b></p>
          <p>Registered Date: <b>${await DayTime()}</b></p>
          
          <p>Kind Regards</p>
          <p>Legio Mariae</p>
        `;
        const subject = 'Arch Dioces Registration';
        const send_to = process.env.EMAIL_USER;
  
        await sendEmail(subject, message, send_to);

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

export async function getArchDioces_Select (){

    let responseData={
        message:'',
        success:false,
        data:[]
    }

    try {

        let pipeline=[
            {
                $project:{
                    code:1,
                    name:1,
                    country:1,
                }
            },
            {
                $project:{
                    _id:0,
                }
            }

        ]

        let aggregatedDocuments =await Archdioces.aggregate(pipeline)

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
  
