const express = require("express");
const router = express.Router();

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin123";

router.post("/login", (req, res) => {
  console.log("🔥 LOGIN API HIT");
  console.log("📥 Received body:", req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    console.log("❌ Missing email or password");
    return res.status(400).json({ message: "Missing data" });
  }

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    console.log("✅ LOGIN SUCCESS!");
    return res.json({
      message: "Login successful",
      token: "adminToken123"
    });
  }

  console.log("❌ LOGIN FAILED");
  return res.status(401).json({ message: "Invalid email or password" });
});

module.exports = router;
