import bcrypt from 'bcryptjs'
import mongoose, { Schema, model, models } from 'mongoose'

const ODAMissionRegistrationSchema=new Schema({

    oda_username:{
        type: String,
        required:true,
    },
    username:{
        type: String,
    },
    first_name:{
        type: String,
        required:true,
    },
    middle_names:{
        type: String,
    },
    last_name:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        trim:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email"
        ],
    },
    contact:{
        type: Number,
    },
    mission1:{
        type:String,
        required:true,
    },
    mission2:{
        type:String,
    },
    category:{
        type: String,
        required:true,
        enum:['Deacon','Acolyte'],
    },
    password:{
        type: String,
        required:true,
    },
    addedBy:{
        type:String,
        default:null
    },
    updatedBy:{
        type:String,
        default:null
    },
    verified:{
        type: Boolean,
        enum:[true,false],
        default:false,
    },
    isDeleted:{
        type: Number,
        default:1,
    }
    
},{
    timestamps:true,
})

ODAMissionRegistrationSchema.index({user_name:1,mission:1,mission:1,isDeleted:1,first_name:1,last_name:1})


ODAMissionRegistrationSchema.pre('save', async function(next){

    if(!this.isModified('password')){
        return next()
    }

    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(this.password,salt)
    this.password=hashedPassword

    next()

})

const ODAMissionRegistration= models.MisxionADOMemda || model('MisxionADOMemda',ODAMissionRegistrationSchema)
module.exports=ODAMissionRegistration