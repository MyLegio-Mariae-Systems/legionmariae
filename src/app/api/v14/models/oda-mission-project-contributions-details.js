import { Schema, model, models } from 'mongoose'

const projectContributionsSchema= new Schema({
    
    project:{
        type: String,
    },
    oda_username:{
        type: String,
    },
    amount:{
        type: Number,
    },
    addedBy:{
        type:String,
    },
    isDeleted:{
        type: Number,
        default:1,
    }
    
},{
    timestamps:true,
})

projectContributionsSchema.index({project:1,oda_username:1})


const ODAMissionProjectContributionsDetails=models.DOAMixionProjektKontribiusionDiteil || model('DOAMixionProjektKontribiusionDiteil',projectContributionsSchema);
module.exports=ODAMissionProjectContributionsDetails