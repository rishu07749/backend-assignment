const mongoose=require("mongoose")
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to mongodb successfully")
    }catch(error){
        console.log("failed to connect db")
    }
}
module.exports=connectDB;
