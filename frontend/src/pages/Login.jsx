import React, { useState } from "react";
import axios from "axios";
// import "./login.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ============================
  // ✔ FIXED handleLogin FUNCTION
  // ============================
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });

      alert("Login successful!");

      // Save token
      localStorage.setItem("adminToken", res.data.token);

      // Redirect to Dashboard
      onLogin();
    } catch (err) {
      console.log("❌ Login error:", err.response?.data || err.message);
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome to Library System!</h2>
        <p>Sign in to continue</p>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Enter email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />

          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>

        <p className="copyright">
          © Copyright | Library Management System
        </p>
      </div>
    </div>
  );
}
