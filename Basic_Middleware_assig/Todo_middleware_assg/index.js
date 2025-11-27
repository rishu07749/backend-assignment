const express =require("express")
const app = express()
app.use(express.json())
 const validateInput=(req,res,next)=>{
     const {ID,Name,Rating,Description,Genre,Cast}=req.body;
     if(typeof ID!=='number'||typeof Rating!=="number"){
        return res.status(400).send( "bad request. some data is incorrect")
     }
         
     if(typeof Name!=='string'||typeof Description!=="string"|| typeof Genre!=='string' ){
         return res.status(400).send( "bad request. some data is incorrect")
     }
    //  every check every item string or not 
        
    if(Array.isArray(Cast) && !cast.every(item=>typeof item==='string')){
            return res.status(400).send( "bad request. some data is incorrect")

    }
    next();

        

 }  
 app.post("/",validateInput,(req,res)=>{
    res.status(200).send("data recevied")
 })
const port =3000;

 app.listen(port,()=>{
    console.log("Listening to  server running on http://localhost:${port}")
 })