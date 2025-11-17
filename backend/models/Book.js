const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  quantity: {
    type: Number,
    default: 1    // <--- Important
  }
});

module.exports = mongoose.model("Book", bookSchema);
