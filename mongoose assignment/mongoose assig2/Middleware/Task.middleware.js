const TaskModel=require("../model/Task.model")
const allPriorities=['low','medium','high'];
async function validateCreateTask(req,res,next){
    const {title,description,priority}=req.body;
    if(!title||!description||!priority){
        return res.status(400).json({msg:"Incomplete data Recived"})
    }
    if(!allPriorities.includes(priority)){
        return res.status(400).json({msg:"Invalid prority"})
    }
    

}