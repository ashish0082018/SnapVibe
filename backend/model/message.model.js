import mongoose from "mongoose";
const messageSchema= new mongoose.Schema({
   senderId:{
    type:mongoose.Schema.Types.ObjectId, ref:'User'          // keeping id of sender
   },
   receiverId:{
    type:mongoose.Schema.Types.ObjectId, ref:'User'        // keeping the id of receiver
},
   
message:{
    type:String,
    required:true
}
})

export const Message=mongoose.model('Message',messageSchema)