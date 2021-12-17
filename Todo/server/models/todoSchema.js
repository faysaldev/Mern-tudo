const mongoose = require('mongoose')

// const todoSchema = new mongoose.Schema({
//     text:{
//         type:String,
//         required:true
//     }
// },{timestamps:true});

const todoSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true,
    },
    username:{
       type:String,
       required:true, 
    },
    photo:{
        type:String,
    }
},{timestamps:true,collection:'todos'});

const Todo = mongoose.model('Todo',todoSchema);

module.exports=Todo;