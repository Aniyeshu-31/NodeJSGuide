const express = require('express');
    const io = require('socket.io');
    const {Server} = io({port:8000});
const app = express();
const bodyparser = require('body-parser');
const todoRoutes = require('./routes/todos');

app.use(bodyparser.json());
app.use('/todos',todoRoutes);
app.listen(3000,()=>{
    console.log('Server listening on port 3000');
})