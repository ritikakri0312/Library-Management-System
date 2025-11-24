const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    let token = null;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.headers["x-auth-token"]) {
      token = req.headers["x-auth-token"];
    }

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Auth Error:", err.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

exports.adminOnly = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  if (req.user.role !== "admin") return res.status(403).json({ message: "Admins only" });
  next();
};

exports.studentOnly = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  if (req.user.role !== "student") return res.status(403).json({ message: "Students only" });
  next();
};
