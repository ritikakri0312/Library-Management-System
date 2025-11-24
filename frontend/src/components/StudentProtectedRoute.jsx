import React from "react";
import { Navigate } from "react-router-dom";

export default function StudentProtectedRoute({ children }) {
  const token = localStorage.getItem("token");   // ⭐ Common token
  const role = localStorage.getItem("role");     // "student" or "admin"

  // Block if NOT logged in or NOT a student
  if (!token || role !== "student") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
