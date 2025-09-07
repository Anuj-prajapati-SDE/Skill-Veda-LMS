import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link, useResolvedPath } from "react-router-dom";
import axios from "axios";
import CourseCard from "./Components/CourseCard";
import "./MyCourses.css";
import VideoLecturePage from "./Components/VideoLecturePage";
import PaymentPage from "./Components/PaymentPage";
import toast from "react-hot-toast";

const MyCourses = () => {
  const userId = localStorage.getItem("userId");
  const location = useLocation();
  const apiUrl = import.meta.env.VITE_Backend_URL;
  const [courses, setCourses] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const [showModal, setShowModal] = useState(false); 

  const navigate = useNavigate();

  const notifyA = (e) => toast.success(e);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowModal(false);
    notifyA("Logged Out Successfully");
    navigate("/"); // Redirect to home
  };

  useEffect(() => {
    getUserDetails();
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      if (!userId) {
        throw new Error("User ID not found in localStorage");
      }
      const response = await axios.get(
        `${apiUrl}/api/user/enrolled-courses?userId=${userId}`
      );
      if (response.data) {
        setCourses(response.data);
      }
    } catch (error) {
      console.error("Error fetching enrolled courses:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/user/getUserDetails/${userId}`
      );
      setUserDetails(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  };

  const ids = courses.map((e) => e._id);
  const isPaymentPage = ids.some(
    (id) =>
      location.pathname === `/userdashboard/my-courses/payment-page/${id}`
  );
  const isCourses = location.pathname === "/userdashboard/my-courses";
  const isVideoLecture = ids.some(
    (id) =>
      location.pathname === `/userdashboard/my-courses/video-leature/${id}`
  );

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter courses based on search term
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="courses-section-s">
      {isCourses && (
        <>
          {/* Page Heading with Search Bar */}
          <div className="admin-courses-header">
            <h2>Courses </h2>
            <div className="admin-search-bar">
              <input
                type="text"
                placeholder="What do you want to learn?"
                className="admin-search-input"
                value={searchTerm} // Bind search term to input value
                onChange={handleSearchChange} // Handle input change
              />
              <button className="logout-icon bg-green">
                <i className="fas fa-search"></i>
              </button>
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
              </div>
            </div>
          </div>

          {/* Loading and Error Handling */}
          {loading ? (
            <p>Loading courses...</p>
          ) : error ? (
            <p className="error-text">{error}</p>
          ) : filteredCourses.length > 0 ? ( // Use filteredCourses here
            <div className="Courses-card-container container mt-2"> 
              {filteredCourses.map((course) => ( // Use filteredCourses here
                <CourseCard key={course._id} {...course} />
              ))}
            </div>
          ) : (
            <p>No enrolled courses found.</p>
          )}
        </>
      )}
      {isVideoLecture && <VideoLecturePage />}
      {isPaymentPage && (
        <PaymentPage userDetails={userDetails} courseData={courses} />
      )}
    </div>
  );
};

export default MyCourses;

