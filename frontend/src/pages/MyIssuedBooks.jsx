import { useEffect, useState } from "react";
import axios from "axios";

function MyIssuedBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchIssued = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/student/my-books",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBooks(res.data.books || []);   // ✅ FIX
    };

    fetchIssued();
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">My Issued Books</h1>

      {books.length === 0 && (
        <p className="text-gray-400">No issued books found.</p>
      )}

      {books.map((b) => (
        <div key={b._id} className="bg-gray-800 p-4 rounded-xl mt-4">
          <h2 className="text-xl font-semibold">{b.book?.title}</h2>
          <p>Issued On: {new Date(b.issueDate).toLocaleDateString()}</p>
          <p>
            Return Date:{" "}
            {b.returnDate
              ? new Date(b.returnDate).toLocaleDateString()
              : "Not Returned"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MyIssuedBooks;

