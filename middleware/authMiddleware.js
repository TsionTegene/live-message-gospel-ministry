const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "Access Denied: No Token Provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Debug log
    
    // Verify admin role exists in token
    if (!decoded.role || decoded.role !== "admin") {
      console.log("Missing or invalid role in token");
      return res.status(403).json({ message: "Admin privilege required" });
    }
    
    req.admin = decoded;
    next();
  } catch (error) {
    console.log("Token verification failed:", error.message);
    return res.status(403).json({ 
      message: "Invalid Token",
      error: error.message // Only for development, remove in production
    });
  }
}

module.exports = authenticateToken;