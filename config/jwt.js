const jwt = require('jsonwebtoken');

module.exports.authenticate = function(req, res, next){
    try{
        jwt.verify(req.cookies.usertoken, process.env.JWT_SECRET);
        next();
    }catch(e){
        res.status(401).json({message: "Unauthorized"});
    }
}