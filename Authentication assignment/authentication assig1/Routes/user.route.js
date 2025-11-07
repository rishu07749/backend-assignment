const express=require("express")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User = require("../models/user.model");

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const UserRouter=express.Router()
UserRouter.post("/signup",async(req,res)=>{
    try{
        const {name,email,password}=req.body;
         bcrypt.hash(password, saltRounds, async function(err, hash) {
        if(err){
            res.status(500).json({message:"Somthing went wrong"})
        }else{
             await User.create({name,email,password:hash})
             res.status(201).json({message:"signup successful"})
        }
        
    });
    }catch(error){
        res.status(500).json({message:"Something went wrong"})
    }
})
UserRouter.post("/login",async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email})
        if(!user){
            res.status(404).json({message:"User not found please signup"})
        }else{
            let hash=user.password;
             bcrypt.compare(password, hash, function(err, result) {
                console.log(result)
                var token = jwt.sign({ userId:user._id}, process.env.JWT_SECRET_KEY);
                console.log(token)

                res.status(200).json({message:"Login successful",token})
                
            });


        }
       

    }catch(error){

    }
})
module.exports=UserRouter;