import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from '../../Components/Loader/Loader';
import "./ForgotPassword.css";
import logoTransparent from '../../assets/img/logo-transparent.jpg'

const ForgotPassword = () => {
  const apiUrl = import.meta.env.VITE_Backend_URL;
  const notifyA = (e) => toast.success(e);
  const notifyB = (e) => toast.error(e);
  const [loader, setLoader] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const [isOtpSent, setIsOtpSent] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLoader(false);
      notifyB("Invalid email format");
      return false;
    }
    return true;
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setLoader(false);
      notifyB(
        "Password must be at least 8 characters long, include one uppercase, one lowercase, one digit, and one special character."
      );
      return false;
    }
    return true;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (!validateEmail(formState.email)) return;

    try {
      const response = await fetch(`${apiUrl}/api/auth/forgotpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formState.email }),
      });

      const data = await response.json();

      if (response.ok) {
        setLoader(false);
        notifyA(data.message || "OTP sent successfully");
        setIsOtpSent(true);
      } else {
        setLoader(false);
        notifyB(data.message || "Failed to send OTP");
      }
    } catch (error) {
      setLoader(false);
      notifyB("Something went wrong. Please try again.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoader(true);
    const { otp, newPassword } = formState;

    if (!otp) {
      setLoader(false);
      notifyB("OTP is required");
      return;
    }

    if (!validatePassword(newPassword)) return setLoader(false);

    try {
      const response = await fetch(`${apiUrl}/api/auth/verify-otp-forgotpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formState.email, otp, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setLoader(false);
        notifyA(data.message || "Password reset successfully");
        navigate("/login");
      } else {
        setLoader(false);
        notifyB(data.message || "Failed to reset password");
      }
    } catch (error) {
      setLoader(false);
      notifyB("Something went wrong. Please try again.");
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
                        <form
                          onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp}
                        >
                          {!isOtpSent ? (
                            <>
                              <div className="form-group">
                                <i className="fas fa-envelope-open" />
                                <input
                                  className="form-control"
                                  placeholder="Email*"
                                  type="email"
                                  name="email"
                                  value={formState.email}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <button type="submit" className="btn btn-primary">
                                  Send OTP
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="form-group">
                                <i className="fa fa-check" />
                                <input
                                  className="form-control"
                                  placeholder="Enter OTP*"
                                  type="text"
                                  name="otp"
                                  value={formState.otp}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                              <div className="form-group">
                                <i className="fas fa-lock" />
                                <input
                                  className="form-control"
                                  placeholder="New Password*"
                                  type="password"
                                  name="newPassword"
                                  value={formState.newPassword}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <button type="submit" className="btn btn-primary">
                                  Submit
                                </button>
                              </div>
                            </>
                          )}
                        </form>
                        <div className="sign-up">
                          <p>
                            {isOtpSent
                              ? "Didn't receive the OTP? "
                              : "Remember your password? "}
                            <Link to="/login">
                              {isOtpSent ? "Resend OTP" : "Login"}
                            </Link>
                          </p>
                        </div>
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

export default ForgotPassword;
