'use server'

import mongoose, {connect, connection} from 'mongoose'
import { SMTPClient } from 'emailjs';
// import nodeMailer from 'nodemailer'
// import sanitizeHtml from 'sanitize-html';
// import Joi from 'joi';
// import moment from 'moment';
// import crypto from 'crypto';
// import {addMonths} from 'date-fns'
// import { NextResponse } from 'next/server';

// import jwt from 'jsonwebtoken'

// DB CONNECTION

const conn={
    isConnected:false,
    DB_URL:process.env.DB_URL
}

export default async function DbConnect(){

    let db
    try {

        if(conn.isConnected){
            // await sendEmail('LMACM Email Testing','I am testing email function','btgavygarvey@gmail.com')
            console.log("DB connected");
            return
        } 
        mongoose.set('strictQuery', false);
        if(conn.DB_URL) db=await connect(conn.DB_URL)
        conn.isConnected=db.connections[0].readyState
            // await sendEmail('LMACM Email Testing','I am testing email function','btgavygarvey@gmail.com')
            console.log("DB connected");
    } catch (error) {
        console.log("MongoDB error ", error);
    }
    
}

// SEND EMAIL

export async function sendEmail(subject,message,send_to){

    //Create Email transporter
    // const transporter=nodeMailer.createTransport({
    //     host:process.env.EMAIL_HOST,
    //     port:587,
    //     auth:{
    //         user:process.env.EMAIL_USER,
    //         pass:process.env.EMAIL_PASSWORD,
    //     },
    //     tls:{
    //         rejectUnauthorized:false
    //     }
    // })

    // // Options for sending email

    // const options={
    //     from:sent_from,
    //     to:send_to,
    //     subject:subject,
    //     html:message
    // }

    // //Send Email
    // transporter.sendMail(options,function(err,info){
    //     if (err) {
    //         console.log(err);
    //     }
        
    // })

    const client = new SMTPClient({
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD,
        host: process.env.EMAIL_HOST,
        ssl: true,
    });
    
    // send the message and get a callback with an error or details of the message that was sent
    client.send(
        {
            text: message,
            from: process.env.EMAIL_USER,
            to: send_to,
            cc: 'info.legiomariae@gmail.com',
            subject: subject,
        },
        (err, message) => {
            console.log(err || message);
        }
    );
}

export const sanitizeMessage=async(message) =>{
  // Define the allowed HTML tags and attributes
  const allowedTags = {
    allowedTags: ['div','h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'br', 'ul', 'ol', 'li'],
    allowedAttributes: {
      a: ['href'],
    },
  };

  const sanitizedMessage = sanitizeHtml(message, allowedTags);
  
  return sanitizedMessage;
}

// INPUT VALIDATION

export async function newButcheryValidation (data){
    const schema = Joi.object({
        subscription: Joi.number().required(),
        mobile: Joi.number().required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().required(),
        confirmPassword: Joi.string().trim().required(),
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().required(),
        country: Joi.string().trim().required(),
        isoCode: Joi.string().trim().required(),
        phoneCode: Joi.string().trim().required(),
        region: Joi.string().trim().required(),
        branch: Joi.string().trim().required(),
        terms: Joi.boolean().required(),
        role: Joi.string().trim().required(),
        name: Joi.string().trim().required(),
    });

    return schema.validate(data);
};

export async function newBranchValidation (data){
    const schema = Joi.object({
        name: Joi.string().trim().required(),
        id: Joi.string().trim(),
        butchery: Joi.string().trim().required(),
        region: Joi.string().trim().required(),
        package: Joi.number().required(),
        expiryDate: Joi.date().required(),
        mobile: Joi.number().required()
    });

    return schema.validate(data);
};

export async function newUserValidation (data){
    const schema = Joi.object({
        branch: Joi.string().trim().required(),
        nationalId: Joi.number(),
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().required(),
        mobile: Joi.string().trim().required(),
        salary: Joi.number().required(),
        password: Joi.string(),
        role: Joi.string().required().required(),
    });

    return schema.validate(data);
};

export async function newProductValidation (data){
    const schema = Joi.object({
        branch: Joi.string().trim().required(),
        name: Joi.string().trim().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
        link: Joi.boolean(),
        parent: Joi.any(),
        radio: Joi.any(),
    });

    return schema.validate(data);
};

export const sanitizeInput =async (input) => {
    // Remove unwanted characters and escape special characters
    const sanitizedInput = input
      .replace(/[^\w\s]/gi, '') // Remove characters other than word characters and spaces
      .replace(/'/g, '\\\'') // Escape single quotes
      .replace(/"/g, '\\\"'); // Escape double quotes
  
    return sanitizedInput;
};

// MIDDLEWARE

export async function MiddleWare(req,res,fn){

    return new Promise((resolve,reject)=>{
        fn(req,res,(result)=>{
            if(result instanceof Error){
                return reject(result)
            }
            return resolve(result)
        })
    })
}

export const upperCase=async (value)=>{
    return value.toUpperCase()
}

export const generateCode=async(value)=>{
    
    let code=value+crypto.randomBytes(3).toString('hex');
    code=code.trim().toUpperCase();
    return code;

}

export const generateId=async(value)=>{
    
    let code=value+crypto.randomBytes(11).toString('hex')+value;
    code=code.trim().toLowerCase();
    return code;

}

export const getFirstAndLastWord=async(value)=>{

    value=value.trim()
    const text=value.split(" ")
    var newText1=text[0]
    var newText2=text[text.length-1]

    var emailText=newText1

    if (newText2.trim() !== emailText.trim()) {
        emailText=emailText+'.'+newText2
    }
    return emailText.trim()
}

export const DayTime=async()=>{

    const dayTime=moment().format('LL')
    return dayTime
}

export const AddDate=async(from,value)=>{

    const today = new Date(from);
    const plusDate = addMonths(today, value);
    return plusDate
}

export async function setCookies(value) {
 
    // Setting cookies on the response using the `ResponseCookies` API
    const response = NextResponse.next()
    response.cookies.set('access', value)
    // response.cookies.set('session', value.session)
    response.cookies.set({
      name: 'access',
      value: value,
      path: '/sc/',
    })
    // response.cookies.set({
    //   name: 'session',
    //   value: value.session,
    //   path: '/',
    // })
  
    // let cookie = response.cookies.get('access')
    // console.log(cookie)
    // cookie = response.cookies.get('session')
    // console.log(cookie)
   
  }
  
export async function getCookies(request,value) {
      // Getting cookies from the request using the `RequestCookies` API
      let cookie = request.cookies.get(value)
      console.log(cookie) // => { name: 'nextjs', value: 'fast', Path: '/' }
      const allCookies = request.cookies.getAll()
  
     
      return cookie
}
  
export async function deleteCookies(request,value) {
      // Getting cookies from the request using the `RequestCookies` API
     
      request.cookies.has(value) // => true
      request.cookies.delete(value)
      request.cookies.has(value) // => false
     
}
