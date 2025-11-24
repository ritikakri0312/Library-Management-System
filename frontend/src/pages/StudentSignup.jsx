import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function StudentSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/student/signup", {
        name,
        email,
        password,
      });

      alert("Signup successful! Please login.");
      navigate("/student-login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Student Signup</h2>

        <form onSubmit={handleSignup}>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Password</label>
          <input type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
}

