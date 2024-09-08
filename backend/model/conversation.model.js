import mongoose from "mongoose";
const conversationSchema= new mongoose.Schema({
participants: [{
    type:mongoose.Schema.Types.ObjectId, ref:'User'         // jo do log baat karenge unka id store kr lenege ham {chat group mai aur bhi log ho jayenge}
}],
messages:[{
    type:mongoose.Schema.Types.ObjectId, ref:'User'         // jo bhi messages honge wo store hoga
}]
})


export const Conversation=mongoose.model('Conversation',conversationSchema)