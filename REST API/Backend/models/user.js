const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
 email:{
    type:String,
    required:true
 },
  password:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  status:{
    type:String,
    default: 'I am new!'
  },
  posts:[
    {
        type:Schema.Types.ObjectId,
        ref:'Post'
    }
  ],
//   timeStamps:{
//     type:Date,
//     default:new Date()
//   }
});


module.exports = mongoose.model('User',userSchema);