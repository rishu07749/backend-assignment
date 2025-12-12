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
    try{
      const existing=await TaskModel.findOne({title});
      if(existing){
        return res.status(409).json({message:"Task title must be unique.Task title already exist"})
      }
      next()
        
    }catch(err){
      next(err);


    }
    

}
async function validateUpdateTask(req,res,next){
  const allowedFields=['title','priority','description','isCompleted'];
  const updateKeys=Object.keys(req.body);
  for(const key of updateKeys ){
    if(!allowedFields.includes(key)){
      return res.status(400).json({message:"Invalid update fields"})
    }
  }
  if(req,body.priority && !allPriorities.includes(req.body.priority)){
    return res.status(400).json({message:"Invalid priority"})
  }
  if(req.body.title){
    try{
      const existing =await TaskModel.findOne({titel:req.body.title});
      if(existing && existing._id.toString()!== req.params.id){
        return res.status(409).json({message:"Task title must be unique."})
      }


    }catch(err){
      return next(err)

    }
  }
  next();

}
module.exports={validateCreateTask,validateUpdateTask}

