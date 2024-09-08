import mongoose, { mongo } from "mongoose";

const postSchema= new mongoose.Schema({
   caption:{type:String ,default:''},
   image:{type:String,required:true},
   author:[{type:mongoose.Types.ObjectId,ref:'User',required:true}],
   likes:[{type:mongoose.Types.ObjectId,ref:'User'}],
   comments:[{type:mongoose.Types.ObjectId,ref:'Comment'}]


},{timestamps:true});

export const Post=mongoose.model('Post',postSchema);