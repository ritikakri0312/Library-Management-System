require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// =========================
// ROUTES IMPORT
// =========================

// ⭐ Single Login Route (Admin + Student)
const authRoutes = require("./routes/authRoutes");

// Admin CRUD
const bookRoutes = require("./routes/bookRoutes");
const studentCrudRoutes = require("./routes/studentCrudRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const adminRoutes = require("./routes/adminRoutes");
const issuedBooksRoute = require("./routes/issuedBooks");

// Student OLD login (you can delete later)
const studentAuthRoutes = require("./routes/studentAuth");

// Student Features
const studentFeatureRoutes = require("./routes/studentFeatureRoutes");

// =========================
// ROUTE MOUNTING
// =========================

// ⭐ NEW — Common Login API
// POST /api/login
app.use("/api", authRoutes);

// OLD student login (keep temporarily)
app.use("/api/student", studentAuthRoutes);

// Student features
app.use("/api/student", studentFeatureRoutes);

// Admin CRUD
app.use("/api/books", bookRoutes);
app.use("/api/students", studentCrudRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/issued-books", issuedBooksRoute);

// Default route
app.get("/", (req, res) => {
  res.send("Backend running");
});

// =========================
// DB + START SERVER
// =========================

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
