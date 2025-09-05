import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import axios from "axios";
import { Link } from "react-router-dom";
import CoursesImage from "../../assets/img/Courses.webp";
import "./CousesPage.css";

const CousesPage = () => {
  const apiUrl = import.meta.env.VITE_Backend_URL;
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch all courses when the component mounts
    fetchCourses();
    console.log(courses);
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/admin/getPublishedCourses`
      );
      setCourses(response.data); // Update the state with the fetched courses
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Breadcrumb courseImage={CoursesImage} />
      <div className="courses-area default-padding bottom-less">
        <div className="container">
          <div className="courses-box">
            <div className="row">
              {courses.map((course) => (
                <div key={course.id} className="single-item col-lg-4 col-md-6">
                  <div className="item">
                    <div className="thumb">
                      <a href="#">
                        <img
                          src={course.image || "assets/img/800x600.png"}
                          alt="Thumb"
                          style={{ width: "378.4px", height: "226.3px" }}
                        />
                      </a>
                      <div className="price">
                        <h5>
                          {course.fees <= 0 ? "Free" : <>₹ {course.fees}</>}
                        </h5>
                      </div>
                    </div>
                    <div className="info">
                      <h4>
                        <a href="#">{course.name}</a>
                      </h4>
                      <p>
                        {course.description.slice(0, 100)}
                        {course.description.length > 100 ? "..." : ""}
                      </p>
                      <div className="bottom-info">
                        <div className="course-info">
                          <i className="fas fa-user" />{" "}
                          {course.enrolledStudents.length || "0"} Students
                        </div>
                        <div className="rating">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star-half-alt" />
                          <span>
                            {course.rating || "0"} ({course.reviews || "0"})
                          </span>
                        </div>
                      </div>
                      <Link
                        className="btn card-btn btn-theme effect"
                        to={`/coursesdetails/${course._id}`}
                      >
                        Enroll Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CousesPage;
