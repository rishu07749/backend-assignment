require("dotenv").config();
const express=require("express")
const multer=require("multer")
const path=require("path")
const {v2: cloudinary}=require('cloudinary')
const app=express()
const port=5000;
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    
})