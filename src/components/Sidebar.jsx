import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="text-2xl font-bold mb-8">Library Admin</h2>

      <nav className="space-y-4">
        <Link to="/">Dashboard</Link>
        <Link to="/students">Students</Link>
        <Link to="/books">Books</Link>
        <Link to="/issue">Issue Book</Link>
        <Link to="/return">Return Book</Link>

        {/* ⭐ Added Admin Profile link */}
        <Link to="/profile">Admin Profile</Link>
      </nav>
    </div>
  );
}

