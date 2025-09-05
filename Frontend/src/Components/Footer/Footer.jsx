import React from "react";
import "./Footer.css";
import logoWhite from "../../assets/img/logo-white.png";
import { FOOTER_SECTION } from "../../Constants";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-dark text-light">
      <div className="container">
        <div className="f-items default-padding">
          <div className="row">
            <div className="col-lg-4 col-md-6 item">
              <div className="f-item about">
                <img
                  src={`${logoWhite}`}
                  style={{ borderRadius: "10px" }}
                  alt="Logo"
                />
                <p>{FOOTER_SECTION.ABOUT_TEXT}</p>
                <p className="text-italic">
                  Please write your email and get our amazing updates, news and
                  support*
                </p>
                <div className="subscribe">
                  <form action="#">
                    <input
                      type="email"
                      placeholder="Enter your e-mail here"
                      className="form-control"
                      name="email"
                    />
                    <button type="submit">
                      <i className="fa fa-paper-plane" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 item">
              <div className="f-item link">
                <h4 className="widget-title">Usefull Links</h4>
                <ul>
                  <li>
                    <Link to="/courses">Courses</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/faqs">Faqs</Link>
                  </li>
                  {/* <li>
                    <Link to="#">Teachers</Link>
                  </li> */}
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 item">
              <div className="f-item link">
                <h4 className="widget-title">Support</h4>
                <ul>
                  <li>
                    <Link to="/terms-and-condition">Terms and Conditions</Link>
                  </li>
                  <li>
                    <Link to="/refund-return-policy">Refund and Return Policy</Link>
                  </li>
                  {/* <li>
                    <Link to="#">Language Packs</Link>
                  </li>
                  <li>
                    <Link to="#">Release Status</Link>
                  </li> */}
                  <li>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </li>
                  {/* <li>
                    <Link to="/underdevelopment">Feedback</Link>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 item">
              <div className="f-item contact">
                <h4 className="widget-title">Contact Info</h4>
                <div className="address">
                  <ul>
                    <li>
                      <strong>Email:</strong> info@skillvedaa.in
                    </li>
                    <li>
                      <strong>Contact:</strong> +91-7004379646
                    </li>
                  </ul>
                </div>
                <div className="opening-info">
                  <h5>Opening Hours</h5>
                  <ul>
                    <li>
                      {" "}
                      <span> Mon - Fri :</span>
                      <div className="float-right"> 10.00 am - 6.00 pm </div>
                    </li>
                    <li>
                      {" "}
                      <span> Sat - Sun : </span>
                      <div className="float-right closed"> Closed </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <p>
                © Copyright 2025. All Rights Reserved by{" "}
                <Link to="#">SkillVeda</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
