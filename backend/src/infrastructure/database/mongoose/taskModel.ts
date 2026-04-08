// const mongoose = require("mongoose");
import mongoose ,{Schema,Model,Document} from "mongoose";

export interface ITaskMongo extends Document{
    title:string,
    description:string,
    completed:boolean
}
const taskSchema = new Schema({
    _id: { type: String, required: true },
    title: { 
        type: String, 
        required: [true, 'Task title is required'], 
        trim: true 
    },
    description: { 
        type: String, 
        default: '' 
    },
    completed: { 
        type: Boolean, 
        default: false 
    },
},//options
{
    _id:false
}
)

export const taskModel = mongoose.model<ITaskMongo>("Task" , taskSchema)
