import jwt from "jsonwebtoken";

// making the middleware which checks the user is logged in or not
const isAuthenticated=async (req,res,next)=>{
    try{
        const token=req.cookies.token    // we get the token from the cookies
        if(!token){
            return res.status(401).json({
                message:"User not authenticated",
                success:false
            })
        }
        // Now we will check/verify the user
        const decode= await jwt.verify(token,process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Invalid",
                success:false
            })
        }
        req.id=decode.userId;   // lastly we save the logged in user id .Since token mai user id store h , uss id se user ko acces kiya ja skta h
        next();
    }
    catch(error){
        console.log(error);
    }
}

export default isAuthenticated