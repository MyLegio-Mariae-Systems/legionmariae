import { Schema, model, models } from 'mongoose'

const CalendarSchema=new Schema({

    ashWednesday:{
        type: Array,
        required:true,
    },
    downloads:{
        type: Array,
        required:true,
    },

},{
    timestamps:true,
})

const Calendar=models.kulenba || model("kulenba",CalendarSchema)
module.exports=Calendar