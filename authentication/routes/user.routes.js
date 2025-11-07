const express = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const UserRouter= express.Router();
UserRouter.post("/signup",async(req,res)=>{ 
    try{
        const {username,email,password,role}=req.body;
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            if(err){
                res.status(500).json({message:"Something went wrong"});
            }else{
                // console.log("rawpassword:->",password,"hashed password:->",hash);
                await User.create({username,email,password:hash,role});
                res.status(201).json({message:"signup successful"}); 
            }
    // Store hash in your password DB.
});

    }catch(error){
        res.status(500).json({message:"Something went wrong"});

    }
})
UserRouter.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body
        let user=await User.findOne({email});
        if(!user){
            res.status(404).json({message:"User not found please signup"}); 
        }else{
            let hash=user.password;
             bcrypt.compare(password, hash).then(function(result) {
                console.log(result)
                if(result==true){
                    var token = jwt.sign({ userId:user._id,role:user.role }, process.env.JWT_SECRET_KEY);
                    console.log(token)
                res.status(200).json({message:"login successful",token});
                }else{
                    res.status(401).json({message:"Invalid credentials"});
                }
        });
        }
       

    }catch(error){
         res.status(500).json({message:"Something went wrong"});
    }
})


module.exports=UserRouter;