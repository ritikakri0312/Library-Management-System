import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    rollNo: "",
    name: "",
    email: "",
    course: ""
  });

  // Fetch Students
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add Student
  const addStudent = async () => {
    try {
      await axios.post("http://localhost:5000/api/students", formData);

      alert("Student Added Successfully!");
      setShowForm(false);
      setFormData({ rollNo: "", name: "", email: "", course: "" });

      fetchStudents();
    } catch (err) {
      console.error("Error adding student", err);
    }
  };

  // Delete Student
  const deleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      fetchStudents(); // refresh list
    } catch (err) {
      console.error("Error deleting student", err);
    }
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <Navbar />

        <div className="page">

          {/* HEADER */}
          <div className="header-row">
            <h1>Students</h1>
            <button className="btn-add" onClick={() => setShowForm(true)}>
              + Add Student
            </button>
          </div>

          {/* POPUP FORM */}
          {showForm && (
            <div className="popup">
              <div className="popup-inner">
                <h2>Add New Student</h2>

                <input
                  type="text"
                  name="rollNo"
                  placeholder="Roll No"
                  value={formData.rollNo}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="name"
                  placeholder="Student Name"
                  value={formData.name}
                  onChange={handleChange}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="course"
                  placeholder="Course"
                  value={formData.course}
                  onChange={handleChange}
                />

                <button className="btn-save" onClick={addStudent}>
                  Save
                </button>

                <button
                  className="btn-cancel"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* STUDENTS TABLE */}
          <table className="styled-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.length > 0 ? (
                students.map((s) => (
                  <tr key={s._id}>
                    <td>{s.rollNo}</td>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>{s.course}</td>

                    <td className="action-buttons">
                      <button className="btn-edit">
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => deleteStudent(s._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    No Students Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}
