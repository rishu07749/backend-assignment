const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username:String,
    email:{type :String, require:true, unique:true},
    password:{type:String, require:true}, 
    role:{type:String,enum:["admin","user"],default:"user"}
});
const User = mongoose.model('User', userSchema);
module.exports = User;