const jwt=require("jsonwebtoken")
const AuthMiddleware=(req,res,next)=>{
    try{
        let token=req.headers?.authorization?.split(" ")[1];
    if(!token){
        res.status(401).json({message:"Access denied.No token provided. "})
       
    }
     var decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log("decoded token data",decoded); 
        req.user=decoded
        next();

    }catch(error){
        res.status(401).json({message:"Invalid or expired token"})
    }
    


}
module.exports=AuthMiddleware;