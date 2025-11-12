const express=require("express")
require("dotenv").config();
const app=express()
const port=process.env.PORT || 3000
app.use(express.json())
app.get("/",(req,res)=>{
    try{
        res.status(200).json({msg:"route is tested"})
    }catch(error){
        res.status(500).json(msg:)
    }

})
app.listen(PORT,()=>{
    console.log(`server is running on ${port}`)
})