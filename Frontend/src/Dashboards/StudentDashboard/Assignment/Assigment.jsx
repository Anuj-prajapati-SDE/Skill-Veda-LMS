import React, { useState, useEffect } from "react";
import "./Assignment.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Assignment = () => {
  const [showModal, setShowModal] = useState(false);
  const [assignments, setAssignments] = useState([]);

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_Backend_URL;

  // useEffect(() => {
  //   const fetchAssignments = async () => {
  //     try {
  //       const response = await axios.get(`${apiUrl}/api/admin/assignment`);
  //       // setAssignments(response.data);
  //     } catch (error) {
  //       console.error("Error fetching assignments:", error);
  //       toast.error("Failed to load assignments");
  //     }
  //   };

  //   fetchAssignments();
  // }, []);

  const notifyA = (message) => toast.success(message);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowModal(false);
    notifyA("Logged Out Successfully");
    navigate("/");
  };

  return (
    <div>
      <div className="admin-courses-header">
        <h2>Assignments</h2>
        <div className="admin-search-bar">
          <input
            type="text"
            placeholder="What do you want to learn?"
            className="admin-search-input"
          />
          <button className="logout-icon bg-green">
            <i className="fas fa-search"></i>
          </button>
          <Link className="logout-icon" to="/">
            <i className="ri-home-9-line"></i>
          </Link>
          <div>
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
      <div className="student-assignment-container">
        {Array.isArray(assignments) && assignments.length > 0 ? (
          assignments.map((assignment) => (
            <div className="assignment-card" key={assignment.id}>
              <p>
                <strong>Assigment :{assignment.id}</strong>
              </p>
              <div className="assignment-details">
                <div className="assignment-heading">
                  <p>Course Name:</p>
                  <p>Assignment Title:</p>
                  <p>Description:</p>
                  <p>Submission Date:</p>
                  <p>Submission Ending Date:</p>
                </div>
                <div className="assignment-heading-data">
                  <p>{assignment.courseName}</p>
                  <p>{assignment.title}</p>
                  <p>{assignment.description}</p>
                  <p>{assignment.submissionDate}</p>
                  <p>{assignment.submissionEndDate}</p>
                </div>
              </div>
              <div className="assignment-status-btn">
                <div className="status-container">
                  <span className="status">
                    Status:{" "}
                    <span className={assignment.status.toLowerCase()}>
                      {assignment.status}
                    </span>
                  </span>
                </div>
                <div className="assignment-btn">
                  <button className="download-btn">Download Assignment</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No assignments available.</p>
        )}
      </div>
    </div>
  );
};

export default Assignment;
