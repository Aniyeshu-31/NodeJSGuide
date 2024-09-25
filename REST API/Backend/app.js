const path=require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoconnect = require('./database/db');
const multer=require('multer');
const app = express();

const { v4: uuidv4 } = require('uuid');
 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4())
    }
});

const filefilter = (req,file,cb)=>{
  if(file.mimtype==='image/png' 
  || file.mimtype==='image/jpg' 
  || file.mimtype==='image/jpeg'){
    cb(null,true);
  }
  else{
    cb(null,false);
  }
}

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(multer({storage:storage,fileFilter:filefilter}).single('image'))  ;
app.use('/image',express.static(path.join(__dirname,'image')));// to serve static images..
const feedRoutes = require('./routes/feed');
const AuthRoutes = require('./routes/auth');

const port = 8080


app.use((error,req,res,next)=>{
  console.log(error);
  const statusCode=error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(statusCode).json({message:message,data:data});
}
  )
app.use( async(req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,PATCH');
  res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
  await next();
});
app.use('/feed',feedRoutes);  // /feed/posts will be handled by this controller
app.use('/auth',AuthRoutes);  // Authentication will be handled by This Controller
async function server(){
  await mongoconnect();
const server = app.listen(port,()=>{
    console.log(`Server is listening at port ${port}`);
})
const io = require('./socket').init(server);
io.on('connection',socket=>{
  console.log('Client Connected');
})
}
server();
// app.listen(port,()=>{
//   mongoconnect();
//   console.log(`server is listening at port ${port}`);
// })






