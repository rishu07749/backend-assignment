const mongoose=require("mongoose")
const taskSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    status:{type:String,required:true},
    duedate:{type:Date,required:true}

})
const TaskModel=mongoose.model("Task",taskSchema)
module.exports=TaskModel;
