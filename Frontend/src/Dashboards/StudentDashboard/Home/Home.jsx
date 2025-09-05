import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
  const apiUrl = import.meta.env.VITE_Backend_URL;
  const [courses, setCourses] = useState([]);
  const [PendingDues, setPendingDues] = useState();
  const [EnrollUserData, setEnrollUserData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isMarked, setIsMarked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
    getPaymentData();
    // fetchEnrolledUser();
  }, []);

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
        window.location.href = "/login"; // Redirect to login page
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleDuePayment = (index) => {
    navigate(`/userdashboard/my-courses/payment-page/${PendingDues[index].courseId}`);
  }

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/admin/getPublishedCourses`
      );
      setCourses(response.data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  const getPaymentData = async () => {
    const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    try {
      const response = await axios.get(
        `${apiUrl}/api/payment/getPaymentData/${userId}`
      );
      setPendingDues(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch payment data:",
        error.response?.data || error
      );
    }
  };

  const handleMarkAttendance = async () => {
    try {
      const studentId = localStorage.getItem("userId");
      if (!studentId) {
        toast.error("Student ID not found! Please log in.");
        return;
      }

      if (!navigator.geolocation) {
        toast.error("Geolocation is not supported by your browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            await axios.post(`${apiUrl}/api/user/markedAttendance`, {
              studentId,
              latitude,
              longitude
            });

            toast.success("Attendance Marked Successfully!");
            setIsMarked(true); // Disable button after marking attendance
          } catch (error) {
            toast.error(error.response?.data?.error || "Failed to mark attendance. Try again later.");
          }
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              toast.error("Please allow location access in your browser settings.");
              break;
            case error.POSITION_UNAVAILABLE:
              toast.error("Location information is unavailable. Make sure GPS or Wi-Fi is turned on.");
              break;
            case error.TIMEOUT:
              toast.error("Location request timed out. Move to an open area and try again.");
              break;
            default:
              toast.error("Failed to retrieve location. Try again.");
              break;
          }
        },
        {
          enableHighAccuracy: false, // Set to false if high accuracy is causing failures
          timeout: 20000, // Increased to 20 seconds
          maximumAge: 60000 // Allow cached location if available (1 minute old)
        }
      );
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };


  return (
    <>
      <div className="admin-courses-header">
        <h2>Student Dashboard</h2>
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
              to="/"
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

      <div className="student-course-cards">
        <div className="student-course-card">
          <h3>Marked Attendance</h3>
          <button
            onClick={handleMarkAttendance}
            disabled={isMarked}
            className={`primary-button  ${isMarked ? "disabled-button" : ""} `}
          >
            {isMarked ? "Attendance Marked ✅" : "Mark Attendance"}
          </button>
        </div>
        <div className="student-course-card">
          <h3>My Progress</h3>
          <div className="student-progress-container"></div>
        </div>

        <div className="student-course-card">
          <h3>Help Section</h3>
          <p>
            Need help? Our help section is here to guide you. For any questions
            or concerns, please send us a message by clicking the button below.
          </p>
          <button className="primary-button" style={{ marginLeft: "0px" }} onClick={() => navigate('/contact')}>
            Help!
          </button>
        </div>
      </div>

      <div className="student-bottom-section">
        <section className="student-my-progress">
          <h2> Fees Dues</h2>
          <div className="pending-payment-view-container">
            {PendingDues && PendingDues.length > 0 ? (
              PendingDues.map((pending, index) => (
                <>

                  {pending.status === "completed" && pending.PayedAmount + pending.RegistrationFees !== pending.courseFullPayment && (
                    <div key={index} className="pending-payment-view">
                      <h4>{pending.courseName}</h4>
                      <div>
                        <strong>Paid Amount:</strong> ₹{pending.PayedAmount}
                      </div>
                      <div>
                        <strong>Remaining Amount:</strong> ₹
                        {pending.courseFullPayment - pending.PayedAmount}
                      </div>
                      <button className="primary-button" onClick={() => handleDuePayment(index)}>
                        Pay Full Payment
                      </button>
                    </div>
                  )}

                </>
              ))
            ) : (
              <p>No pending payments found.</p>
            )}
          </div>
        </section>

        <section className="student-lections">
          <h2>Popular Courses</h2>
          <div className="student-lections-header">
            {courses.map((course) => (
              <div key={course._id} className="student-Home-course-card">
                <div className="student-Home-course-card-img">
                  <img
                    src={course.image}
                    alt={course.name}
                    className="course-image"
                  />
                </div>
                <div className="student-Home-course-card-data">
                  <h4>{course.name}</h4>
                  <p>
                    {course.description.length > 50
                      ? `${course.description.slice(0, 50)}...`
                      : course.description}
                  </p>
                  <strong>{course.fees <= 0 ? "Free" : course.fees}</strong>
                  <Link
                    className="primary-button"
                    to={`/coursesdetails/${course._id}`}
                  >
                    Enroll
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
