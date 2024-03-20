import { Schema, model, models } from 'mongoose'

const contributionSchema= new Schema({
    
    code:{
        type: String,
    },
    name:{
        type: String,
    },
    amount:{
        type: Number,
    },
    addedBy:{
        type:String,
    },
    updatedBy:{
        type:String,
    },
    status:{
        type:Number,
        default:1,
    },
    mission:{
        type:String,
    },
    description:{
        type: String,
    },
    isDeleted:{
        type: Number,
        default:1,
    }
    
},{
    timestamps:true,
})

contributionSchema.index({code:1,mission:1,name:1})


const ODAMissionContribution=models.DOAMixionKontribusionNem || model('DOAMixionKontribusionNem',contributionSchema);
module.exports=ODAMissionContribution