const express=require('express');
const TaskModel=require('../model/Task.model');
const router =express.Router();
const { createTask,getTask,updateTask,deleteTasks}=require("../controller/task.controller");
const { validateUpdateTask,validateCreateTask } = require('../Middleware/Task.middleware');
router.post("/tasks",validateCreateTask,createTask);
router.get("/tasks",getTask);
router.patch("/tasks",validateUpdateTask,updateTask);
router.delete("/tasks",deleteTasks);
module.exports=router;



