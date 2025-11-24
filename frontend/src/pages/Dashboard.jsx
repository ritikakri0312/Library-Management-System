import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    students: 0,
    issued: 0,
    overdue: 0,
  });

  const [recentIssued, setRecentIssued] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
  try {
    const token = localStorage.getItem("adminToken");

    const booksRes = await axios.get(
      "http://localhost:5000/api/books",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const studentsRes = await axios.get(
      "http://localhost:5000/api/students",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const issuedRes = await axios.get(
      "http://localhost:5000/api/issued-books",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const issuedBooks = issuedRes.data;

    setStats({
      totalBooks: booksRes.data.length,
      students: studentsRes.data.length,
      issued: issuedBooks.filter(b => b.status === "Issued").length,
      overdue: issuedBooks.filter(
        b => b.status === "Issued" && new Date(b.returnDate) < new Date()
      ).length,
    });

    setRecentIssued(issuedBooks.slice(-5).reverse());

    const count = {};
    issuedBooks.forEach(b => {
      count[b.bookTitle] = (count[b.bookTitle] || 0) + 1;
    });

    const popularList = Object.entries(count)
      .map(([title, total]) => ({ title, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    setPopularBooks(popularList);

  } catch (err) {
    console.log(err);
  }
};


  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <Navbar />

        {/* -------- STATS CARDS -------- */}
        <div className="stats-container">

          <div className="stat-card">
            <div className="icon">📚</div>
            <h3>Total Books</h3>
            <p>{stats.totalBooks}</p>
          </div>

          <div className="stat-card">
            <div className="icon">👨‍🎓</div>
            <h3>Students</h3>
            <p>{stats.students}</p>
          </div>

          <div className="stat-card">
            <div className="icon">📕</div>
            <h3>Issued Books</h3>
            <p>{stats.issued}</p>
          </div>

          <div className="stat-card overdue">
            <div className="icon">⏳</div>
            <h3>Overdue</h3>
            <p>{stats.overdue}</p>
          </div>

        </div>

        {/* -------- RECENT ISSUED TABLE -------- */}
        <div className="section-box">
          <h3>Recently Issued Books</h3>

          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Book</th>
                <th>Issue Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentIssued.map((b) => (
                <tr key={b._id}>
                  <td>{b.studentName}</td>
                  <td>{b.bookTitle}</td>
                  <td>{new Date(b.issueDate).toLocaleDateString()}</td>
                  <td>{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* -------- POPULAR BOOKS + GRAPH -------- */}
        <div className="bottom-sections">

          <div className="section-box popular-box">
            <h3>Popular Books</h3>
            <ul>
              {popularBooks.map((b, i) => (
                <li key={i}>
                  {b.title} — <strong>{b.total} issues</strong>
                </li>
              ))}
            </ul>
          </div>

          <div className="section-box graph-box">
            <h3>Issued Per Month</h3>

            <div className="graph">
              <div className="bar" style={{ height: "40%" }}></div>
              <div className="bar" style={{ height: "60%" }}></div>
              <div className="bar" style={{ height: "80%" }}></div>
              <div className="bar" style={{ height: "50%" }}></div>
              <div className="bar" style={{ height: "30%" }}></div>
            </div>

            <div className="graph-labels">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
