import { Schema, model, models } from 'mongoose'

const contributionsSchema= new Schema({
    
    contribution:{
        type: String,
    },
    oda_username:{
        type: String,
    },
    amount:{
        type: Number,
    },
    updatedBy:{
        type:String,
    },
    isDeleted:{
        type: Number,
        default:1,
    }
    
},{
    timestamps:true,
})

contributionsSchema.index({contribution:1,oda_username:1})


const ODAMissionContributions=models.DOAMixionKontribiusion || model('DOAMixionKontribiusion',contributionsSchema);
module.exports=ODAMissionContributions