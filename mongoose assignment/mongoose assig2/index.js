const express=require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const taskRoute=require("./route/Task.route")
const app=express()
app.use(express.json())
connectDB();
const port=process.env.PORT || 5000
app.use("/api",taskRoute)

app.get("/test",(req,res)=>{
    try{
        res.status(200).json({msg:"route is tested"})
    }catch(error){
        res.status(500).json({msg:"Something went wrong"})
        console.log(error.message)
    }

})




app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})