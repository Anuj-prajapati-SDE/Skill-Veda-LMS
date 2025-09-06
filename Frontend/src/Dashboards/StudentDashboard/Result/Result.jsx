import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./Result.css";

const Button_4 = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [resultDatas, setResultDatas] = useState([]);

  const navigate = useNavigate();
  const notifyA = (e) => toast.success(e);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowModal(false);
    notifyA("Logged Out Successfully");
    navigate("/");
  };

  const apiUrl = import.meta.env.VITE_Backend_URL;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${apiUrl}/api/admin/result`);
  //     console.log(response)
  //       setResultDatas(response.data);
  //     } catch (error) {
  //       console.error("Error fetching assignments:", error);
  //       toast.error("Failed to load Results");
        
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div>
      <div className="admin-courses-header">
        <h2>Result</h2>
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

            {/* Bootstrap Modal */}
            {showModal && (
              <div
              className={`modal fade ${showModal ? "show d-block" : ""}`}
              tabIndex="-1"
              role="dialog"
              style={{ background: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog" role="document" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
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
            )}
          </div>
        </div>
      </div>

      {/* Result Card */}
      <div className="student-assignment-result-container">
        <h1 className="card-title">Your Assignment Result</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : resultDatas.length > 0 ? (
          resultDatas.map((resultData) => (
            <div className="result-card" key={resultData.id}>
              <p><strong>Result Assignment: {resultData.id}</strong></p>
              <div className="result-details">
                <div className="assignment-heading">
                  <p>Course Name:</p>
                  <p>Assignment Title:</p>
                  <p>Submission Date:</p>
                  <p>Submission EndDate:</p>
                  <p>Score:</p>
                  <p>Grade:</p>
                  <p>remarks:</p>
                </div>
                <div className="result-heading-data">
                  <p>{resultData.courseName}</p>
                  <p>{resultData.title}</p>
                  <p>{resultData.submissionDate}</p>
                  <p>{resultData.submissionEndDate}</p>
                  <p>{resultData.Score}</p>
                  <p>{resultData.Grade}</p>
                  <p>{resultData.remarks}</p>
                </div>
              </div>
              <div className="assignment-result-status-btn">
                <div className="status-container">
                  <span className="status">
                    Status: <span className={resultData.status.toLowerCase()}>{resultData.status}</span>
                  </span>
                </div>
                <div className="assignment-result-btn">
                  <button className="download-btn">Download Result</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No assignments result available.</p>
        )}
      </div>
    </div>
  );
};

export default Button_4;
