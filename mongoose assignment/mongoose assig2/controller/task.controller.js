const TaskModel=require("../model/Task.model");
async function createTask(req,res) {
    try{
        const {title,description,priority,dueDate}=req.body
        const task =await TaskModel.create({title,description,priority,dueDate:dueDate||null})
        res.status(201).json({msg:"Task Created",task})


    }catch(error){
        res.status(500).json({msg:"task must be unique"})

    }
    
}
async function getTask(req,res){
    try{
        const{priority,status}=req.query;
        const filter={}
        if(priority){
            filter.priority=priority;

        }
        if(status){
            if(status==='completed'){
                filter.isCompleted=true;
            }else{
                if(status==='pending'){
                    filter.isCompleted=false;
                }
            }
        }
        const tasks=await TaskModel.find(filter).sort({createdAt:-1});
        res.status(200).json({msg:"count:tasks.length",tasks})
    }catch(error){
        res.status().json({msg:"invalid priority and status"})

    }
}
async function updateTask(req,res){
    try{
        const id=req.params.id;
        const updates=req.body;
        if(updates.isCompleted==true){
            updates.completionDate=new Date()
        }else if(updates.isCompleted==false){
            updates.completionDate==null;
        }
        const updated=await TaskModel.findByIdAndUpdate(id,updates,{new:true,runValidators:true});
        res.status(200).json({msg:"Task updated",updated})
    }catch(error){
        res.status().json({msg:"invalid id "})
    }
}
async function deleteTasks(req,res){
    try{
        const{priority}=req.query;
        if(!priority){
            return res.status().json({msg:"please enter low medium high prority"})
        }
        const result=await TaskModel.deleteMany({priority})
        res.status(200).json({msg:"Deleted"} `tasks with priority ${priority}` )
    }catch(error){
        res.status(400).json({msg :"wrong prority"})
    }

}
module.exports={createTask,getTask,updateTask,deleteTasks}