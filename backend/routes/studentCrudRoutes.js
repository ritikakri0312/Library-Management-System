const express = require("express");
const { auth, adminOnly } = require("../middleware/auth");
const Student = require("../models/Student");
const StudentAuth = require("../models/StudentAuth");
const bcrypt = require("bcryptjs");

const router = express.Router();

// =========================
// GET ALL STUDENTS
// =========================
router.get("/", auth, adminOnly, async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================
// ADD STUDENT
// =========================

router.post("/", auth, adminOnly, async (req, res) => {
  try {
    const { name, rollNo, email, course, password } = req.body;

    // Validate all fields
    if (!name || !rollNo || !email || !course || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Hash student password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      name,
      rollNo,
      email,
      course,
      password: hashedPassword
    });

    await newStudent.save();

    res.json({ message: "Student added successfully", student: newStudent });

  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json({ error: err.message });
  }
});
// =========================
// DELETE STUDENT
// =========================
router.delete("/:id", auth, adminOnly, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) return res.status(404).json({ message: "Student not found" });

    // delete login record also
    await StudentAuth.findByIdAndDelete(student.studentId);

    // delete student profile
    await Student.findByIdAndDelete(req.params.id);

    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
