import React, { useState, useEffect } from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from '../../Components/Loader/Loader';
import logoTransparent from '../../assets/img/logo-transparent.jpg'
import './SignupPage.css'

const SignupPage = () => {
  const apiUrl = import.meta.env.VITE_Backend_URL;
  const navigate = useNavigate();
  const notifyA = (e) => toast.success(e);
  const notifyB = (e) => toast.error(e);
  const [loader, setLoader] = useState(false);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
    batch: "",
    interestedCourses: [],
  });
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  useEffect(() => {
    // Fetch courses from backend
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/admin/getcourses`);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCourseChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({ ...formData, interestedCourses: selectedOptions });
  };

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(formData.email)) {
      setLoader(false);
      notifyB("Invalid email format");
      return false;
    }

    if (!passwordRegex.test(formData.password)) {
      setLoader(false);
      notifyB(
        "Password must be at least 8 characters long, include one uppercase, one lowercase, one digit, and one special character."
      );
      return false;
    }

    if (!phoneRegex.test(formData.phoneNumber)) {
      setLoader(false);
      notifyB("Phone number must be exactly 10 digits");
      return false;
    }

    if (!formData.gender) {
      setLoader(false);
      notifyB("Please select a gender");
      return false;
    }

    if (!formData.batch) {
      setLoader(false);
      notifyB("Please select a batch type (Online or Offline)");
      return false;
    }

    if (formData.interestedCourses.length === 0) {
      setLoader(false);
      notifyB("Please select at least one course");
      return false;
    }

    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (!validateInputs()) {
      setLoader(false);
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/register`,
        { ...formData }
      );
      setLoader(false);
      notifyA(response.data.message);
      setIsOtpSent(true);
    } catch (error) {
      setLoader(false);
      notifyB(error.response?.data?.message || "Signup failed");
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/verify-otp`,
        { email: formData.email, otp }
      );
      if (response.data.message === "OTP verified successfully.") {
        setLoader(false);
        notifyA("OTP verified successfully");
        navigate("/login");
      }
    } catch (error) {
      setLoader(false);
      notifyB(error.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-area mt-4 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 offset-lg-4">
              <div className="login-box">
                <div className="login">
                  <div className="content">
                    <a href="/">
                      <img src={`${logoTransparent}`} alt="Logo" />
                    </a>
                    {loader ? <Loader /> : (
                      <>
                        <form onSubmit={isOtpSent ? handleVerifyOTP : handleSignup}>
                          {!isOtpSent ? (
                            <>
                              <div className="form-group">
                                <i className="fa fa-pen"></i>
                                <input
                                  className="form-control"
                                  placeholder="Name*"
                                  type="text"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                              <div className="form-group">
                                <i className="fas fa-envelope-open" />
                                <input
                                  className="form-control"
                                  placeholder="Email*"
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                              <div className="form-group">
                                <i className="fas fa-lock" />
                                <input
                                  className="form-control"
                                  placeholder="Password*"
                                  type="password"
                                  name="password"
                                  value={formData.password}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                              <div className="form-group">
                                <i className="fas fa-phone" />
                                <input
                                  className="form-control"
                                  placeholder="Enter your Number*"
                                  type="text"
                                  name="phoneNumber"
                                  value={formData.phoneNumber}
                                  onChange={handleChange}
                                  maxLength="10"
                                  required
                                />
                              </div>

                              {/* Gender Selection */}
                              <div className="form-group">
                                {/* <i className="fas fa-venus-mars"></i> */}
                                <select className="form-control" name="gender" value={formData.gender} onChange={handleChange} required>
                                  <option value="">Select Gender*</option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                  <option value="other">Other</option>
                                </select>
                              </div>

                              {/* Batch Type Selection */}
                              <div className="form-group">
                                {/* <i className="fas fa-laptop-house"></i> */}
                                <select className="form-control" name="batch" value={formData.batch} onChange={handleChange} required>
                                  <option value="">Select Batch Type*</option>
                                  <option value="online">Online</option>
                                  <option value="offline">Offline</option>
                                </select>
                              </div>

                              {/* Course Selection Dropdown */}
                              <div className="form-group">
                                <select className="form-control" multiple name="interestedCourses" value={formData.interestedCourses} onChange={handleCourseChange} required>
                                  {courses.map(course => (
                                    <option key={course._id} value={course._id}>{course.name}</option>
                                  ))}
                                </select>
                              </div>

                              <button type="submit">Sign Up</button>
                            </>
                          ) : (
                            <>
                              <div className="form-group">
                                <input className="form-control" placeholder="Enter OTP" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                              </div>
                              <button type="submit">Verify OTP</button>
                            </>
                          )}
                        </form>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default SignupPage;
