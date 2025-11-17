const express = require("express");
const router = express.Router();
const IssuedBook = require("../models/IssuedBook");
const Student = require("../models/Student");
const Book = require("../models/Book");

// -------------------------------------------------------
// GET ALL ISSUED BOOKS
// -------------------------------------------------------
router.get("/", async (req, res) => {
  try {
    const issued = await IssuedBook.find();
    res.json(issued);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------------------------------------------
// ISSUE BOOK (USING studentId + bookId)
// -------------------------------------------------------
router.post("/issue-by-id", async (req, res) => {
  console.log("ISSUE (ID) API HIT");

  try {
    const { studentId, bookId, issueDate } = req.body;

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const newIssue = new IssuedBook({
      studentId,
      studentName: student.name,
      bookId,
      bookTitle: book.title,
      issueDate,
      status: "Issued",
    });

    await newIssue.save();

    res.json({ message: "Book issued successfully", newIssue });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------------------------------------------
// RETURN BOOK
// -------------------------------------------------------
router.put("/return/:id", async (req, res) => {
  try {
    const { returnDate } = req.body;

    const updatedIssue = await IssuedBook.findByIdAndUpdate(
      req.params.id,
      {
        returnDate: new Date(returnDate),
        status: "Returned",
      },
      { new: true }
    );

    res.json(updatedIssue);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
