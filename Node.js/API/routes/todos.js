const express = require('express');
const router = express.Router();
let todos = [];
router.get('/',(req,res,next)=>{
     res.json({todos:todos});
})

router.post('/newtodo',(req,res,next)=>{
    const newtodo = {id:new Date().toISOString(),text:req.body.text};
    todos.push(newtodo);
    res.status(201).json({message:'newtodo added',todo:newtodo})
})
router.put('/:id',(req,res,next)=>{
   const tid = req.params.id;
   const todoIndex = todos.findIndex(todo=>{
        return tid === todo.id;
   });
   
   todos[todoIndex] = {id: todos[todoIndex].id ,text: req.body.text };
   res.status(200).json({message:'updated! todo',todo:todos[todoIndex]})
})
router.delete('/:id',(req,res,next)=>{
    let id = req.params.id;
    todos = todos.filter(todo =>{
     return (todo.id != id);
   })
   res.status(200).json({message:"Deleted todo"})
})

module.exports = router;