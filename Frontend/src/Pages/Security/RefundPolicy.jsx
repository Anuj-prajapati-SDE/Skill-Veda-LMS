import React from "react";
import { motion } from "framer-motion";
import { FaFileInvoiceDollar, FaLock, FaExclamationCircle, FaHistory, FaPhoneAlt, FaInfoCircle, FaClock } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";
import "./RefundPolicy.css";
import bannerPic from '../../assets/img/refundreturn.jpg';

const RefundPolicy = () => {
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
    <div className="refund-page">
      <Navbar />
      <Breadcrumb courseImage={bannerPic} />
      
      <div className="refund-container">
        <div className="container">
          <motion.div 
            className="refund-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="refund-icon">
              <FaFileInvoiceDollar />
            </div>
            <h1>Refund and Return Policy</h1>
            <p className="effective-date">
              <span>Effective Date:</span> 18/02/2025
            </p>
          </motion.div>
          
          <motion.div 
            className="refund-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p>
              At <span className="highlight">SkillVedaa</span>, we strive to provide high-quality
              educational services. Please read our refund policy carefully before
              making any purchases.
            </p>
          </motion.div>
          
          <motion.div 
            className="refund-sections"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Section 1 */}
            <motion.div className="refund-section" variants={itemVariants}>
              <div className="section-header">
                <div className="section-icon">
                  <FaInfoCircle />
                </div>
                <h2>1. No Refund Policy</h2>
              </div>
              <div className="section-content">
                <ol className="refund-list numbered">
                  <li>All payments are non-refundable.</li>
                  <li>No cancellations or chargebacks will be issued.</li>
                </ol>
              </div>
            </motion.div>
            
            {/* Section 2 */}
            <motion.div className="refund-section" variants={itemVariants}>
              <div className="section-header">
                <div className="section-icon">
                  <FaLock />
                </div>
                <h2>2. Course Access and Validity</h2>
              </div>
              <div className="section-content">
                <ol className="refund-list numbered">
                  <li>Access is granted upon successful payment.</li>
                  <li>Technical issues should be reported to support.</li>
                </ol>
              </div>
            </motion.div>
            
            {/* Section 3 */}
            <motion.div className="refund-section" variants={itemVariants}>
              <div className="section-header">
                <div className="section-icon">
                  <FaExclamationCircle />
                </div>
                <h2>3. Exceptional Cases</h2>
              </div>
              <div className="section-content">
                <ol className="refund-list numbered">
                  <li>
                    Refunds will only be considered in cases where payment was deducted
                    due to a technical error, but the service was not provided.
                  </li>
                  <li>
                    Requests for such exceptions must be made in writing to
                    <span className="highlight-email"> info@skillvedaa.in</span> within 7 days of the transaction, along with
                    relevant proof of the issue.
                  </li>
                </ol>
              </div>
            </motion.div>
            
            {/* Section 4 */}
            <motion.div className="refund-section" variants={itemVariants}>
              <div className="section-header">
                <div className="section-icon">
                  <FaHistory />
                </div>
                <h2>4. Changes to This Policy</h2>
              </div>
              <div className="section-content">
                <p>
                  We reserve the right to modify this policy at any time. Any changes
                  will be updated on this page with an effective date.
                </p>
              </div>
            </motion.div>
            
            {/* Important Note */}
            <motion.div className="important-note" variants={itemVariants}>
              <div className="note-icon">
                <FaClock />
              </div>
              <div className="note-content">
                <h3>Important Timeline</h3>
                <p>
                  Any exceptions to our no-refund policy must be reported within <strong>7 days</strong> of purchase with appropriate documentation.
                </p>
              </div>
            </motion.div>
            
            {/* Section 5 */}
            <motion.div className="refund-section contact-section" variants={itemVariants}>
              <div className="section-header">
                <div className="section-icon">
                  <FaPhoneAlt />
                </div>
                <h2>5. Contact Information</h2>
              </div>
              <div className="section-content">
                <p className="company-name">
                  Morling Global Pvt Ltd <span className="highlight">SkillVedaa</span>
                </p>
                <p>
                  If you have any questions regarding this Refund Policy, please
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
                  Refund Policy.
                </p>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="refund-footer"
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

export default RefundPolicy;