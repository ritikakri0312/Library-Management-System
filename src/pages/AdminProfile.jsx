import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProfile() {
  const [issuedBooks, setIssuedBooks] = useState([]);

  // ---------- LOAD ISSUED BOOKS ----------
  const loadIssuedBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/issued-books");
      setIssuedBooks(res.data);
    } catch (error) {
      console.log("Error fetching issued books:", error);
    }
  };

  // ---------- RUN ON PAGE LOAD ----------
  useEffect(() => {
    loadIssuedBooks();
  }, []);

  return (
    <div className="profile-container">
      
      {/* ---------- ADMIN INFORMATION ---------- */}
      <div className="admin-card">
        <h2>👤 Admin Profile</h2>

        <p><strong>Name:</strong> Library Admin</p>
        <p><strong>Email:</strong> admin@gmail.com</p>
        <p><strong>Role:</strong> Administrator</p>

        <button className="logout-btn">Logout</button>
      </div>

      {/* ---------- ISSUED BOOK TABLE ---------- */}
      <div className="issued-books-section">
        <h2>📚 Issued Books Record</h2>

        <table className="issued-book-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Book Title</th>
              <th>Issue Date</th>
              <th>Return Date</th>
              <th>Status</th>
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
                <td>{book.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

