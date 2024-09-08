import express, { urlencoded } from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import postRoute from "./routes/post.route.js"
import messageRoute from "./routes/message.route.js"



dotenv.config({})      // we include all the env files 
const app=express()

const PORT= process.env.PORT || 3000;     // .env se port lo ya fir 3000 
app.get('/',(req,res)=>{
    return res.status(200).json({
        message: "This is come from backend",
        success: true
    })
})

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended: true}))    // use this to use nested object jason


const corsOptions={
    origin:'http://localhost:5173',      // for the react connection we use this origin
    credentials: true
}
app.use(cors(corsOptions))



// write all the api here

app.use("/api/v1/user",userRoute);
app.use("/api/v1/post",postRoute);
app.use("/api/v1/message",messageRoute);



app.listen(PORT,()=>{
    connectDB()
    console.log(`server run at port ${PORT}`)
})