// const fs = require('fs').promises;

// const text = "This is a Node.js course";
// fs.writeFile('node-message.txt',text).then(()=>{
//     console.log("Wrote the File")
// }).catch(err=>{
//     console.log(err);
// })

// const express = require('express');
// const app = express();
// const PORT = 3000;
// app.use('/',(req,res,next)=>{
//     res.send("Hi There!");
// })
// app.listen(PORT,()=>{
//     console.log(`Server is Listening on port ${PORT}`);
// })

const http  = require("http");

const server = http.createServer((req,res)=>{
    res.end("Hello World I am a Node server");
})

server.listen(3000,()=>{
    console.log("Server Listening on port 3000")
});