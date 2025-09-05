import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      const response = await fetch(`http://localhost:5000/api/auth/loginAdmin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Important: Send cookies
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const loginData = await response.json();
        notifyA("Login successful");

        // Store token as fallback
        if (loginData.token) {
          localStorage.setItem("authToken", loginData.token);
        }

        // Use the same base URL for consistency
        const userRes = await fetch(`http://localhost:5000/api/auth/admin`, {
          method: "GET",
          credentials: "include",
          headers: {
            'Authorization': `Bearer ${loginData.token || ''}`, // Add Authorization header as fallback
            'Content-Type': 'application/json'
          },
        });

        if (userRes.ok) {
          const userData = await userRes.json();
          localStorage.setItem("userId", userData.userId);
          navigate(`/${userData.role}dashboard/Home`);
        } else {
          const errorData = await userRes.json();
          console.error("Failed to retrieve user data:", errorData);
          notifyB(`Failed to retrieve user data: ${errorData.message || 'Unknown error'}`);
        }
      } else {
        const errorData = await response.json();
        notifyB(errorData.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      notifyB("Something went wrong. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
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
                            {/* <div className="col-lg-12">
                              <div className="link align-right">
                                <Link to="/forgotpassword">Forgot Password?</Link>
                              </div>
                            </div> */}
                          </div>
                          <div className="col-lg-12 col-md-12">
                            <div className="row">
                              <button type="submit">Login</button>
                            </div>
                          </div>
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
    </>
  );
};

export default LoginPage;
