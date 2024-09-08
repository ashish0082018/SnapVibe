import {Conversation} from "../model/conversation.model.js"
import { Message } from "../model/message.model.js";


//FOr chatting



export const sendMessage= async (req,res)=>{
    try{
const senderId=req.id;   // logge in user
const receiverId=req.params.id;
const {message}=req.body;

let conversation=await Conversation.findOne({
    participants:{$all:[senderId,receiverId]}
})
// Establish the conversation if not started yet

if(!conversation){
    conversation= await Conversation.create({
        participants:[senderId,receiverId]
    })
}
const newMessage=await Message.create({
    senderId,
    receiverId,
    message
})
if(newMessage) conversation.messages.push(newMessage._id);

// await conversastion.save()
// await newMessage.save()    
// instead of writing two lies , simply do in one line by promise, pass the save() into the array

await Promise.all([conversation.save(),newMessage.save()]);

// Implement soket io for real time data transfer 

return res.status(201).json({
    success:true,
    newMessage
})
    }
    catch(error){
        console.log(error);
    }
}


//Message : Only receive the message between sender (logged in user) and the receiver. {koi dusre ka message nhi aana chahiye}

export const getMessage= async (req,res)=>{
    try{
const senderId=req.id;   // logge in user
const receiverId=req.params.id;
const conversastion=await Conversation.find({
    participants:{$all:[senderId,receiverId]}
})
if(!conversastion) return res.status(200).json({success:true,message:[]});
return res.status(200).json({success:true,messages:conversastion?.messages})   // using ?.messages 


    }
    catch(error){
        console.log(error);
    }
}