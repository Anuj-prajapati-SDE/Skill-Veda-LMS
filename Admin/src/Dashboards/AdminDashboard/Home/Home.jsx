import React, { useState } from "react";
import "./Home.css";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import StudentDataAnalytics from "./StudentDataAnalytics";
import CourseDataAnalytics from "./CourseDataAnalytics";

const AdminDashboardBody = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeComponent, setActiveComponent] = useState("student");

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_Backend_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include", // Important to include cookies
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.removeItem("userId");
        toast.success("Logged out successfully");
        window.location.href = "/"; // Redirect to login page
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* My Courses Section */}
      <section className="admin-my-courses">
        <div className="admin-courses-header no-searchbar">
          <h2>Admin Dashboard</h2>
          <div className="admin-search-bar home-search">
            <Link className="logout-icon" to="/">
              <i className="ri-home-9-line"></i>
            </Link>
            <div>
              {/* Logout Icon with Click Event */}
              <Link
                to={"/"}
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(true);
                }}
                className="logout-icon"
              >
                <i className="ri-logout-circle-r-line"></i>
              </Link>

              {/* Bootstrap Modal */}
              <div
                className={`modal fade ${showModal ? "show d-block" : ""}`}
                tabIndex="-1"
                role="dialog"
                style={{ background: "rgba(0,0,0,0.5)" }}
              >
                <div
                  className="modal-dialog"
                  role="document"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                  }}
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Confirm Logout</h5>
                      <button
                        type="button"
                        className="close"
                        onClick={() => setShowModal(false)}
                      >
                        <span>&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <p>Are you sure you want to log out?</p>
                    </div>
                    <div className="modal-footer">
                      <button
                        className="secondary-button"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="primary-button red"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <div className="admin-analytics">
        {/* Buttons to switch between components */}
        <div className="button-container">
          <button
            className={`analytics-button ${activeComponent === "student" ? "active" : ""
              }`}
            onClick={() => setActiveComponent("student")}
          >
            Student Data
          </button>
          <button
            className={`analytics-button ${activeComponent === "course" ? "active" : ""
              }`}
            onClick={() => setActiveComponent("course")}
          >
            Course Data
          </button>
          <button
            className={`analytics-button ${activeComponent === "fees" ? "active" : ""
              }`}
            onClick={() => setActiveComponent("fees")}
          >
            Fees Stats
          </button>
          <button
            className={`analytics-button ${activeComponent === "settings" ? "active" : ""
              }`}
            onClick={() => setActiveComponent("settings")}
          >
            More Settings
          </button>
        </div>

        {/* Render the active component */}
        <div className="analytics-content">
          {activeComponent === "student" && <StudentDataAnalytics />}
          {activeComponent === "course" && <CourseDataAnalytics />}
          {activeComponent === "fees" && (
            <h3>Fees Statistics Coming Soon...</h3>
          )}
          {activeComponent === "settings" && (
            <h3>Settings Page Coming Soon...</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboardBody;
