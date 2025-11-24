const express = require("express");
const { auth, studentOnly } = require("../middleware/auth");
const {
  getProfile,
  getIssuedBooks,
  listAvailableBooks,
} = require("../controllers/studentController");

const router = express.Router();

// Student Profile
router.get("/profile", auth, studentOnly, getProfile);

// Student Issued Books
router.get("/my-books", auth, studentOnly, getIssuedBooks);

// Books students are allowed to view
router.get("/books", auth, studentOnly, listAvailableBooks);

module.exports = router;
