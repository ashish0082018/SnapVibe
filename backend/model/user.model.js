import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username:{type:String, required:true, unique:true,minimum:7},
    email:{ type: String ,required:true,unique:true },
    password:{ type: String ,required:true },    // password need not be unique.
    profilePicture:{type:String, default:''},    // default mai koi photo nhi hoga
    bio:{type:String , default:''},
    gender:{type:String,enum:['male','female']},
    followers:[{ type:mongoose.Schema.Types.ObjectId, ref:'User' }],   // we keep the id_ of users in the array who follows the main user, we can access the follow user by its id. {Basically we keep the referance of the other user id in the array}
    following:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    posts:[{type:mongoose.Schema.Types.ObjectId, ref:'Post'}],
    bookmarks:[{type:mongoose.Schema.Types.ObjectId,ref:'Post'}]
},{timestamps:true});     // jaise hi user create hoga wase hi time us user ka time record hojaye

const User = mongoose.model('User', userSchema);

export default User;
//export const User = mongoose.model('User',userSchema)    // in database a table of Users name is created