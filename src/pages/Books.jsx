import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    quantity: ""
  });

  // Fetch all books
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data);
    } catch (err) {
      console.log("Error fetching books:", err);
    }
  };

  // Open Add Book form
  const openAddForm = () => {
    setFormData({
      title: "",
      author: "",
      category: "",
      quantity: ""
    });
    setIsEditing(false);
    setShowForm(true);
  };

  // Open Edit Book form
  const handleEdit = (book) => {
    setFormData({
      _id: book._id,
      title: book.title,
      author: book.author,
      category: book.category,
      quantity: book.quantity
    });
    setIsEditing(true);
    setShowForm(true);
  };

  // Delete Book
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.log("Error deleting book:", err);
    }
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:5000/api/books/${formData._id}`,
          formData
        );
      } else {
        await axios.post("http://localhost:5000/api/books", formData);
      }

      setShowForm(false);
      fetchBooks();
    } catch (err) {
      console.log("Error saving book:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Books</h2>

      {/* ADD BOOK BUTTON */}
      <button
        onClick={openAddForm}
        style={{
          marginBottom: "15px",
          background: "purple",
          color: "#fff",
          padding: "10px 15px",
          borderRadius: "8px"
        }}
      >
        + Add Book
      </button>

      {/* BOOK FORM POPUP */}
      {showForm && (
        <div
          style={{
            background: "#222",
            padding: "20px",
            borderRadius: "8px",
            width: "350px",
            marginBottom: "20px"
          }}
        >
          <h3>{isEditing ? "Edit Book" : "Add Book"}</h3>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            /><br /><br />

            <input
              type="text"
              placeholder="Author"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              required
            /><br /><br />

            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            /><br /><br />

            <input
              type="number"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              required
            /><br /><br />

            <button
              type="submit"
              style={{
                background: "blue",
                color: "#fff",
                padding: "8px 15px",
                borderRadius: "6px"
              }}
            >
              {isEditing ? "Update Book" : "Add Book"}
            </button>
          </form>
        </div>
      )}

      {/* BOOKS TABLE */}
      <table style={{ width: "100%", background: "#111", color: "#fff" }}>
        <thead>
          <tr style={{ background: "#0d1a2b" }}>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map((b) => (
            <tr key={b._id}>
              <td>{b._id}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.category}</td>
              <td>{b.quantity}</td>

              <td>
                <button
                  style={{
                    background: "dodgerblue",
                    marginRight: "10px",
                    color: "#fff",
                    padding: "5px 10px",
                    borderRadius: "5px"
                  }}
                  onClick={() => handleEdit(b)}
                >
                  Edit
                </button>

                <button
                  style={{
                    background: "red",
                    color: "#fff",
                    padding: "5px 10px",
                    borderRadius: "5px"
                  }}
                  onClick={() => handleDelete(b._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
