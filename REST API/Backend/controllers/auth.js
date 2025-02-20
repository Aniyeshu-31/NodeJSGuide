const User = require('../models/user');
const { validationResult } = require('express-validator/check');
const { bcrypt }  = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.signup = (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error("Validation Failed!");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    bcrypt.hash(password,12).then(hashedPassword=>{
        const user = new User({
            email:email,
            password:hashedPassword,
            name:name
        });
        return user.save();
    }).then(result=>{
        res.status(201).json({ message:"User Created!" , userId: result._id });
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })

}

exports.postlogin = (req,res,next)=>{
    const email  = req.body.email;
    const password  = req.body.password;
    User.findOne({email:email}).then(user=>{
     if(!user){
        const error = new Error('User with this Email does not Found!');
        error.statusCode = 401;
        throw error;
     }
     loadedUser = user;
     return bcrpyt.compare(password,user.password);
    }).then(isEqual=>{
        if(!isEqual){
            const error = new Error("Wrong Password Entered!");
            error.statusCode = 401;
            throw error;
        }   
       const token = jwt.sign({
        email:loadedUser.email,
        userId:loadedUser._id.toString()
       },'supersecretkey',{
        expiresIn:'1h'
    });
       res.statusCode(200).json({token:token,userId:loadedUser._id.toString()});
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

exports.getUserStatus = (req,res,next)=>{
    User.findById(req.userId).then(user=>{
        if(!user){
            const error=new Error("User not Found!");
            error.statusCode=404;
            throw error;
        }
        res.status(200).json({status:user.status})
    }).catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

exports.newUserStatus = (req,res,next)=>{
    const newUserStatus = req.body.status;
    User.findById(req.userId).then(user=>{
        if(!user){
            const error=new Error('User Not Found!');
            error.statusCode=404;
            throw error;

        }
        user.status=newUserStatus;
        return user.save();
    }).then(result=>{
        res.status(200).json({message:'User Updated!'})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}