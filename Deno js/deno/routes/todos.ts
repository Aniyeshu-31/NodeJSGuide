import { Router } from "https://deno.land/x/oak/mod.ts";
// import Todo from '../utils/TodoData.ts';
const router = new Router();
interface Todo{
   id:string
   text:string
}
let todos:Todo[]= [];
router.get('/todos',(ctx)=>{
   ctx.response.body = {todos: todos};
});
router.post('/todos',async (ctx)=>{
    let text = await ctx.request.body().value;
   const newTodo: Todo = { id: new Date().toISOString(), text: text.text };
   todos.push(newTodo);
   ctx.response.body={message:"Newtodo Added!",newTodo:newTodo};
});
router.put('/todos/:todoId', async(ctx)=>{
   const tid = ctx.params.todoId;
   const todoIndex = todos.findIndex((todo)=>{
        return tid === todo.id
   })
   todos[todoIndex] = {id: todos[todoIndex].id , text: await ctx.request.body().value}
   ctx.response.body={message:'Updated Todo!',updatedTodo:todos[todoIndex]};
});
router.delete('/todos/:todoId',(ctx)=>{
   const tid = ctx.params.todoId;

   todos  = todos.filter(todo=>{
      return todo.id !== tid; 
   })
   ctx.response.body = {message:"Todo Deleted!"};
});


export default router;