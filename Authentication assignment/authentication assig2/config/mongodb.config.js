const mongoose=require("mongoose")
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected to Mongodb successfully")

    }catch(error){
        console.log("connection failed to db")

    }
}
module.exports=connectDB;