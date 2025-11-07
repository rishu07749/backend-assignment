const express=require("express")
const User=require("../Model/user.model")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const UserRoute=express.Router();
UserRoute.post("/signup",async(req,res)=>{
    try{
        const{name,email,password}=req.body
        bcrypt.hash(password, saltRounds,  async function(err, hash) {
            if(err){
                res.status(500).json({message:"Something went wrong"})
            }else{
                await User.create({name,email,password:hash})
                res.status(201).json({message:"signup successful"})
            }
            
        });


    }catch(error){
        res.status(500).json({message:"Something went wrong"})

    }
})
UserRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body
    let user=await User.findOne({email})
    if(!user){
        res.status(404).json({message:"User not found please signup again"})
    }else{
        let hash=user.password;
        bcrypt.compare(password, hash, function(err, result) {
            console.log(result)
            var token = jwt.sign({ userId:user._id }, process.env.JWT_SECRET_KEY);
            console.log(token)
            res.status(200).json({message:"Login successful",token})
            
        });
    }

})
module.exports=UserRoute;