const bcrypt = require("bcryptjs");
const Student = require("../models/Student");
const Book = require("../models/Book");
const IssuedBook = require("../models/IssuedBook");

// ================================
// GET STUDENT PROFILE
// ================================
const getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select("-password");
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ================================
// GET STUDENT ISSUED BOOKS
// ================================
const getIssuedBooks = async (req, res) => {
  try {
    const books = await IssuedBook.find({ student: req.user.id })
      .populate("book", "title author");

    res.json({ success: true, books });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ================================
// LIST ONLY AVAILABLE BOOKS
// ================================
const listAvailableBooks = async (req, res) => {
  try {
    const books = await Book.find({ quantity: { $gt: 0 } });

    res.json({ success: true, books });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ================================
// ADMIN: GET ALL STUDENTS
// ================================
const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json({ success: true, students });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ================================
// ADMIN: ADD STUDENT
// ================================
const addStudent = async (req, res) => {
  try {
    const { name, rollNo, email, course, password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const exists = await Student.findOne({ $or: [{ email }, { rollNo }] });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Student already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({
      name,
      rollNo,
      email,
      course,
      password: hashedPassword,
      status: "active",
    });

    await student.save();

    res.status(201).json({ success: true, student });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ================================
// ADMIN: UPDATE STUDENT
// ================================
const updateStudent = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ================================
// ADMIN: DELETE STUDENT
// ================================
const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ================================
// EXPORTS
// ================================
module.exports = {
  getProfile,
  getIssuedBooks,
  listAvailableBooks,
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
};
