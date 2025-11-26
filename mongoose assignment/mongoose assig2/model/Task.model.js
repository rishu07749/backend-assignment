const mongoose=require("mongoose")
const taskSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    priority:{type:String,enum:['Low','Medium','High'],default:'Medium'},
    isCompleted:{type:Boolean,default:false},
    completionDate:{type:Date,default:null},
    dueDate:{type:Date,required:true}

})
const TaskModel=mongoose.model('Task',taskSchema);
module.exports=TaskModel