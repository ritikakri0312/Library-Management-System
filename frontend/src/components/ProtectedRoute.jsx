import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken"); // ✅ admin token only
  const role = localStorage.getItem("role");

  // ⛔ If no token → redirect to admin login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ⛔ If role is NOT admin → redirect to admin login
  if (role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  // ✅ Admin is authenticated → allow access
  return children;
}
