const express=require('express');
const TaskModel=require('../model/Task.model');
const router =express.Router();
const { createTask,getTask,updateTask,deleteTasks}=require("../controller/task.controller")
router.post("/tasks",createTask);
router.get("/tasks",getTask);
router.patch("/tasks",updateTask);
router.delete("/tasks",deleteTasks);
module.exports=router;



