import { Schema, model, models } from 'mongoose'

const odaOfficialsSchema=new Schema({

    oda_username:{
        type: String,
        required:true,
    },
    role:{
        type: String,
        required:true,
    },
    mission:{
        type: String,
        required:true,
    },
    updatedBy:{
        type: String,
    },
    isDeleted:{
        type: Number,
        required:true,
    },

},{
    timestamps:true,
})

odaOfficialsSchema.index({oda_username:1,mission:1,role:1})

const ODAMissionOfficials=models.MisxionADOOffixial || model("MisxionADOOffixial",odaOfficialsSchema)
module.exports=ODAMissionOfficials