import React, { useState, useEffect } from "react";
import { Outlet, useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./StudentDashboard.css";
import "./StudentGeneral.css";
import "../../../../Admin/src/Dashboards/AdminDashboard/AdminDashboard.css";
import "../../../../Admin/src/Dashboards/AdminDashboard/AdminGeneral.css";
import logo from "../../assets/img/logo-transparent.jpg";
import StudentProfileImg from "../../assets/img/100x100.png";


const StudentDashboard = () => {
  const apiUrl = import.meta.env.VITE_Backend_URL;
  const location = useLocation();
  const [activeComponent, setActiveComponent] = useState("");
  const [UserData, setUserData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const splitPath = location.pathname.split("/")[2] || "Home";
    setActiveComponent(splitPath);

    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          return;
        }
        const response = await axios.get(`${apiUrl}/api/user/getUserDetails/${userId}`);
        setUserData((prev) => ({
          ...prev,
          ...response.data.user, // Ensures structure is maintained
        }));
      } catch (error) {
        console.log(error)
      }
    };
    fetchUserData();
  }, [location.pathname]); // Re-run when the path changes
  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="admin-dashboard-sidebar-overlay">
        <div className="admin-dashboard-sidebar">
          <div onClick={() => navigate("/")} className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <nav>
            <Link to="Home">
              <li className={activeComponent === "Home" ? "active" : ""}>
                Home
              </li>
            </Link>
            <Link to="my-courses">
              <li className={activeComponent === "my-courses" ? "active" : ""}>
                Courses
              </li>
            </Link>
            <Link to="assignment">
              <li className={activeComponent === "assignment" ? "active" : ""}>
                Assignment
              </li>
            </Link>
            <Link to="result">
              <li className={activeComponent === "result" ? "active" : ""}>
                Result
              </li>
            </Link>
            <Link to="profile">
              <li className={activeComponent === "profile" ? "active" : ""}>
                Profile
              </li>
            </Link>
          </nav>
          <div className="admin-dashboard-sidebar-bottom">
            <div className="Admin-Profile">
              <img src={UserData.image || StudentProfileImg} alt="Profile" />
              <div className="admin-profile-name-container">
                <p>{UserData.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Body */}
      <main className="student-main-body">
        <Outlet />
      </main>
    </div>
  );
};
export default StudentDashboard;
