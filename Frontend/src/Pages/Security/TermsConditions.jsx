import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaUserLock, FaCopyright, FaCreditCard, FaExclamationTriangle, FaLink, FaLock, FaFileContract, FaBalanceScale, FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";
import bannerPic from '../../assets/img/termsconditions.jpg';
import "./TermsConditions.css";

const TermsConditions = () => {
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
    <div className="terms-page">
      <Navbar />
      <Breadcrumb courseImage={bannerPic} />
      
      <div className="terms-container">
        <div className="container">
          <motion.div 
            className="terms-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="terms-icon">
              <FaFileContract />
            </div>
            <h1>Terms and Conditions</h1>
            <p className="effective-date">
              <span>Effective Date:</span> 18/02/2025
            </p>
          </motion.div>
          
          <motion.div 
            className="terms-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p>
              Welcome to <span className="highlight">SkillVedaa</span>, operated by{" "}
              <span className="highlight">Morling Global Pvt Ltd</span> ("Company," "we," "us," or "our").
              By accessing or using{" "}
              <Link to="/" className="text-link">www.skillvedaa.in</Link>, you agree to be
              bound by these Terms and Conditions. If you do not agree with any part
              of these Terms, please do not use our Website.
            </p>
          </motion.div>
          
          <motion.div 
            className="terms-sections"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Section 1 */}
            <motion.div className="terms-section" variants={itemVariants}>
              <div className="section-header">
                <div className="section-icon">
                  <FaShieldAlt />
                </div>
                <h2>1. Use of the Website</h2>
              </div>
              <div className="section-content">
                <ul className="terms-list">
                  <li>
                    You must be at least 18 years old to use our services. If you are
                    under 18, you must have permission from a parent or guardian.
                  </li>
                  <li>
                    You agree to use the Website only for lawful purposes and in a
                    manner that does not infringe the rights of others.
                  </li>
                  <li>
                    We reserve the right to suspend or terminate your access to the
                    Website at our discretion, without prior notice, if you violate
                    these Terms.
                  </li>
                </ul>
              </div>
            </motion.div>
            
            {/* Section 2 */}
            <motion.div className="terms-section" variants={itemVariants}>
              <div className="section-header">
                <div className="section-icon">
                  <FaUserLock />
                </div>
                <h2>2. Account Registration</h2>
              </div>
              <div className="section-content">
                <ul className="terms-list">
                  <li>
                    To access certain features, you may be required to register an
                    account. You agree to provide accurate and complete information
                    during the registration process.
                  </li>
                  <li>
                    You are responsible for maintaining the confidentiality of your
                    account credentials and for all activities conducted through your
                    account.
                  </li>
                  <li>
                    We are not responsible for any unauthorized access to your account.
                    You must notify us immediately of any suspected security breach.
                  </li>
                </ul>
              </div>
            </motion.div>
            
            {/* Section 3 */}
            <motion.div className="terms-section" variants={itemVariants}>
              <div className="section-header">
                <div className="section-icon">
                  <FaCopyright />
                </div>
                <h2>3. Intellectual Property Rights</h2>
              </div>
              <div className="section-content">
                <ul className="terms-list numbered">
                  <li>
                    All content, including but not limited to text, graphics, logos, images, and software, is the property of SkillVedaa or its licensors and is protected by copyright, trademark, and other intellectual property laws.
                  </li>
                  <li>
                    You may not reproduce, distribute, modify, or create derivative works of any content on our Website without our prior written consent.
                  </li>
                </ul>
              </div>
            </motion.div>
            
            {/* Section 4 */}
            <motion.div className="terms-section" variants={itemVariants}>
              <div className="section-header">
                <div className="section-icon">
                  <FaCreditCard />
                </div>
                <h2>4. Payments and Refunds</h2>
              </div>
              <div className="section-content">
                <ul className="terms-list numbered">
                  <li>
                    Some services or courses on our Website may require payment. You agree to provide accurate payment information and authorize us to charge the applicable fees.
                  </li>
                  <li>
                    All payments are non-refundable unless otherwise stated in a specific refund policy for a course or service.
                  </li>
                </ul>
              </div>
            </motion.div>
            
            {/* Section 5 */}
            <motion.div className="terms-section" variants={itemVariants}>
              <div className="section-header">
                <div className="section-icon">
                  <FaExclamationTriangle />
                </div>
                <h2>5. Limitation of Liability</h2>
              </div>
              <div className="section-content">
                <ul className="terms-list numbered">
                  <li>
                    We do not guarantee that the Website will be error-free, uninterrupted, or free of viruses.
                  </li>
                  <li>
                    We shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use or inability to use the Website or its content.
                  </li>
                </ul>
              </div>
            </motion.div>
            
            {/* Section 6 */}
            <motion.div className="terms-section" variants={itemVariants}>
              <div className="section-header">
                <div className="section-icon">
                  <FaLink />
                </div>
                <h2>6. Third-Party Links</h2>
              </div>
              <div className="section-content">
                <p>
                  Our Website may contain links to third-party websites. We do not endorse or take responsibility for the content, privacy policies, or practices of such websites.
                </p>
              </div>
            </motion.div>
            
            {/* Section 7 */}
            <motion.div className="terms-section" variants={itemVariants}>
              <div className="section-header">
                <div className="section-icon">
                  <FaLock />
                </div>
                <h2>7. Privacy Policy</h2>
              </div>
              <div className="section-content">
                <p>
                  Your use of the Website is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal data.
                </p>
              </div>
            </motion.div>
            
            {/* Section 8 */}
            <motion.div className="terms-section" variants={itemVariants}>
              <div className="section-header">
                <div className="section-icon">
                  <FaFileContract />
                </div>
                <h2>8. Changes to Terms and Conditions</h2>
              </div>
              <div className="section-content">
                <p>
                  We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the Website after any changes constitute your acceptance of the new Terms.
                </p>
              </div>
            </motion.div>
            
            {/* Section 9 */}
            <motion.div className="terms-section" variants={itemVariants}>
              <div className="section-header">
                <div className="section-icon">
                  <FaBalanceScale />
                </div>
                <h2>9. Governing Law</h2>
              </div>
              <div className="section-content">
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of <span className="highlight">India</span>. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in <span className="highlight">New Delhi, India</span>.
                </p>
              </div>
            </motion.div>
            
            {/* Section 10 */}
            <motion.div className="terms-section contact-section" variants={itemVariants}>
              <div className="section-header">
                <div className="section-icon">
                  <FaPhoneAlt />
                </div>
                <h2>10. Contact Information</h2>
              </div>
              <div className="section-content">
                <p className="company-name">
                  Morling Global Pvt Ltd <span className="highlight">SkillVedaa</span>
                </p>
                <p>
                  If you have any questions regarding these Terms and Conditions, please
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
                  By using <Link to="/" className="text-link">www.skillvedaa.in</Link>, you consent to the terms outlined in these
                  Terms and Conditions.
                </p>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="terms-footer"
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

export default TermsConditions;