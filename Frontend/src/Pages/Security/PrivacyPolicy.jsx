import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaDatabase, FaClipboardList, FaShareAlt, FaLock, FaUserShield, FaLink, FaHistory, FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import { Link } from "react-router-dom";
import bannerPic from '../../assets/img/privacypolicy.jpg';
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="privacy-page">
      <Navbar />
      <Breadcrumb courseImage={bannerPic} />
      
      <div className="privacy-container">
        <div className="container">
          <motion.div 
            className="privacy-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="privacy-icon">
              <FaShieldAlt />
            </div>
            <h1>Privacy Policy</h1>
            <p className="effective-date">
              <span>Effective Date:</span> 18/02/2025
            </p>
          </motion.div>
          
          <motion.div 
            className="privacy-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p>
              Welcome to <span className="highlight">SkillVedaa</span>, operated by <span className="highlight">Morling Global Pvt Ltd</span>. 
              This Privacy Policy explains how we collect, use, and safeguard your information when you visit{" "}
              <Link to="/" className="text-link">www.skillvedaa.in</Link>.
            </p>
          </motion.div>
          
          <motion.div 
            className="privacy-sections"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Section 1 */}
            <motion.div className="privacy-section" variants={itemVariants}>
              <div className="section-header">
                <div className="section-icon">
                  <FaDatabase />
                </div>
                <h2>1. Information We Collect</h2>
              </div>
              <div className="section-content">
                <ol className="privacy-list numbered">
                  <li>
                    <strong>Personal Information:</strong> Name, email address, phone
                    number, billing details, and any other information you provide when
                    registering or purchasing services.
                  </li>
                  <li>
                    <strong>Non-Personal Information:</strong> Browser type, IP address,
                    device information, and other technical data collected
                    automatically.
                  </li>
                  <li>
                    <strong>Cookies:</strong> We use cookies to enhance your experience and
                    analyze website traffic.
                  </li>
                </ol>
              </div>
            </motion.div>
            
            {/* Section 2 */}
            <motion.div className="privacy-section" variants={itemVariants}>
              <div className="section-header">
                <div className="section-icon">
                  <FaClipboardList />
                </div>
                <h2>2. How We Use Your Information</h2>
              </div>
              <div className="section-content">
                <ol className="privacy-list numbered">
                  <li>To provide and manage services.</li>
                  <li>To process payments.</li>
                  <li>
                    To communicate with you, including sending newsletters, promotional
                    offers, and service-related updates.
                  </li>
                  <li>To enhance security and prevent fraud.</li>
                  <li>To analyze user behavior and improve our Website.</li>
                </ol>
              </div>
            </motion.div>
            
            {/* Section 3 */}
            <motion.div className="privacy-section" variants={itemVariants}>
              <div className="section-header">
                <div className="section-icon">
                  <FaShareAlt />
                </div>
                <h2>3. Sharing of Information</h2>
              </div>
              <div className="section-content">
                <p className="section-intro">
                  We do not sell or rent your personal information. However, we may
                  share your data in the following cases:
                </p>
                <ol className="privacy-list numbered">
                  <li>
                    With service providers assisting in website operation, payment
                    processing, and marketing.
                  </li>
                  <li>
                    With legal authorities if required by law or to protect our rights.
                  </li>
                  <li>With affiliates and partners for service improvement.</li>
                </ol>
              </div>
            </motion.div>
            
            {/* Section 4 */}
            <motion.div className="privacy-section" variants={itemVariants}>
              <div className="section-header">
                <div className="section-icon">
                  <FaLock />
                </div>
                <h2>4. Data Security</h2>
              </div>
              <div className="section-content">
                <p>
                  We take appropriate security measures to protect your personal
                  information from unauthorized access, alteration, disclosure, or
                  destruction. However, no online platform is 100% secure, and we cannot
                  guarantee absolute security.
                </p>
              </div>
            </motion.div>
            
            {/* Section 5 */}
            <motion.div className="privacy-section" variants={itemVariants}>
              <div className="section-header">
                <div className="section-icon">
                  <FaUserShield />
                </div>
                <h2>5. Your Rights and Choices</h2>
              </div>
              <div className="section-content">
                <ol className="privacy-list numbered">
                  <li>
                    You may request access to, correction, or deletion of your personal
                    data by contacting us.
                  </li>
                  <li>
                    You can opt out of promotional emails by using the unsubscribe link
                    provided.
                  </li>
                  <li>
                    You may disable cookies through your browser settings, though some
                    website features may not function properly.
                  </li>
                </ol>
              </div>
            </motion.div>
            
            {/* Section 6 */}
            <motion.div className="privacy-section" variants={itemVariants}>
              <div className="section-header">
                <div className="section-icon">
                  <FaLink />
                </div>
                <h2>6. Third-Party Links</h2>
              </div>
              <div className="section-content">
                <p>
                  Our Website may contain links to third-party sites. We are not
                  responsible for their privacy practices and encourage you to read
                  their policies before providing any information.
                </p>
              </div>
            </motion.div>
            
            {/* Section 7 */}
            <motion.div className="privacy-section" variants={itemVariants}>
              <div className="section-header">
                <div className="section-icon">
                  <FaHistory />
                </div>
                <h2>7. Changes to this Privacy Policy</h2>
              </div>
              <div className="section-content">
                <p>
                  We reserve the right to update or modify this Privacy Policy at any
                  time. Any changes will be posted on this page with an updated
                  effective date.
                </p>
              </div>
            </motion.div>
            
            {/* Section 8 */}
            <motion.div className="privacy-section contact-section" variants={itemVariants}>
              <div className="section-header">
                <div className="section-icon">
                  <FaPhoneAlt />
                </div>
                <h2>8. Contact Information</h2>
              </div>
              <div className="section-content">
                <p className="company-name">
                  Morling Global Pvt Ltd <span className="highlight">SkillVedaa</span>
                </p>
                <p>
                  If you have any questions regarding this Privacy Policy, please
                  contact us at:
                </p>
                <div className="contact-details">
                  <div className="contact-item">
                    <MdLocationOn className="contact-icon" />
                    <span>A25, Sector 59, Noida</span>
                  </div>
                  <div className="contact-item">
                    <MdEmail className="contact-icon" />
                    <span>info@skillvedaa.in</span>
                  </div>
                  <div className="contact-item">
                    <FaPhoneAlt className="contact-icon" />
                    <span>+91-7004679646</span>
                  </div>
                </div>
                <p className="consent-note">
                  By using <Link to="/" className="text-link">www.skillvedaa.in</Link>, you consent to the terms outlined in this
                  Privacy Policy.
                </p>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="privacy-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <p>Last Updated: 18/02/2025</p>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;