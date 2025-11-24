import React from "react";
import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("token");     // common token
  const role = localStorage.getItem("role");

  if (!token || role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
