
import mongoose, { Schema, model, models } from 'mongoose'

const archDiocesSchema=new Schema({

    code:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
        trim:true,
        
    },
    nameLowerCase:{
        type:String,
        required:true,
        trim:true
    },
    incharge:{
        type:mongoose.Schema.Types.ObjectId,
        default:null,
    },
    country:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        trim:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ],
        
    },
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        default:null,

    },
    updatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        default:null,
    },
    __v:{
        type: Number,
        default:0,
        
    }
    
},{
    timestamps:true,
})

archDiocesSchema.index({code:1,nameLowerCase:1})


const Archdioces=models.DioxesArch || model("DioxesArch",archDiocesSchema)
module.exports=Archdioces