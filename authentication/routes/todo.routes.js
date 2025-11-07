const express = require('express');
const { authMiddleware } = require('../middlewaare/auth.middleware');
const TodoModel = require('../models/todo.model');
const TodoRouter= express.Router();
TodoRouter.post("/add-todos",authMiddleware,async(req,res)=>{
    try{
        let todo =await TodoModel.create({...req.body,userId:req.user});
        res.status(201).json({message:"Todo added ",todo});
    }catch(error){
        res.status(500).json({message:"Something went wrong"});
    }
})
TodoRouter.get("/my",authMiddleware,async(req,res)=>{
  try{ 
    let todos=await TodoModel.find({userId:req.user})
    res.status(200).json({message:"Todo List",todos})
  } catch(error){
    res.status(500).json({message:"Something went wrong"});
  } 
})
module.exports=TodoRouter;