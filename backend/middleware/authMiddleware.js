const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Middleware to protect routes
async function protect(req, res, next) {
  try {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1]; //Extract Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } else {
      res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (err) {
    res.status(401).json({ message: "Token Failed", error: err.message });
  }
}

//Middleware for Admin-only access
function adminOnly(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Acces denied, admin only" });
  }
}

module.exports = { protect, adminOnly };
