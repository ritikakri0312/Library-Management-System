import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import "./ReturnBook.css"; // ← Add this for styling

export default function ReturnBook() {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState("");
  const [returnDate, setReturnDate] = useState("");

  // Load all issued books (only books not returned)
  useEffect(() => {
    loadIssuedBooks();
  }, []);

  const loadIssuedBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/issued-books");

      // Only show books with status = Issued
      setIssuedBooks(res.data.filter(b => b.status.toLowerCase() === "issued"));
    } catch (err) {
      console.log(err);
    }
  };

  const handleReturnBook = async (e) => {
    e.preventDefault();

    if (!selectedIssue || !returnDate) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/issued-books/return/${selectedIssue}`,
        { returnDate: new Date(returnDate) }
      );

      alert("Book Returned Successfully!");

      setSelectedIssue("");
      setReturnDate("");
      loadIssuedBooks(); // refresh list
    } catch (err) {
      console.log(err);
      alert("Error returning book");
    }
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <Navbar />

        <div className="return-book-container">
          <h2 className="page-title">📘 Return Book</h2>

          <div className="return-card">
            <form className="return-form" onSubmit={handleReturnBook}>

              <label className="form-label">Select Issued Book</label>
              <select
                value={selectedIssue}
                onChange={(e) => setSelectedIssue(e.target.value)}
                className="form-select"
              >
                <option value="">Select...</option>

                {issuedBooks.map((book) => (
                  <option key={book._id} value={book._id}>
                    {book.studentName} — {book.bookTitle}
                  </option>
                ))}
              </select>

              <label className="form-label">Return Date</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="form-input"
              />

              <button className="submit-btn">
                Return Book
              </button>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

