import mongoose from "mongoose";
const commentSchema= new mongoose.Schema({
    text:{type:String,required:true},   // jo bhi comment hoga wo 
    author:{type:mongoose.Schema.Types.ObjectId, ref:'User',required:true},    // keep the id of person who commented
    post:{type:mongoose.Schema.Types.ObjectId, ref:'Post',required:true}
})

export const Comment=mongoose.model('Comment',commentSchema)