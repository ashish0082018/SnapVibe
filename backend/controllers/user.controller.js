import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { Post } from "../model/post.model.js";


//REGISTER functions
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      // if any field is empty then this will return
      return res.status(401).json({
        message: "Something went wrong",
        success: false,
      });
    }
    // checking in the User model in databse,whether the user already exists or not
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "You already registered",
        success: false,
      });
    }
    // if the user is not present ,then move to registration
    // hash the password and then save to the database
    const hashedpassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashedpassword,
    });

    return res.status(401).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};




// LOGIN Function

export const login = async(req,res)=>{
    try{
        const {email,password}=req.body;
        if (!email || !password) {
            // if any field is empty then this will return
            return res.status(401).json({
              message: "Something went wrong",
              success: false,
            });
          }

   let user=await User.findOne({email});
   //if user does not exists then ask him to create account or incorrect email or password
   if(!user){
     return res.status(401).json({
        message: "Incoorect email or password",
        success: false
      });
   }

   const isPasswordMatch= await bcrypt.compare(password,user.password)
//if password does not match then return this .. 
   if(!isPasswordMatch){
    return res.status(401).json({
       message: "Incoorect email or password",
       success: false
     });
  }

  //populate each post id of the post array :Jab user login krega tho usko uske sare post dickenege, As all the ids are saved in the posts arrsy of user, so we populatr them

  const populatedUser= await Promise.all(              // we use promise.all() ,othereise har ak user ke liye await lagana padtha
    user.posts.map(async (postId)=>{
      const post=await Post.findById(postId);
      if(post.author.equals(user._id)){            // only return the author s post (loged in user)
        return post; 
      }
      return null;
    })
  )
user={
    _id:user._id,
    username:user.username,
    email:user.email,
    profilePicture:user.profilePicture,
    bio:user.bio,
    followers:user.followers,
    followings:user.followings,
    posts:populatedUser
}


  //generating token function
const token= await jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:'1d'});
 // we secure the coookie so that no one can steal the cookie
return res.cookie('token',token,{httpOnly:true,sameSite:'strict',maxAge:1*24*60*60*1000}).json({    
    message: `Welcome back ${user.username}`,
    success:true,
    user    // return the user object which contains all the informations regarding username, likes,followers..etc
})    


    }
    catch(error){
        console.log(error)
    }
}


//LOGOUT  function

export const logout= async (req,res)=>{
  try{
    res.cookie("Token","",{maxAge:0}).json({
        message:"Logged Out Successfully",
        success:true
    })
  }
  catch(error){
    console.log(error);
  }
}


// PROFILE FUNCTION
export const getProfile=async (req,res)=>{
    try{
        const userId=req.params.id;
        let user = await User.findById(userId).select('-password');     // we search the user by its id in the User  database 
        return res.status(200).json({
            user,
            success:true
        })
    }
    catch(error){
        console.log(error);
    }
}


//Edit profile function 

// we can only edit the own profile, this ca be done with the use of the token.Use the aunthecation
export const editProfile=async (req,res)=>{ 
 try{
  const userId=req.id;    // we get the id of logged in user
 const {bio,gender}=req.body;    
 const profilePicture=req.file;   // jo bhi file frontend pr upload hogi wo req,file se milti h 
  let cloudResponse;
  if(profilePicture){
    const fileUri=getDataUri(profilePicture);
    cloudResponse=  await cloudinary.uploader.upload(fileUri);
  }

  // Finding or selecting the user , whose profile is to update !
  const user= await User.findById(userId).select('-password');   // we get user
  if(!user){
    return res.status(404).json({
        message:"User not found",
        success:false
    })
  }
  // Jo jo user ka present hoga wo change kr do basically
  if(bio) user.bio=bio;
  if(gender) user.gender=gender;
  if(profilePicture) user.profilePicture=cloudResponse.secure_url;

  await user.save();   // save the updated profile of user 
  return res.status(200).json({
    message:"Profile updated",
    success:true,
    user
})


next()
 }
 catch(error){
    console.log(error)
 }
}


// Suggested user function 

export const getsuggestedUser= async (req,res)=>{
  try{
    const suggestedUser= await User.find({_id:{$ne:req.id}}).select("-password");
    if(!suggestedUser){
      return res.status(400).json({
        message: "Currently do not have user"
      })
    }

    return res.status(200).json({
      success:true,
      user:suggestedUser
    })
  }
  catch(error){
    console.log(error);
  }
}

//List of all followers and unfollower 

export const followOrUnfollow = async (req,res)=>{
  try{
  const followPerson=req.id;    // mai khud hunga , jo login user h wo req.id se miljayega
  const toFollow= req.params.id;    // receives the id of person from params , jisko follow krna h 
if(followPerson ===toFollow){
  return res.status(400).json({
    message:"You cannot follow yourself",
    success:false
  })
}

// Next aim too write function to check whether the person is already follow or not
const user= await User.findById(followPerson);   // now finding the loged in user id
const target= await User.findById(toFollow);  // finding the id jisko follow krna h 

if(!user && !target){
  return res.status(400).json({
    message:"User not found",
    success:false
  })
}

// now check kro ki follow krna h ki unfollow
const isFollowing=user.following.includes(toFollow)    // check kro tofollow id ko loged in user ke following array mai h ki nhi  i.e user.following.include() , use the include() method
 if(isFollowing){
  // already following mai h , so unfollow it
  await Promise.all([                                                   // using the promise.all([]) because we handle two differnt arrays of two different user(follow krne wla and kisko follow kra) model simultaneously
    User.updateOne({_id:followPerson},{$pull: {following:toFollow}}),      // pull: remove the person form following : 
    User.updateOne({_id:toFollow},{$pull: {followers:followPerson}})       // 
  ])
  return res.status(200).json({message:"Unfollowed successfully",success:true});
 }
 else{
  //do not follow, then follow 
  await Promise.all([
    User.updateOne({_id:followPerson},{$push:{following:toFollow}}),    // loged in user ke following mai dal do 
    User.updateOne({_id:toFollow},{$push:{followers:followPerson}})     // Jisko follow kiya uske followers mai loged in user ko dal do 
  ])
  return res.status(200).json({message:"Followed successfully",success:true});

 }

}  
  catch(error){
    console.log(error)
  }
}