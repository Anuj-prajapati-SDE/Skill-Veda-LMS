import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./AdminDashboard.css";
import "./AdminGeneral.css";
import axios from "axios";
import logo from "../../assets/img/logo-transparent.jpg";
import AdminProfileImg from "../../assets/img/100x100.png";

const AdminDashboard = () => {
  const apiUrl = import.meta.env.VITE_Backend_URL;
  const location = useLocation();
  const [activeComponent, setActiveComponent] = useState("Home");
  const [adminData, setAdminData] = useState("");

  useEffect(() => {
    const splitPath = location.pathname.split("/")[2] || "Home";
    setActiveComponent(splitPath);

    const fetchUserData = async () => {
      try {
        const id = localStorage.getItem("userId");
        if (!id) {
          return;
        }
        const response = await axios.get(`${apiUrl}/api/admin/getAdminDetails/${id}`);
        setAdminData((prev) => ({
          ...prev,
          ...response.data.admin, // Ensures structure is maintained
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
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <nav>
            <Link to="Home">
              <li className={`${activeComponent === "Home" ? "active" : ""}`}>
                Home
              </li>
            </Link>
            <Link to="course">
              <li className={`${activeComponent === "course" ? "active" : ""}`}>
                Course
              </li>
            </Link>
            {/* <Link to="instructor">
              <li className={`${activeComponent === "instructor" ? "active" : ""}`}>
                Instructor
              </li>
            </Link>
            <Link to="user">
              <li className={`${activeComponent === "user" ? "active" : ""}`}>
                User
              </li>
            </Link> */}
          </nav>
          <div className="admin-dashboard-sidebar-bottom">
            <div className="Admin-Profile">
              <img src={adminData.image || AdminProfileImg} alt="Profile" />
              <div className="admin-profile-name-container">
                <p>{adminData.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Body */}
      <main className="admin-main-body">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
