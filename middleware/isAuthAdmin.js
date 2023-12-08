const jwt = require('jsonwebtoken');

function isAuthAdmin(req, res, next) {
    console.log("Middleware isAuthAdmin is working");

    const token = req.cookies.token; 
    console.log("Token from cookie:", token);

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized. No token provided.' });
    }

    try {
       
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log("Decoded token:", decodedToken);

        // Check if the role is Admin
        if (decodedToken.role !== 'Admin') {
            return res.status(403).json({ result: "Access denied. Not an admin." });
        }

        // If the user is an admin, attach the user data to the request and call next
        req.userData = decodedToken;
        next();
    } catch (err) {
        console.log("Token verification failed:", err.message);
        return res.status(401).json({ result: "Invalid token." });
    }
}

module.exports = isAuthAdmin;
 