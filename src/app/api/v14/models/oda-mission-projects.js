import { Schema, model, models } from 'mongoose'

const projectSchema= new Schema({
    
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

projectSchema.index({code:1,mission:1,name:1})


const ODAMissionProjects=models.DOAMixionProjekt || model('DOAMixionProjekt',projectSchema);
module.exports=ODAMissionProjects