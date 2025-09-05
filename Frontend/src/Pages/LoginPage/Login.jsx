import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from '../../Components/Loader/Loader';
import logoTransparent from '../../assets/img/logo-transparent.jpg'
import './Login.css';

const LoginPage = () => {
  const apiUrl = import.meta.env.VITE_Backend_URL;
  const notifyA = (e) => toast.success(e);
  const notifyB = (e) => toast.error(e);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Important: Send cookies
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        notifyA("Login successful");

        const userRes = await fetch(`${apiUrl}/api/auth/user`, {
          method: "GET",
          credentials: "include",
        });

        const userData = await userRes.json();
        localStorage.setItem("userId", userData.userId);
        if (userRes.ok) {
          navigate(`/${userData.role}dashboard/Home`);
        } else {
          notifyB("Failed to retrieve user data");
        }
      } else {
        const errorData = await response.json();
        notifyB(errorData.message || "Invalid credentials");
      }
    } catch (err) {
      notifyB("Something went wrong. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-area mb-5 mt-4">
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
                        <form onSubmit={handleLogin}>
                          <div className="row">
                            <div className="col-lg-12 col-md-12">
                              <div className="form-group">
                                <i className="fas fa-envelope-open" />
                                <input
                                  className="form-control"
                                  placeholder="Email*"
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-12 col-md-12">
                              <div className="form-group">
                                <i className="fas fa-lock" />
                                <input
                                  className="form-control"
                                  placeholder="Password*"
                                  type="password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          {error && (
                            <div className="row">
                              <div className="col-lg-12">
                                <p className="text-danger">{error}</p>
                              </div>
                            </div>
                          )}
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="link align-right">
                                <Link to="/forgotpassword">Forgot Password?</Link>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12">
                            <div className="row">
                              <button type="submit">Login</button>
                            </div>
                          </div>
                        </form>
                        <div className="sign-up">
                          <p>
                            Don't have an account? <Link to="/signup">Sign up now</Link>
                          </p>
                        </div>
                        <div className="social-login">
                          <h5>Or Login With</h5>
                          <ul>
                            <li className="facebook">
                              <a href="#">
                                <i className="fab fa-facebook-f" />
                              </a>
                            </li>
                            <li className="twitter">
                              <a href="#">
                                <i className="fab fa-twitter" />
                              </a>
                            </li>
                            <li className="g-plus">
                              <a href="#">
                                <i className="fab fa-google-plus-g" />
                              </a>
                            </li>
                          </ul>
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

export default LoginPage;
