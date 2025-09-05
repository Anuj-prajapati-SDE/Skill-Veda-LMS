import React, { useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';
import toast from "react-hot-toast";
import axios from 'axios';
import Loader from '../../Components/Loader/Loader';
import ContactImage from '../../assets/img/Contact.webp'
import "./Contact.css";

const ContactPage = () => {
  const apiUrl = import.meta.env.VITE_Backend_URL;
  const notifyA = (e) => toast.success(e);
  const notifyB = (e) => toast.error(e);
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    problem: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/admin/contact`, formData);
      if (response.status === 201) {
        setLoader(false);
        notifyA('Message sent successfully!');
        setFormData({ name: '', email: '', phoneNumber: '', problem: '' });
      } else {
        setLoader(false);
        notifyB('Something went wrong. Please try again later.');
      }
    } catch (error) {
      setLoader(false);
      notifyB('Error sending message. Please try again later.');
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <Breadcrumb courseImage={ContactImage}></Breadcrumb>
      <div className="contact-area default-padding-top">
        <div className="container">
          <div className="contact-items">
            <div className="row align-center">
              <div className="col-lg-4 left-item">
                <div className="info-items">
                  {/* Single Item */}
                  <div className="item">
                    <div className="icon">
                      <i className="fas fa-map-marked-alt" />
                    </div>
                    <div className="info">
                      <h5>Location</h5>
                      <p>A25, Sector 59, Noida, Uttar Pradesh</p>
                    </div>
                  </div>
                  {/* End Single Item */}
                  {/* Single Item */}
                  <div className="item">
                    <div className="icon">
                      <i className="fas fa-phone" />
                    </div>
                    <div className="info">
                      <h5>Make a Call</h5>
                      <p>+91-7004379646</p>
                    </div>
                  </div>
                  {/* End Single Item */}
                  {/* Single Item */}
                  <div className="item">
                    <div className="icon">
                      <i className="fas fa-envelope-open" />
                    </div>
                    <div className="info">
                      <h5>Send a Mail</h5>
                      <p>info@skillvedaa.in</p>
                    </div>
                  </div>
                  {/* End Single Item */}
                </div>
              </div>

              <div className="col-lg-8 right-item">
                <h5>Need Help?</h5>
                <h2>Keep in Touch</h2>
                {loader ? <Loader /> : (
                  <form onSubmit={handleSubmit} className="contact-form">
                    {/* Name */}
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required // Added required attribute
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email and Phone */}
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Email*"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            className="form-control"
                            id="phone"
                            name="phoneNumber"
                            maxLength="10"
                            placeholder="Phone"
                            type="number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Problem/Message */}
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group comments">
                          <textarea
                            className="form-control"
                            id="problem" // Changed id to 'problem'
                            name="problem" // Changed name to 'problem'
                            placeholder="Tell Us About Problem *"
                            value={formData.problem}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="row">
                      <div className="col-lg-12">
                        <button type="submit" className="theme-btn">
                          Send Message <i className="fa fa-paper-plane" />
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="maps-area">
        <div className="google-maps">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d910.069346447922!2d77.3673058028695!3d28.606934151787538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce557e6cc86cb%3A0x508ab9aee5024096!2sSmartBrains%20Engineers%20and%20Technologist%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1739877203189!5m2!1sen!2sin" />
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default ContactPage;
