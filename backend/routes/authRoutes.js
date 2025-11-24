const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Models
const Admin = require("../models/Admin");
const Student = require("../models/Student");   // ✅ Correct model

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ CHECK ADMIN
    let user = await Admin.findOne({ email });
    let role = "admin";

    // 2️⃣ IF NOT ADMIN → CHECK STUDENT
    if (!user) {
      user = await Student.findOne({ email });   // ✅ FIXED
      role = "student";
    }

    // 3️⃣ NO USER FOUND
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    // 4️⃣ CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, msg: "Incorrect password" });
    }

    // 5️⃣ CREATE TOKEN
    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 6️⃣ SEND RESPONSE
    res.json({
      success: true,
      role,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

module.exports = router;
