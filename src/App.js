import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import AdminProfile from "./pages/AdminProfile";




// Pages
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Students from "./pages/Students";
import Signup from "./pages/Signup";
import IssueBook from "./pages/IssueBook";
import ReturnBook from "./pages/ReturnBook";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";


  // <-- added Login page

function App() {
  // Check login status
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("adminToken") ? true : false
  );

  return (
    <Router>

      {/* If NOT logged in → only show Login Page */}
      {!loggedIn ? (
        <Login onLogin={() => setLoggedIn(true)} />

      ) : (
        /* If logged in → show all routes */
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/books" element={<Books />} />
          <Route path="/students" element={<Students />} />
          <Route path="/issue" element={<IssueBook />} />
          <Route path="/return" element={<ReturnBook />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<AdminProfile />} />

          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}

    </Router>
  );
}

export default App;
