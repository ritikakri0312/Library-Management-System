import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <Navbar />

        <div className="page">
          <h1>Dashboard</h1>
          <p>Welcome to the Library Management Dashboard.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
