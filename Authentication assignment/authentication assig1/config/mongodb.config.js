const mongoose=require('mongoose')
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected to MongoDB successfully")
    }catch(error){
        console.log("Failed to connect db")
    }
}
module.exports=connectDB;