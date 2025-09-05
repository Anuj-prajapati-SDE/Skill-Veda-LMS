import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FaGraduationCap, FaLaptopCode, FaUserTie, FaChalkboardTeacher, FaCertificate, FaRegLightbulb } from "react-icons/fa";
import { BsCalendarCheck, BsClock, BsBuilding } from "react-icons/bs";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Navbar from "../../Components/Navbar/Navbar";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import Footer from "../../Components/Footer/Footer";
import bannerPic from '../../assets/img/bg-page.jpg';
import "./CollegeCampusTraining.css";

const CollegeCampusTraining = () => {
  // State for active tab in training modules section
  const [activeModule, setActiveModule] = useState("technical");
  
  // State for contact form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    message: ""
  });
  
  // Refs for scroll animations
  const headerRef = useRef(null);
  const statisticsRef = useRef(null);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  // Training modules data
  const trainingModules = {
    technical: [
      { 
        title: "Web Development Bootcamp", 
        duration: "4 weeks",
        description: "Comprehensive training in HTML, CSS, JavaScript, React, and Node.js",
        skills: ["Front-end Development", "Back-end Development", "Database Design", "API Integration"]
      },
      { 
        title: "Data Science & Machine Learning", 
        duration: "3 weeks",
        description: "From statistical analysis to building predictive models with Python",
        skills: ["Data Analysis", "Statistical Modeling", "Machine Learning Algorithms", "Python Programming"]
      },
      { 
        title: "Cloud Computing & DevOps", 
        duration: "2 weeks",
        description: "Master AWS, Azure, Docker, and CI/CD pipelines",
        skills: ["Cloud Infrastructure", "Containerization", "Continuous Integration", "Deployment Automation"]
      }
    ],
    industry: [
      { 
        title: "Professional Communication Skills", 
        duration: "1 week",
        description: "Develop effective communication for the corporate environment",
        skills: ["Business Writing", "Presentation Skills", "Email Etiquette", "Meeting Facilitation"]
      },
      { 
        title: "Project Management Essentials", 
        duration: "2 weeks",
        description: "Learn methodologies like Agile, Scrum, and project planning",
        skills: ["Agile & Scrum", "Project Planning", "Risk Management", "Resource Allocation"]
      },
      { 
        title: "Interview Preparation & Resume Building", 
        duration: "1 week",
        description: "Comprehensive training to excel in technical interviews",
        skills: ["Resume Crafting", "Interview Techniques", "Technical Assessment Prep", "Mock Interviews"]
      }
    ]
  };
  
  // Statistics data
  const statistics = [
    { value: "50+", label: "Partner Colleges" },
    { value: "10K+", label: "Students Trained" },
    { value: "92%", label: "Placement Rate" },
    { value: "100+", label: "Industry Partners" }
  ];
  
  // Testimonials data
  const testimonials = [
    {
      quote: "The training program transformed our students' technical capabilities and significantly improved campus placements.",
      author: "Dr. Priya Sharma",
      position: "HOD, Computer Science, Delhi Technical University"
    },
    {
      quote: "SkillVedaa's campus training provided our students with industry-relevant skills that gave them a competitive edge.",
      author: "Prof. Rahul Mehta",
      position: "Training & Placement Officer, VIT Vellore"
    }
  ];
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your interest! Our team will contact you shortly.");
    setFormData({ name: "", email: "", college: "", message: "" });
  };

  return (
    <>
   
      <Navbar />
    <div className="campus-training-page">
      
      {/* Hero Section with Enhanced Animation */}
      <div className="hero-section">
         <Breadcrumb courseImage={bannerPic} />
        
        <motion.div 
          className="hero-content container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          ref={headerRef}
        >
          <div className="row align-items-center">
            <div className="col-lg-7">
              <motion.h1 
                className="hero-title"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                College <span className="gradient-text">Campus</span> Training
              </motion.h1>
              
              <motion.p 
                className="hero-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                Bridging the gap between academia and industry
              </motion.p>
              
              <motion.div 
                className="hero-description"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.9 }}
              >
                <p>At <strong>SkillVedaa</strong>, we transform students into industry-ready professionals through comprehensive on-campus training programs designed to complement academic learning with practical skills.</p>
              </motion.div>
              
              <motion.div 
                className="hero-cta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <a href="#contact-section" className="btn-primary">
                  Get Started <HiOutlineArrowNarrowRight className="btn-icon" />
                </a>
                <a href="#programs-section" className="btn-secondary">
                  Explore Programs
                </a>
              </motion.div>
            </div>
            
            <motion.div 
              className="col-lg-5 d-none d-lg-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="hero-image-container">
                <div className="hero-backdrop"></div>
                <div className="hero-image"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2>Why Choose <span className="gradient-text">SkillVedaa</span></h2>
            <p className="section-subtitle">Our campus training programs deliver exceptional value to students and institutions</p>
          </motion.div>
          
          <motion.div 
            className="benefits-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div className="benefit-card" variants={fadeInUp}>
              <div className="benefit-icon"><FaLaptopCode /></div>
              <h3>Industry-Relevant Curriculum</h3>
              <p>Courses designed to align with the latest industry trends and technologies in demand</p>
            </motion.div>
            
            <motion.div className="benefit-card" variants={fadeInUp}>
              <div className="benefit-icon"><FaChalkboardTeacher /></div>
              <h3>Expert Trainers</h3>
              <p>Learn from industry professionals with extensive real-world experience</p>
            </motion.div>
            
            <motion.div className="benefit-card" variants={fadeInUp}>
              <div className="benefit-icon"><FaRegLightbulb /></div>
              <h3>Hands-on Learning</h3>
              <p>Practical applications and project work balanced with theoretical knowledge</p>
            </motion.div>
            
            <motion.div className="benefit-card" variants={fadeInUp}>
              <div className="benefit-icon"><FaCertificate /></div>
              <h3>Certification</h3>
              <p>Industry-recognized certification to enhance your resume and credibility</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Statistics Section */}
      <section className="statistics-section" ref={statisticsRef}>
        <div className="container">
          <div className="statistics-wrapper">
            <motion.div 
              className="statistics-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {statistics.map((stat, index) => (
                <motion.div 
                  className="statistic-item"
                  key={index}
                  variants={fadeInUp}
                >
                  <div className="statistic-value">{stat.value}</div>
                  <div className="statistic-label">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Program Structure Section */}
      <section className="program-section" id="programs-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2>Training <span className="gradient-text">Modules</span></h2>
            <p className="section-subtitle">Comprehensive training programs designed for today's competitive job market</p>
          </motion.div>
          
          <div className="program-tabs">
            <button 
              className={`tab-button ${activeModule === "technical" ? "active" : ""}`}
              onClick={() => setActiveModule("technical")}
            >
              <FaLaptopCode className="tab-icon" />
              <span>Technical Skills</span>
            </button>
            <button 
              className={`tab-button ${activeModule === "industry" ? "active" : ""}`}
              onClick={() => setActiveModule("industry")}
            >
              <FaUserTie className="tab-icon" />
              <span>Industry Skills</span>
            </button>
          </div>
          
          <AnimatePresence mode="wait">
            {activeModule === "technical" && (
              <motion.div 
                key="technical"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="program-content"
              >
                <div className="modules-grid">
                  {trainingModules.technical.map((module, index) => (
                    <motion.div 
                      className="module-card"
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="module-header">
                        <h3>{module.title}</h3>
                        <div className="module-duration">
                          <BsClock className="module-icon" />
                          <span>{module.duration}</span>
                        </div>
                      </div>
                      <p className="module-description">{module.description}</p>
                      <div className="module-skills">
                        {module.skills.map((skill, idx) => (
                          <div className="skill-tag" key={idx}>{skill}</div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {activeModule === "industry" && (
              <motion.div 
                key="industry"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="program-content"
              >
                <div className="modules-grid">
                  {trainingModules.industry.map((module, index) => (
                    <motion.div 
                      className="module-card"
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="module-header">
                        <h3>{module.title}</h3>
                        <div className="module-duration">
                          <BsClock className="module-icon" />
                          <span>{module.duration}</span>
                        </div>
                      </div>
                      <p className="module-description">{module.description}</p>
                      <div className="module-skills">
                        {module.skills.map((skill, idx) => (
                          <div className="skill-tag" key={idx}>{skill}</div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      
      {/* Program Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="row align-items-center">
            <motion.div 
              className="col-lg-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="features-content">
                <h2>Program <span className="gradient-text">Structure</span></h2>
                <p>
                  Our campus training programs are strategically designed to provide maximum value in a condensed timeframe, allowing students to gain practical skills without disrupting their academic schedule.
                </p>
                
                <div className="features-list">
                  <div className="feature-item">
                    <div className="feature-icon">
                      <BsCalendarCheck />
                    </div>
                    <div>
                      <h4>Flexible Duration</h4>
                      <p>Programs ranging from 1-4 weeks based on complexity and depth</p>
                    </div>
                  </div>
                  
                  <div className="feature-item">
                    <div className="feature-icon">
                      <BsBuilding />
                    </div>
                    <div>
                      <h4>On-Campus Convenience</h4>
                      <p>Training conducted within your college premises with all necessary resources</p>
                    </div>
                  </div>
                  
                  <div className="feature-item">
                    <div className="feature-icon">
                      <FaGraduationCap />
                    </div>
                    <div>
                      <h4>Comprehensive Resources</h4>
                      <p>Study materials, practical guides, and digital resources included</p>
                    </div>
                  </div>
                  
                  <div className="feature-item">
                    <div className="feature-icon">
                      <FaUserTie />
                    </div>
                    <div>
                      <h4>Placement Support</h4>
                      <p>Resume building, interview preparation, and placement assistance</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="col-lg-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="features-image-container">
                <div className="features-image"></div>
                <div className="features-card">
                  <h4>Daily Schedule</h4>
                  <div className="schedule-item">
                    <span className="time">10:00 - 12:00</span>
                    <span className="activity">Theory & Concepts</span>
                  </div>
                  <div className="schedule-item">
                    <span className="time">12:00 - 13:00</span>
                    <span className="activity">Lunch Break</span>
                  </div>
                  <div className="schedule-item">
                    <span className="time">13:00 - 16:00</span>
                    <span className="activity">Hands-on Practice</span>
                  </div>
                  <div className="schedule-item">
                    <span className="time">16:00 - 17:00</span>
                    <span className="activity">Q&A and Review</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2>What <span className="gradient-text">Institutions Say</span></h2>
            <p className="section-subtitle">Feedback from our partner educational institutions</p>
          </motion.div>
          
          <motion.div 
            className="testimonials-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div 
                className="testimonial-card"
                key={index}
                variants={fadeInUp}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 }
                }}
              >
                <div className="quote-mark">"</div>
                <p className="testimonial-text">{testimonial.quote}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {testimonial.author.split(' ')[0][0]}{testimonial.author.split(' ')[1][0]}
                  </div>
                  <div className="author-info">
                    <h4>{testimonial.author}</h4>
                    <p>{testimonial.position}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="contact-section" id="contact-section">
        <div className="container">
          <div className="contact-container">
            <div className="row">
              <motion.div 
                className="col-lg-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="contact-content">
                  <h2>Bring <span className="gradient-text">SkillVedaa</span> to Your Campus</h2>
                  <p>Contact us today to discuss how our campus training programs can benefit your students and institution.</p>
                  
                  <div className="contact-info">
                    <div className="contact-item">
                      <div className="contact-icon">📱</div>
                      <div>
                        <h4>Call Us</h4>
                        <p>+91 98765 43210</p>
                      </div>
                    </div>
                    
                    <div className="contact-item">
                      <div className="contact-icon">📧</div>
                      <div>
                        <h4>Email Us</h4>
                        <p>campus@skillvedaa.com</p>
                      </div>
                    </div>
                    
                    <div className="contact-item">
                      <div className="contact-icon">🏢</div>
                      <div>
                        <h4>Visit Us</h4>
                        <p>Noida, Uttar Pradesh, India</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="col-lg-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="contact-form-container">
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-header">
                      <h3>Get in Touch</h3>
                      <p>Fill out the form below and we'll get back to you within 24 hours</p>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="name">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="college">College/Institution</label>
                      <input
                        type="text"
                        id="college"
                        name="college"
                        value={formData.college}
                        onChange={handleInputChange}
                        placeholder="Enter your college name"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="message">Your Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="4"
                        placeholder="Tell us about your training requirements"
                        required
                      ></textarea>
                    </div>
                    
                    <button type="submit" className="submit-button">
                      Submit Request <HiOutlineArrowNarrowRight className="btn-icon" />
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
     </>
  );
};

export default CollegeCampusTraining;