const mongoose=require("mongoose")
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connect to Mongodb successfully")

    }catch(error){
        console.log("Failed to connect db")
        console.log(error);
        console.log(process.env.MONGODB_URI)

    }
}
module.exports=connectDB;
