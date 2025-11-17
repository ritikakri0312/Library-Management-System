import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";

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

    console.log("API Response:", res.data);  // ← ADD THIS
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

      // reset fields
      setSelectedIssue("");
      setReturnDate("");

      // reload table
      loadIssuedBooks();

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

        <div className="page">
          <h1>Return Book</h1>

          <form className="form" onSubmit={handleReturnBook}>
            <label>Select Issued Book</label>
            <select
              value={selectedIssue}
              onChange={(e) => setSelectedIssue(e.target.value)}
            >
              <option value="">Select...</option>

              {issuedBooks.map((book) => (
                <option key={book._id} value={book._id}>
                  {book.studentName} - {book.bookTitle}
                </option>
              ))}
            </select>

            <label>Return Date</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />

            <button className="btn-edit" style={{ marginTop: "15px" }}>
              Return Book
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
