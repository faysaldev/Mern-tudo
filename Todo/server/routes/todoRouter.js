const express = require('express');
const {getTodo,postTodo,deleteTodo,updateTodo,singleTodo} = require('../controlars/todoControlar')

const router = express.Router();

router.get('/all',getTodo);

router.post('/todo/post',postTodo)

router.delete('/todo/delete/:id',deleteTodo);

router.patch('/todo/update/:id',updateTodo);

router.get('/todo/single/:id',singleTodo);

// router.get('/deleteall',deleteall)

module.exports = router;