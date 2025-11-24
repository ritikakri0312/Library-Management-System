import { useEffect, useState } from "react";
import axios from "axios";

function StudentProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/student/profile",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ Backend returns: { success: true, student: {...} }
      setProfile(res.data.student);
    };

    fetchProfile();
  }, []);

  if (!profile) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>

      <div className="bg-gray-800 p-6 rounded-xl shadow max-w-md">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
      </div>
    </div>
  );
}

export default StudentProfile;
