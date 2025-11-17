const mongoose = require("mongoose");

const IssuedBookSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  bookTitle: { type: String, required: true },
  issueDate: { type: Date, required: true },
  returnDate: { type: Date },
  status: { type: String, default: "Issued" }
});

module.exports = mongoose.model("IssuedBook", IssuedBookSchema);
