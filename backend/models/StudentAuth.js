const mongoose = require("mongoose");

const studentAuthSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },

    email: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      trim: true
    },

    password: { 
      type: String, 
      required: true 
    },

    // Student ID may not exist for all users at signup
    studentId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Student",
      required: false,   // <-- updated (not forced)
      default: null
    },

    // For role-based authentication
    role: {
      type: String,
      default: "student",
      enum: ["student"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudentAuth", studentAuthSchema);
