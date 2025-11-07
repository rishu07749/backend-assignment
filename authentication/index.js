const express = require("express");
const UserRouter = require("./routes/user.routes");
const TodoRouter = require("./routes/todo.routes");
const connectDB = require("./config/mongodb.config");
require("dotenv").config(); 
const app = express();
app.use(express.json());
connectDB();
const port = process.env.PORT || 3000;
app.get("/test", (req, res) => {
    try {
        res.status(200).json({ message: "This is test route " });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
app.use("/users",UserRouter);
app.use("/todos",TodoRouter);
app.use((req,res)=>{
    try{
            res.status(404).json({message:"This request is undefined"});

    }
    catch(error){
        res.status(500).json({message:"Something went wrong"});
    }       
})
app.listen(3000, () => {
    console.log(`Authentication server is running on ${port}`);
});