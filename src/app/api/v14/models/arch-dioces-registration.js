
import { Schema, model, models } from 'mongoose'

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
    incharge:{
        type:String,
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
        type:String,
        default:null,
    },
    updatedBy:{
        type:String,
        default:null,
    },
    subscription:{
        type:String,
        required:true,
    },
    isDeleted:{
        type: Number,
        default:1,
    }
    
},{
    timestamps:true,
})

archDiocesSchema.index({code:1,name:1})


const Archdioces=models.DioxesArch || model("DioxesArch",archDiocesSchema)
module.exports=Archdioces