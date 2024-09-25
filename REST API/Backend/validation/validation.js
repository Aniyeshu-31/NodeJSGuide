const {body}=require('express-validator');
exports.createpostValidation=[
    body('title').trim().isLength({min:5}),
    body('content').trim().isLength({min:5}),
    (req,res,next)=>{
        next();
    }
]

