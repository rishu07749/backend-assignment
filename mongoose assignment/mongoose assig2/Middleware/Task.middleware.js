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
....................................................
// middleware/task.middleware.js
const Task = require('../models/task.model');

const allowedPriorities = ['low', 'medium', 'high'];

async function validateCreateTask(req, res, next) {
  const { title, description, priority } = req.body;

  if (!title || !description || !priority) {
    return res.status(400).json({ message: 'Incomplete Data Received. Required: title, description, priority.' });
  }

  // priority must be strictly 'low'|'medium'|'high' (lowercase)
  if (!allowedPriorities.includes(priority)) {
    return res.status(400).json({ message: `Invalid priority. Allowed values: ${allowedPriorities.join(', ')}` });
  }

  // Ensure title is unique
  try {
    const existing = await Task.findOne({ title });
    if (existing) {
      return res.status(409).json({ message: 'Task title must be unique. A task with this title already exists.' });
    }
    next();
  } catch (err) {
    next(err);
  }
}

// For updates: allow only title, priority, description changes and validate priority if present
async function validateUpdateTask(req, res, next) {
  const allowedFields = ['title', 'priority', 'description', 'isCompleted'];
  const updateKeys = Object.keys(req.body);

  for (const key of updateKeys) {
    if (!allowedFields.includes(key)) {
      return res.status(400).json({ message: `Invalid update field: ${key}. Only title, priority, description, isCompleted allowed.` });
    }
  }

  if (req.body.priority && !allowedPriorities.includes(req.body.priority)) {
    return res.status(400).json({ message: `Invalid priority. Allowed values: ${allowedPriorities.join(', ')}` });
  }

  // If updating title, ensure uniqueness (ignore same doc)
  if (req.body.title) {
    try {
      const existing = await Task.findOne({ title: req.body.title });
      if (existing && existing._id.toString() !== req.params.id) {
        return res.status(409).json({ message: 'Task title must be unique.' });
      }
    } catch (err) {
      return next(err);
    }
  }

  next();
}

module.exports = {
  validateCreateTask,
  validateUpdateTask
};
