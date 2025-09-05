import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';
import Navbar from '../../Components/Navbar/Navbar';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './CousesDetails.css';
import LoginPopup from '../../Components/Popup/LoginPopup';
import SuccessPopup from '../../Components/Popup/SuccessPopup';
import toast from 'react-hot-toast';

const CousesDetails = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showEnrollSuccess, setShowEnrollSuccess] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false); // Track enrollment process
  const apiUrl = import.meta.env.VITE_Backend_URL;
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/admin/getcourseById/${id}`);
      setCourse(response.data);
    } catch (error) {
      console.error('Failed to fetch course details:', error);
    }
  };
  const userId = localStorage.getItem('userId');
  const courseId = id;
  const handleEnroll = async () => {

    const user = await fetch(`${import.meta.env.VITE_Backend_URL}/api/auth/user`, {
      method: "GET",
      credentials: "include",
    });


    setIsEnrolling(true);

    try {
      if (!user.ok) {
        navigate('/login');
        toast.error(" Please login first ");
        return;
      }

      const response = await axios.post(
        `${apiUrl}/api/user/enroll-student`,
        { userId, courseId },
      );

      if (response.status === 200) {
        setShowEnrollSuccess(true);
      }
    } catch (error) {
      if (!response.ok) {
        navigate('/login');
        toast.error(" Please login first ");
        return;
      }
      toast.error("You are Already enroll this course");
    } finally {
      setIsEnrolling(false);
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div
        className="breadcrumb-area bg-gray text-center shadow dark text-light bg-cover"
        style={{ backgroundImage: `url(${course.image})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h1>CourseDetails</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">
                    <i className="fas fa-home" /> Home
                  </a>
                </li>
                <li className="active">Courses/CourseDetails</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="course-details-area default-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 info">
              <div className="top-info">
                <h2>{course.name || 'Course Name'}</h2>
                <ul>
                  <li>
                    <div className="thumb">
                      <img src={course.image || "assets/img/100x100.png"} alt="Thumb" />
                    </div>
                    <div className="info">
                      <span>Teacher</span>
                      <h5>{course.instructor || 'Instructor Name'}</h5>
                    </div>
                  </li>
                  <li>
                    <div className="info">
                      <span>Category</span>
                      <h5>{course.category || 'Category'}</h5>
                    </div>
                  </li>
                  <li>
                    <div className="info">
                      <span>Last Update</span>
                      <h5>{course.lastUpdate || 'Last Update Date'}</h5>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="main-content">
                <div className="center-tabs">
                  <ul id="tabs" className="nav nav-tabs">
                    <li className="nav-item">
                      <a href="#" data-target="#tab1" data-toggle="tab" className="active nav-link">
                        Overview
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" data-target="#tab2" data-toggle="tab" className="nav-link">
                        Curriculum
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" data-target="#tab3" data-toggle="tab" className="nav-link">
                        Advisor
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" data-target="#tab4" data-toggle="tab" className="nav-link">
                        Reviews
                      </a>
                    </li>
                  </ul>
                  <div id="tabsContent" className="tab-content">
                    <div id="tab1" className="tab-pane overview fade active show">
                      <h4>Course Description</h4>
                      <p>{course.description || 'Course Description'}</p>
                      {/* <h4>Learning Objectives</h4>
                      <ul>
                        <li>Be able to use simple tricks and techniques to make self-control easier.</li>
                        <li>Actually apply these strategies and make a deliberate effort to understand their effects</li>
                        <li>Have a huge advantage when it comes to sticking to your diet</li>
                        <li>Meeting your fitness goals, and leading a healthier lifestyle.</li>
                      </ul> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 sidebar">
              <div className="item course-preview">
                <div className="thumb">
                  <img src={course.image || "assets/img/800x600.png"} alt="Thumb" />
                </div>
                <div className="content">
                  <div className="top">
                    <div className="pricce">
                      <h2>{course.fees ? `₹ ${course.fees}` : 'Free'}</h2>
                    </div>
                    <div className="rating">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star-half-alt" />
                      <span>4.8 (867)</span>
                    </div>
                  </div>
                  <div className="course-includes">
                    <ul>
                      <li>
                        <i className="fas fa-copy" /> Lectures
                        <span className="float-right">8</span>
                      </li>
                      <li>
                        <i className="fas fa-clock" /> Duration
                        <span className="float-right">{course.duration || 'Duration'}</span>
                      </li>
                      <li>
                        <i className="fas fa-sliders-h" /> Skill level
                        <span className="float-right">All Levels</span>
                      </li>
                      <li>
                        <i className="fas fa-language" /> Language
                        <span className="float-right">English</span>
                      </li>
                      <li>
                        <i className="fas fa-users" /> Students
                        <span className="float-right">12K</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    className="btn btn-theme effect btn-sm"
                    onClick={handleEnroll}
                    disabled={isEnrolling}
                  >
                    {isEnrolling ? "Enrolling..." : "Enroll Now"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showLoginPopup && <LoginPopup show={showLoginPopup} onClose={() => setShowLoginPopup(false)} />}
      {showEnrollSuccess && <SuccessPopup show={showEnrollSuccess} onClose={() => setShowEnrollSuccess(false)} />}
    </>
  );
};

export default CousesDetails;
