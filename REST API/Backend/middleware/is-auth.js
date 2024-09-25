const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    const authheader  = req.get('Authorization');
    if(!authheader){
        const error = new Error("Not Authenticated.");
        error.statusCode = 401;
        throw error;
    }
    const token=authheader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token,'supersecretkey');
    } catch (err) {
        err.statusCode=500;
        throw err;
    }
    req.userId = decodedToken.userId; 
    next();
}