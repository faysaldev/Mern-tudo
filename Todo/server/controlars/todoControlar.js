const Todo = require('../models/todoSchema')

const getTodo= async(req, res) => {
    const todos = await Todo.find();
    if(!todos) return res.status(404).json({msg: 'Not Found'});

    res.json(todos)
}

const postTodo =async (req, res) => {
    const text = req.body.text;

    const insert = await Todo.create(req.body);

    if(!insert) return res.status(401).json({msg: 'Not inserted'});

    res.json(insert);

}

const deleteTodo = async(req, res) => {
    const todoDelete = await Todo.findByIdAndRemove(req.params.id);

    if(!todoDelete) return res.status(400).json({msg: 'Cannot Delete Todo'});

    res.json(todoDelete)
}

const updateTodo =async (req, res) => {
    const todoUpdate = await Todo.findByIdAndUpdate(req.params.id,{text:req.body.text});

    if(!todoUpdate) return res.status(400).json({msg: 'Cannot Update Todo'});

    res.json(todoUpdate)
}

const singleTodo =async (req, res) => {
    const single = await Todo.findById(req.params.id);

    if(!single) return res.status(400).json({msg: 'Cannot Show Todo'});

    res.json(single)
}


// const deleteall = async (req, res) => {
//     const allDelete = await Todo.remove({});

//      if(!allDelete) return res.status(400).json({msg: 'Cannot Delete all Todo'});

//     res.json(allDelete)
// }

module.exports={
    getTodo,
    postTodo,
    deleteTodo,
    updateTodo,
    singleTodo
}