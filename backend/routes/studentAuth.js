const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const StudentAuth = require("../models/StudentAuth");

const router = express.Router();

/* ============================================
   STUDENT SIGNUP
=============================================== */
router.post("/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check existing user
    const exists = await StudentAuth.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Student already exists"
      });
    }

    // Hash password
    const hashedPass = await bcrypt.hash(password, 10);

    // Create student
    const student = new StudentAuth({
      email,
      password: hashedPass,
      name,
      studentId: null,
      role: "student",
    });

    await student.save();

    res.json({
      success: true,
      message: "Student registered successfully",
    });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


/* ============================================
   STUDENT LOGIN
=============================================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await StudentAuth.findOne({ email });
    if (!student) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Set studentId: use main ID if empty
    const finalStudentId = student.studentId || student._id;

    // Generate JWT
    const token = jwt.sign(
      {
        id: student._id,
        role: "student",
        studentId: finalStudentId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      role: "student",
      student: {
        id: finalStudentId,
        name: student.name,
        email: student.email,
      },
    });

  } catch (err) {
    console.error("Student login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


module.exports = router;
