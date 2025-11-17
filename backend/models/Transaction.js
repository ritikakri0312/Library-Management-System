const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  issueDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
  status: { type: String, default: "issued" }
});

module.exports = mongoose.model("Transaction", transactionSchema);
