import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const notify = () => {localStorage.setItem("loginsSccessFull",true)};

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // ⭐ Single login route for both Admin + Students
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      if (!res.data.success) {
        alert("Invalid Email or Password");
        return;
      }

      // ⭐ Save session
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role); // admin OR student
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // alert("Login Successful!");
      notify();

      // ⭐ Redirect based on role
      if (res.data.role === "admin") {
        navigate("/");
      } else if (res.data.role === "student") {
        navigate("/student/dashboard");
      }

    } catch (err) {
      console.log("Login Error:", err);
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>LOGIN</h2>

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

          <button type="submit" className="login-btn">Sign In</button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}
