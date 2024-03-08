import bcrypt from 'bcryptjs'
import mongoose, { Schema, model, models } from 'mongoose'

const ODAMissionRegistrationSchema=new Schema({

    username:{
        type: String,
    },
    id:{
        type: mongoose.Schema.Types.ObjectId,
    },
    first_name:{
        type: String,
        required:[true,'Please enter first name'],
    },
    last_name:{
        type: String,
        required:[true,'Please enter last name'],
    },
    email:{
        type: String,
        required:[true,'Please enter your email'],
        trim:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email"
        ],
    },
    first_contact:{
        type: Number,
        required:true,
    },
    mission1:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    mission2:{
        type:mongoose.Schema.Types.ObjectId,
    },
    category:{
        type: String,
        required:[true,'Please choose category'],
        enum:['Deacon','Acolyte'],
    },
    password:{
        type: String,
        required:[true,'Please enter a password'],
        minLength:[8,"Password must be atleast 8 characters"],
    },
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        default:null
    },
    updatedBy:{
        type:mongoose.Schema.Types.ObjectId,
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

ODAMissionRegistrationSchema.index({username:1,mission:1,mission:1,isDeleted:1})


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