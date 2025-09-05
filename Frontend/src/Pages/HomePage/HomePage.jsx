import {
  FooterPage,
  HomeFunFactorSectionPage,
  HomeAboutSectionPage,
  HomeCourseAdvisorSectionPage,
  HomeCoursesSectionPage,
  HomeBannerSectionPage,
  HomeDefaultFeaturePage,
  HomeWhyChoseSectionPage,
  HomeTestimonialSectionPage,
  HomeEventSectionPage,
} from ".";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logoTransparent from "../../assets/img/logo-transparent.jpg";
import "./HomePage.css";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [UserData, setUserData] = useState("");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate(); 
  const apiUrl = import.meta.env.VITE_Backend_URL;
  useEffect(() => {

    if (localStorage.getItem("userId")) {
      const fetchUser = async () => {
        try {
          const user = await fetch(`${apiUrl}/api/auth/user`, {
            method: "GET",
            credentials: "include",
          });
          setIsLoggedIn(true);
          setUserRole(user.role);
        } catch (error) {
          console.error("Invalid token:", error);
        }
      }
      fetchUser();
    }
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          return;
        }
        const response = await axios.get(
          `${apiUrl}/api/user/getUserDetails/${userId}`
        );
        setUserData((prev) => ({
          ...prev,
          ...response.data.user, // Ensures structure is maintained
        }));
        console.log(UserData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  const handleNavigation = () => {
    // Navigate to the appropriate dashboard based on user role
    if (userRole === "admin") {
      navigate("/admindashboard/Home");
    } else {
      navigate("/userdashboard/Home");
    }
  };

  return (
    <div className="wrapper">
      <div className="se-pre-con" style={{ display: "none" }} />
      <div className="top-bar-area bg-dark text-light inline inc-border">
        <div className="container">
          <div className="row align-center">
            <div className="col-lg-7 col-md-12 left-info">
              <div className="item-flex">
                <ul className="list">
                  <li>
                    <i className="fas fa-phone" /> Have any question? +91
                    7004379646
                  </li>
                  <li>
                    <i className="fas fa-bullhorn" />
                    <Link to="/underdevelopment">Become an Instructor</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5 col-md-12 right-info">
              <div className="item-flex">
                <div className="social">
                  <ul>
                    <li>
                      <Link to="#">
                        <i className="fab fa-facebook-f" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fab fa-twitter" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fab fa-pinterest-p" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fab fa-linkedin-in" />
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="button">
                  {isLoggedIn ? (
                    <button
                      onClick={handleNavigation}
                      className="dashboard-btn"
                    >
                      Dashboard
                    </button>
                  ) : (
                    <>
                      <Link to="/signup">Register</Link>
                      <Link to="/login">
                        <i className="fa fa-sign-in-alt" />
                        Login
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <header id="home">
        {/* Start Navigation */}
        <div className="wrap-sticky" style={{ height: 92 }}>
          <nav className="navbar shadow-less navbar-default navbar-sticky bootsnav on no-full">
            <div className="container">
              {/* Start Atribute Navigation */}
              <div className="attr-nav">
                <form action="#">
                  <input
                    type="text"
                    placeholder="Search"
                    className="form-control"
                    name="text"
                  />
                  <button type="submit">
                    <i className="fa fa-search" />
                  </button>
                </form>
              </div>
              {/* End Atribute Navigation */}
              {/* Start Header Navigation */}
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle"
                  data-toggle="collapse"
                  data-target="#navbar-menu"
                >
                  <i className="fa fa-bars" />
                </button>
                <a className="navbar-brand" href="">
                  <img src={`${logoTransparent}`} className="logo" alt="Logo" />
                </a>
              </div>
              {/* End Header Navigation */}
              {/* Collect the nav links, forms, and other content for toggling */}
              <div className="collapse navbar-collapse" id="navbar-menu">
                <ul
                  className="nav navbar-nav navbar-right"
                  data-in="fadeInDown"
                  data-out="fadeOutUp"
                >
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li className="dropdown">
                    <a
                      href="#"
                      className="dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      Services
                    </a>
                    <ul className="dropdown-menu animated">
                      <li>
                        <Link to="/corporate-training">Corporate Training</Link>
                      </li>
                      <li>
                        <Link to="/college-campus-training">
                          College Campus Training
                        </Link>
                      </li>
                      <li>
                        <Link to="/summer-training">Summer Training</Link>
                      </li>
                      <li>
                        <Link to="/winter-training">Winter Training</Link>
                      </li>
                      <li>
                        <Link to="/internship-program">Internship Program</Link>
                      </li>
                      <li>
                        <Link to="/web-development">Web Development</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/courses">Courses</Link>
                  </li>
                  <li>
                    <Link to="/about">About us</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                  <li>
                    <Link to="/faqs">Faq</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        {/* End Navigation */}
      </header>
      <HomeBannerSectionPage></HomeBannerSectionPage>
      <HomeDefaultFeaturePage></HomeDefaultFeaturePage>
      <HomeAboutSectionPage></HomeAboutSectionPage>
      <HomeWhyChoseSectionPage></HomeWhyChoseSectionPage>
      <HomeCoursesSectionPage></HomeCoursesSectionPage>
      <HomeFunFactorSectionPage></HomeFunFactorSectionPage>
      {/* <HomeCourseAdvisorSectionPage></HomeCourseAdvisorSectionPage> */}
      <HomeEventSectionPage></HomeEventSectionPage>
      <HomeTestimonialSectionPage></HomeTestimonialSectionPage>
      <FooterPage></FooterPage>
    </div>
  );
};

export default HomePage;
