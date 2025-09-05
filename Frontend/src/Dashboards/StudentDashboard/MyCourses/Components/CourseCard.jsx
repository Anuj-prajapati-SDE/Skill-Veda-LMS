import React from "react";
import "./CourseCard.css"; // Custom CSS for styling
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const CourseCard = ({
  image,
  name,
  level,
  description,
  duration,
  rating,
  instructor,
  _id,
  fees,
}) => {  
  const courseId = _id;
  const apiUrl = import.meta.env.VITE_Backend_URL;
  const userId = localStorage.getItem('userId');
  const [EnrollUserData, setEnrollUserData] = useState([]);
  useEffect(() => {
    fetchEnrolledUser()
  }, []);
  const fetchEnrolledUser = async () => {
    try {
      if (!userId) {
        throw new Error("User ID not found in localStorage");
      }
      const response = await axios.get(`${apiUrl}/api/user/getEnrollmentStudent/${userId}/${courseId}`);
      if (response.data) {
        setEnrollUserData(response.data);
        // Update state with enrolled student data

      } else {
        throw new Error("No enrolled student data found.");
      }
    } catch (error) {
      console.error("Error fetching enrolled courses:", error.message);
      setError(error.message);
    } 
  };
  return (
    <div className="course-card">
      {/* Course Image */}
      <div className="course-image">
        <img src={image} alt={name} />
      </div>

      {/* Course Content */}
      <div className="course-content">
        <div className="course-header">
          <h5 className="course-name">{name}</h5>
          <span>{fees <= 0 ? "Free" : <>₹ {fees}</>}</span>
        </div>
        <p className="course-description">{description}</p>

        {/* Ratings & Duration */}
        <div className="course-footer">
          <div className="course-rating">
            ⭐⭐⭐⭐☆ <span className="rating-count">({rating})</span>
          </div>
          <div className="course-duration">⏳ {duration}</div>
        </div>

        {/* Button */}
        <div className="payment-video-leature-btn">
        {fees === 0 || EnrollUserData.feesStatus === "Paid Full Fees" ? (
  <Link className="Start-Learning-btn" to={`video-leature/${_id}`}>
    Start Learning
  </Link>
) : EnrollUserData.feesStatus === "Paid Registration Fees" ? (
  <>
    <Link className="primary-button" to={`payment-page/${_id}`}>
      Pay Full Fees
    </Link>
    <Link className="secondary-button" to={`video-leature/${_id}`}>
      Explore Course
    </Link>
  </>
) : (
  <>
    <Link className="primary-button" to={`payment-page/${_id}`}>
      Buy Course
    </Link>
    <Link className="secondary-button" to={`video-leature/${_id}`}>
      Watch trial video
    </Link>
  </>
)}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
