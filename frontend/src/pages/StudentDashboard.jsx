import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function StudentDashboard() {
  const notify = () => toast("Login Successful!");
  // const [isStudent, setIsStudent] = useState();
  useEffect(() => {
    const msg = localStorage.getItem("loginsSccessFull");
    // const role = localStorage.getItem("role");
    // if(role === "student"){
    //   setIsStudent(true);
    // }
    if (msg === "true") {
      notify();
      localStorage.setItem("loginsSccessFull", false);
    }
  }, []);
  return (
    <>
      <div className="p-6 text-white bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/student/books"
            className="bg-blue-700 p-6 rounded-xl shadow"
          >
            <h2 className="text-xl font-semibold">📚 View Books</h2>
          </Link>

          <Link
            to="/student/my-books"
            className="bg-green-700 p-6 rounded-xl shadow"
          >
            <h2 className="text-xl font-semibold">📖 My Issued Books</h2>
          </Link>

          <Link
            to="/student/profile"
            className="bg-purple-700 p-6 rounded-xl shadow"
          >
            <h2 className="text-xl font-semibold">🙍 Profile</h2>
          </Link>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default StudentDashboard;
