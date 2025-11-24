import { useEffect, useState } from "react";
import axios from "axios";

function StudentBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/student/books",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBooks(res.data.books);  // ✅ FIXED
    };

    fetchBooks();
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Available Books</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books.map((b) => (
          <div key={b._id} className="bg-gray-800 p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold">{b.title}</h2>
            <p>Author: {b.author}</p>
            <p>Category: {b.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentBooks;
