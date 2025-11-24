import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

/* ADMIN PAGES */
import Dashboard from "./pages/Dashboard.jsx";
import Books from "./pages/Books.jsx";
import Students from "./pages/Students.jsx";
import IssueBook from "./pages/IssueBook.jsx";
import ReturnBook from "./pages/ReturnBook.jsx";
import NotFound from "./pages/NotFound.jsx";
import LoginForm from "./pages/LoginForm.jsx";
import AdminProfile from "./pages/AdminProfile.jsx";

/* STUDENT PAGES */
import StudentDashboard from "./pages/StudentDashboard.jsx";
import StudentBooks from "./pages/StudentBooks.jsx";
import MyIssuedBooks from "./pages/MyIssuedBooks.jsx";
import StudentProfile from "./pages/StudentProfile.jsx";

/* PROTECTED ROUTES */
import AdminProtectedRoute from "./components/AdminProtectedRoute.jsx";
import StudentProtectedRoute from "./components/StudentProtectedRoute.jsx";
import NotAuthorized from "./pages/NotAuthorized.jsx";

function App() {
  return (
    <Router>
      <Routes>

        {/* ---------- COMMON LOGIN ---------- */}
        <Route path="/login" element={<LoginForm />} />
        
        {/* ---------- ADMIN ROUTES ---------- */}
        <Route
          path="/"
          element={
            <AdminProtectedRoute>
              <Dashboard />
            </AdminProtectedRoute>
          }
        />

        {/* Not Authorized Page. */}
        <Route path="/unauthorized" element={<NotAuthorized/>}></Route>

        <Route
          path="/books"
          element={
            <AdminProtectedRoute>
              <Books />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <AdminProtectedRoute>
              <Students />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/issue"
          element={
            <AdminProtectedRoute>
              <IssueBook />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/return"
          element={
            <AdminProtectedRoute>
              <ReturnBook />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <AdminProtectedRoute>
              <AdminProfile />
            </AdminProtectedRoute>
          }
        />

        {/* ---------- STUDENT ROUTES ---------- */}
        <Route
          path="/student/dashboard"
          element={
            <StudentProtectedRoute>
              <StudentDashboard />
            </StudentProtectedRoute>
          }
        />

        <Route
          path="/student/books"
          element={
            <StudentProtectedRoute>
              <StudentBooks />
            </StudentProtectedRoute>
          }
        />

        <Route
          path="/student/my-books"
          element={
            <StudentProtectedRoute>
              <MyIssuedBooks />
            </StudentProtectedRoute>
          }
        />

        <Route
          path="/student/profile"
          element={
            <StudentProtectedRoute>
              <StudentProfile />
            </StudentProtectedRoute>
          }
        />

        {/* ---------- CATCH ALL ---------- */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default App;
