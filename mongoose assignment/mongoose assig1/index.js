const express=require("express")
const TaskRoute=require("./route/Task.route")
const connectDB = require("./config/mongodb.config")

require('dotenv').config();
const app=express()

connectDB();

app.use(express.json())
app.use("/Task",TaskRoute)
app.get("/test",(req,res)=>{
    try{
        res.status(200).json({msg:"Route tested"})

    }catch(error){
        res.status(500).json({msg:"Something went wrong"})

    }
})

app.listen(3000,()=>{
    console.log("server is working on 3000")
})