const express=require("express")
const connectDB = require("./config/mongodb.config")
const UserRoute = require("./Routes/user.route")

require("dotenv").config()
const app=express()
app.use(express.json())
const port=process.env.PORT||3000
connectDB()
app.get("/test",(req,res)=>{
    try{
        res.status(200).json({message:"this is test route"})
    }catch(error){
        res.status(500).json({message:"Something went wrong "})
    }
    
})
app.use("/users",UserRoute)
app.use((req,res)=>{
    try{
        res.status(200).json({message:"This route is undefined"})
    }catch(error){
        res.status(500).json({message:"Something went wrong"})

    }
})
app.listen(port,()=>{
    console.log(`Authentication server is running on ${port}`)
})

