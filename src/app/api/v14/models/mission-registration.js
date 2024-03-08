
import mongoose, { Schema, model, models } from 'mongoose'

const missionSchema=new Schema({

    code:{
        type:String,
        required:true,
        
    },
    name:{
        type:String,
        required:true,
        
        trim:true
    },
    nameLowerCase:{
        type:String,
        required:true,
        
        trim:true
    },
    dioces:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        
    },
    incharge:{
        type:mongoose.Schema.Types.ObjectId,
        default:null,
        
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
        default:null

    },
    updatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        default:null

    },
    __v:{
        type: Number,
        default:0,
        

    }
    
},{
    timestamps:true,
    

})

missionSchema.index({code:1,nameLowerCase:1})

const Mission=models.Misxion || model("Misxion",missionSchema)
module.exports=Mission