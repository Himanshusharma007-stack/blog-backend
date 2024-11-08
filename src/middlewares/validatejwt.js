const { verifyToken } = require("../utils/jwtUtility");

// Custom middleware to validate JWT
const validateJwt = (req, res, next) => {
    debugger
    const token = req.headers?.authorization;
    console.log("Token received:", token); // Debugging the token
    if (!token) return res.status(401).json({ msg: "No token provided." });
  
    try {
        const decoded = verifyToken(token); // Assuming verifyToken throws an error on failure
        console.log('decoded ---- ',decoded);
        
        req.user = decoded.userId; // Store userId in the request object
        next();
    } catch (err) {
        console.log("Token verification failed:", err); // Log verification error
        return res.status(401).json({ msg: "Invalid or expired token." });
    }
};

module.exports = { validateJwt };
