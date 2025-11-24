import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function IssueBook() {
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [issueDate, setIssueDate] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:5000/api/students", {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => setStudents(res.data.students || res.data));

    axios.get("http://localhost:5000/api/books", {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => setBooks(res.data.books || res.data));
  }, []);
// Handle Submit
const handleIssueBook = async () => {
  if (!selectedStudent || !selectedBook || !issueDate) {
    alert("Please fill all fields!");
    return;
  }

  try {
    await axios.post("http://localhost:5000/api/issued-books/issue-by-id", {
      studentId: selectedStudent,
      bookId: selectedBook,
      issueDate
    });

    alert("Book Issued Successfully!");

    // Clear form
    setSelectedStudent("");
    setSelectedBook("");
    setIssueDate("");

  } catch (error) {
    alert("Error issuing book");
    console.error(error);
  }
};


  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Navbar />

        <div className="issue-container">
          <h2>Issue a Book</h2>

          <div className="issue-card">
            <label>Select Student</label>
            <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
              <option value="">Select Student</option>
              {students.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>

            <label>Select Book</label>
            <select value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)}>
              <option value="">Select Book</option>
              {books.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.title}
                </option>
              ))}
            </select>

            <label>Issue Date</label>
            <input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />

            <button className="issue-btn" onClick={handleIssueBook}>
              Issue Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
