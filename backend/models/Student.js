const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  course: { type: String, required: true },

  // ⭐ REQUIRED FOR STUDENT LOGIN
  password: { type: String, required: true },

  status: { type: String, default: "inactive" }
});

module.exports = mongoose.model("Student", studentSchema);
