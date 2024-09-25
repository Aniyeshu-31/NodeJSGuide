const expressvalidator = require('express-validator/check');
exports.uservalidation = [
    expressvalidator.body('email')
    .isEmail()
    .withMessage('Please enter a Valid Email')
    .custom((value,{req})=>{
        return User.findOne({email:value}).then(userdoc=>{
            if(userDoc){
                return Promise.reject("E-mail already Exists!")
            }
        })
    })
    .normalizeEmail(),
    expressvalidator.body('password').trim().isLength({min:5}),
    expressvalidator.body('name').trim().not().isEmpty(),
    (req,res,next)=>{
        next();
    }
]