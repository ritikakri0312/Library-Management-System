const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const router = express.Router();


// ============================
// ADMIN SIGNUP
// ============================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check existing admin
    const exists = await Admin.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Save admin
    const admin = new Admin({
      name,
      email,
      password: hashed,
    });

    await admin.save();

    res.json({
      success: true,
      message: "Admin registered successfully",
    });

  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



// ============================
// ADMIN LOGIN  ✅ FIXED
// ============================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token (with role)
    const token = jwt.sign(
      {
        id: admin._id,
        role: "admin",
        email: admin.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send final response
    res.json({
      success: true,
      message: "Login successful",
      token,
      role: "admin",   // 🔥 Important for ProtectedRoute
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });

  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


module.exports = router;
