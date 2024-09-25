const mongoose=require('mongoose');
const MONGOURI='mongodb+srv://Aniyeshu:Aniyeshu@sampleprojectdb.vno3452.mongodb.net/nodejs'

const mongoconnect =async ()=>{
    await mongoose.connect(MONGOURI);
    console.log("Connected to MongoDB successfully");
} 
module.exports = mongoconnect;