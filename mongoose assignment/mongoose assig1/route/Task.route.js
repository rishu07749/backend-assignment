const express=require("express")
const TaskModel = require("../model/Task.model")
const TaskRoute=express.Router()
TaskRoute.post("/Add-Task",async(req,res)=>{
    try{
        // const{title,description,status}=req.body;
        let newTask=await TaskModel.create(req.body)
        res.status(201).json({msg:"Task successfully",newTask})



    }catch(error){
        res.status(500).json({msg:"Something went wrong"})

    }

})
TaskRoute.get("/",async(req,res)=>{
    try{
        let tasks=await TaskModel.find({})
        res.status(200).json({msg:"Tasks list ",tasks})

    }catch(error){
        res.status(500).json({msg:"Something went wrong"})

    }
})
TaskRoute.patch("/update/:userId",async(req,res)=>{
    try{
        const {userId}=req.params
        const updatedTask=await TaskModel.findById(userId)
        if(!userId){
            res.status(404).json({msg:"Task not found"})
        }else{
            await TaskModel.findByIdAndUpdate(userId,req.body)
            res.status(200).json({msg:"Task Updated",updatedTask})
        }
    }catch(error){
        res.status(500).json({msg:"Something went wrong"})

    }
})
TaskRoute.delete("/delete/:userId",async(req,res)=>{
    try{
        const{userId}=req.body
        const Task=await TaskModel.findById(userId)
        if(!Task){
            res.status(404).json({msg:"Task not found"})
        }else{
            await TaskModel.findByIdAndDelete(userId)
            res.status(200).json({msg:"Task deleted",Task})
        }
    }catch(error){
        res.status(500).json({msg:"Something went wrong"})

    }
})



module.exports=TaskRoute;

