import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./AdminProfile.css";
import { useNavigate } from "react-router-dom";

export default function AdminProfile() {
  const navigate = useNavigate();
  const [issuedBooks, setIssuedBooks] = useState([]);

  // Load from NEW login system
  const user = JSON.parse(localStorage.getItem("user")); // admin data
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Validate admin access
  useEffect(() => {
    if (!token || role !== "admin") {
      navigate("/login");
      return;
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, [token, role, navigate]);

  // ---------- LOAD ISSUED BOOKS ----------
  const loadIssuedBooks = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/issued-books", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIssuedBooks(res.data);
    } catch (err) {
      console.log("Error loading issued books:", err);
    }
  }, [token]);

  useEffect(() => {
    loadIssuedBooks();
  }, [loadIssuedBooks]);

  // ---------- DELETE RECORD ----------
  const deleteRecord = async (id) => {
    if (!window.confirm("Delete this record?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/issued-books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIssuedBooks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.log("Delete Error:", err);
    }
  };

  // ---------- LOGOUT ----------
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    delete axios.defaults.headers.common["Authorization"];

    navigate("/login");
  };

  if (!user) return <h2>Loading Admin Profile...</h2>;

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <Navbar />

        <div className="admin-page">

          {/* ADMIN CARD */}
          <div className="admin-card">
            <div className="admin-avatar">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Admin"
              />
            </div>

            <h2>Admin Profile</h2>

            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>ID:</strong> {user?.id}</p>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>

          {/* ISSUED BOOKS */}
          <div className="issued-section">
            <h2>📚 Issued Books Record</h2>

            <table className="issued-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Book Title</th>
                  <th>Issue Date</th>
                  <th>Return Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {issuedBooks.map((book) => (
                  <tr key={book._id}>
                    <td>{book.studentName}</td>
                    <td>{book.bookTitle}</td>
                    <td>{new Date(book.issueDate).toLocaleDateString()}</td>

                    <td>
                      {book.returnDate
                        ? new Date(book.returnDate).toLocaleDateString()
                        : "Not Returned"}
                    </td>

                    <td className={book.status === "Returned" ? "returned" : "issued"}>
                      {book.status}
                    </td>

                    <td>
                      {book.status === "Returned" && (
                        <button
                          onClick={() => deleteRecord(book._id)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
