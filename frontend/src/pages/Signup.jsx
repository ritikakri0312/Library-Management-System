import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🔥 Signup clicked");

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      console.log("🚀 Sending signup request...");

      const res = await axios.post("http://localhost:5000/api/admin/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log("Signup Response:", res.data);

      if (res.data.success) {
        alert("Admin account created successfully!");
        navigate("/login");
      }

    } catch (err) {
      console.log("Signup error:", err.response?.data);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          Create Admin Account
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Admin Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 mb-3 rounded bg-gray-700 text-white"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mb-3 rounded bg-gray-700 text-white"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 mb-3 rounded bg-gray-700 text-white"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded"
          >
            Sign Up
          </button>
        </form>

        <p
          onClick={() => navigate("/login")}
          className="text-center text-gray-400 mt-4 cursor-pointer"
        >
          Already an admin? Log in
        </p>
      </div>
    </div>
  );
}

export default Signup;
