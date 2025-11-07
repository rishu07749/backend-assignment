const express=require("express")
// require("dotenv").config()
require("dotenv").config();

const UserRouter = require("./Routes/user.route")
const connectDB = require("./config/mongodb.config");
const Authmiddleware = require("./middleware/Auth.middleware");
const app=express()
app.use(express.json())
connectDB();
const port =process.env.PORT||5000
app.get("/test",(req,res)=>{
    try{
        res.status(200).json({message:"this is test route"})
    }catch(error){
        res.status(500).json({message:"something went wrong"})

    }
})
app.use("/users",UserRouter)
app.get("/protected",Authmiddleware,(req,res)=>{
    res.json({message:"you have access!",user:req.user})
});

app.use((req,res)=>{
    try{
        res.status(404).json({message:"This request is undefined"})
    }catch(error){
        res.status(500).json({message:"Somthing went wrong "})

    }
})
app.listen(5000,()=>{
    console.log(`Authentication serveris running on ${port}`)
})


