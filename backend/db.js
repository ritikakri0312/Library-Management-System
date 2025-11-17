const mysql = require("mysql2");

// Create connection
const db = mysql.createConnection({
  host: "localhost",   // your MySQL host
  user: "root",        // your MySQL username
  password: "Ritika@1234",        // add password if your MySQL has one
  database: "library_db" // name of your database
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ MySQL Connected Successfully!");
});

module.exports = db;
