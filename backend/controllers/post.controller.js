// ADDING POST
import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";
import { Post } from "../model/post.model.js";
import User from "../model/user.model.js";
import { Comment } from "../model/comment.model.js";

export const addNewPost= async (req,res)=>{
    try{
    const  {caption} =req.body;   // get caption of post from post req
    const image=req.file;         // get uploaded file by req.file
    const authorId=req.id;        // get the id of user who upload post
    if(!image){
        return res.status(400).json({message: "Image Required"});
    }
    
    // optimizing the uploaded image (we will optimize the image before upload)
    const optimizedImageBuffer= await sharp(image.buffer)
    .resize({width:800,height:800,fit:'inside'})
    .toFormat('jpeg',{quality:80})
    .toBuffer();

    //Converting buffer to dataUri
const fileUri=`data:image/jpeg:base64,${optimizedImageBuffer.toString('base64')}`
const cloudResponse=await cloudinary.uploader.upload(fileUri);
// Creating the post in database
const post= await Post.create({
    caption,
    image:cloudResponse,
    author:authorId
})

//Now the post is created , so we will save the post id in the User profile
const user= await User.findById(authorId);

if(user){
    user.posts.push(post._id);
    await user.save();                         // .save() method is importtant otherwise mongodb mai save nhi hoga 
}

await post.populate({path:'author',select:'-password'});   // password chood ke sab aa jayega i.e show hoga

return res.status(201).json({
    message:"New Post Created",
    post,
    success:true
})

    }
    catch(error){
        console.log(error);
    }
}


// ACCESS ALL THE POSTS WHICH YOU SEE IN YOUR FEED
//Access all the post and its comments
export const getAllPost= async (req,res)=>{
    try{
        const posts=await Post.find().sort({createdAt:-1}).populate({path:'author',select:'username,profilePicture'})
        .populate({
            path:'comments',
            sort:{createdAt:-1},
            populate:{
                path:'author',
                select:'username,profilePicture'
            }

        })
        return res.status(200).json({
            posts,
            success:true
        })
    }
    catch(error){
        console.log(error);
    }
}

//ACCESS ALL THE POSTS OF THE PARICULAR USER
export const getUserPost= async (req,res)=>{
    try{
const authorId =req.id;
const posts=await Post.find({author:authorId}).sort({createdAt:-1}).populate({
    path:'author',
    selecct:'username,profilePicture'
}).populate({
    path:'comments',
    sort:{createdAt:-1},
    populate:{
        path:'author',
        select:'username,profilePicture'
    }
})
return res.status(200).json({
    posts,
    success:true
})
    }
    catch(error){
        console.log(error);
    }
}


//like the post

export const likePost= async (req,res)=>{
    try{

const personWhoLike=req.id;   // whi user jo login hoga
const postId = req.params.id;
const post = await Post.findById(postId);
if(!post){
    return req.status(404).jason({message: "Post not found",success:fasle});
}

// logic for LIke 
await post.updateOne({$addToSet :{likes: personWhoLike}});     // we use set to store the unique id , as only one like can a user do 
await post.save();
 
// implement soket io for time notification




return res.status(200).json({message:"Post liked",success:true});

    }
    catch(error){
        console.log(error);
    }
}



//DISlike the post

export const dislikePost= async (req,res)=>{
    try{

const personWhoLike=req.id;   // whi user jo login hoga
const postId = req.params.id;
const post = await Post.findById(postId);
if(!post){
    return req.status(404).jason({message: "Post not found",success:fasle});
}

// logic for LIke 
await post.updateOne({$pull :{likes: personWhoLike}});
await post.save();      

// implement soket io for time notification




return res.status(200).json({message:"Post disliked",success:true});

    }
    catch(error){
        console.log(error);
    }
}


// ADD COMMENTS

export const addComment= async (req,res)=>{
    try{

const postId=req.params.id;    // kis post pr comment kena h wo select kro 
const commentUser=req.id;
const {text}=req.body;
const post=await Post.findById(postId);    // finding the post jiskpe comment kiya , in the database named Post
if(!text) return res.status(400).json({message:"Write something ... ",success:fasle});

const comment=await Comment.create({
    text,
    author:commentUser,
    post:postId
}).populate({
    path:'author',
    select:"username,profiePicture"
});

// Now adding the comment in the post model comment array  {because har ak post ke neche jitne bhi comment honge wo sab dickhe}
post.comments.push(comment._id);
await post.save();

return res.status(201).json({
    message:"Comment Added",
    comment,
    success:true
})
    }
    catch(error){
        console.log(error);
    }
}





export const getCommentsOfPost= async (req,res)=>{
    try{
const postId=req.params.id;
const comments=await Comment.find({post:postId}).populate('author','username','profilePicture');
if(!comments) return res.status(404).json({message:"No comments found fot this post",success:false});

return res.status(200).json({success:true,comments});
    }
    catch(error){
        console.log(error);
    }
}


export const deletePost=async (req,res)=>{
    try{
const postId=req.params.id;
const authorId=req.id;

const post =await Post.findById(postId);
if(!post) return res.status(404).json({message:"Post Not found",success:false});

//Only the owner of post will delete the post , i.e logged in user keval apna post delete kr skta h

if(post.author.toString()!== authorId) return res.status(403).json({message:"Unauthorized"});

//Delete the post
await Post.findByIdAndDelete(postId);


//Also delete the post from users post array
let user=await User.findById(authorId);
user.posts=user.posts.filter(id=>id.toString()!== postId);
await user.save();

// Delete all the comments of the post
await Comment.deleteMany({post:postId})

return res.status(200).jason({
    success:true,
    message:'Post deleted'
})

    }
    catch(error){
        console.log(error);
    }
}


// Bookmarks 


export const BookmarkPost=async (req,res)=>{
    try{
const postId=req.params.id;
const authorId= req.id;
const post=await Post.findById(postId);
if(!post) return res.status(404).jason({message:"Post not found",success:false});

const user=await User.findById(authorId);
if(user.bookmarks.includes(post._id)) {
    // already post is present in bookmark =>Remove from the bookmark
await user.updateOne({$pull:{bookmarks:post._id}});
await user.save();

return res.status(200).json({type:'unsaved',message:'Post removed from bookmarks',success:true})

}
else{
    //Do book mark
await user.updateOne({$addToSet:{bookmarks:post._id}});
await user.save();

return res.status(200).json({type:'saved',message:'Post bookmarked',success:true});

}

    }
    catch(error){
        console.log(error);
    }
}