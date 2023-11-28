const jwt = require('jsonwebtoken');

function isAuthAdmin(req, res, next) {
    const authHeader = req.headers.authorization; 
    if (!authHeader) {
        return res.status(401).json({error: 'Unauthorized'});
    }
    
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(400).jsend.fail({result:"Token is required."})
    }

    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userData = decodedToken;  
        if(req.userData.role!=='Admin'){
            return res.jsend.fail({result:"You are not authorized"})
        }
        next();
    } catch (err) {
        return res.jsend.fail({statusCode:401,"result": err.message});  
	}

   
}

module.exports = isAuthAdmin;    