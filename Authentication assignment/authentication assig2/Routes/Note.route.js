const express=require("express")
const Note=require("../Model/note.model")
const AuthMiddleware=require("../Middleware/Auth.middleware")
const NoteRouter=express.Router();
NoteRouter.post("/add-note",AuthMiddleware,async(req,res)=>{
    try{
        let note=await Note.create({...req.body,userId:req.user})
        res.status(201).json({message:"Note Added",note})

    }catch(error){
        res.status(500).json({message:"Something went wrong"})

    }
})
NoteRouter.get("/show",AuthMiddleware,async(req,res)=>{
    try{
        let notes=await Note.find({userId:req.user})
        res.status(200).json({message:"note",notes})
    }catch(error){
        res.status(500).json({message:"something went wrong"})
    }
})
NoteRouter.put("/update",AuthMiddleware,async(req,res)=>{
    try{

    }catch(error){

    }
})
---------------------------------------------------------------------------
const express = require("express");
const Note = require("../models/noteModel");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Protect all note routes
router.use(authMiddleware);

// 🟢 Create Note
router.post("/", async (req, res) => {
  try {
    const note = await Note.create({
      title: req.body.title,
      content: req.body.content,
      createdBy: req.user.id,
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Error creating note" });
  }
});

// 🔵 Get All Notes (created by logged-in user)
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find({ createdBy: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes" });
  }
});

// 🟠 Update Note
router.put("/:id", async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true }
    );

    if (!note) return res.status(404).json({ message: "Note not found or not yours" });
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Error updating note" });
  }
});

// 🔴 Delete Note
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!note) return res.status(404).json({ message: "Note not found or not yours" });
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note" });
  }
});

module.exports = router;
