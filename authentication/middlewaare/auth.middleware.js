const jwt = require('jsonwebtoken');
const authMiddleware=(role)=>{
    return (req,res,next)=>{
    let token=req.headers?.authorization?.split(" ")[1];
    if(token){
        var decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log("decoded token data ",decoded);
        if(decoded){
            if(role==decoded.role){
                req.user=decoded.userId;
                next();
            }else{
                res.status(401).json({message:"unauthorized"})
            }
            
        }else{
            res.status(401).json({message:"Unauthorized , please login"});
        }

        // console.log("pass through the authmiddleware ")
    }else{
        res.status(401).json({message:"Unauthorized , please login"});
    }
    
}
}

module.exports={authMiddleware};