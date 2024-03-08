
import mongoose, { Schema, model, models } from 'mongoose'

const diocesSchema=new Schema({

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
    archDioces:{
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

diocesSchema.index({code:1,nameLowerCase:1,archDioces:1})


const Dioces=models.Dioxes || model("Dioxes",diocesSchema)
module.exports=Dioces