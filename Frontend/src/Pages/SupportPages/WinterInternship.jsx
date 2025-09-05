import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FaSnowflake, FaLaptopCode, FaUserGraduate, FaCertificate, FaChartLine } from "react-icons/fa";
import { BsCodeSquare, BsGraphUp, BsShieldCheck, BsCalendarCheck, BsClock } from "react-icons/bs";
import { HiOutlineArrowNarrowRight, HiOutlineLightBulb, HiOutlineAcademicCap } from "react-icons/hi";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import bannerPic from "../../assets/img/bg-page.jpg";
import "./WinterTraining.css";

const WinterTraining = () => {
  // State for active program tab
  const [activeProgram, setActiveProgram] = useState("python");
  
  // State for countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 21,
    hours: 14,
    minutes: 36,
    seconds: 0
  });
  
  // State for registration form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "Python Programming",
    message: ""
  });
  
  // Refs for scroll animations
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
  const headerScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98]);
  
  // Training program data
  const programs = {
    python: {
      title: "Python Programming",
      duration: "4 Weeks",
      level: "Beginner to Intermediate",
      description: "Master Python programming from basics to advanced concepts. Learn data structures, algorithms, and practical applications in real-world scenarios.",
      curriculum: [
        "Python Fundamentals & Syntax",
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
        "Web Development with Django/Flask",
        "Data Analysis with Pandas & NumPy",
        "API Integration & Automation"
      ],
      projects: [
        "E-commerce Dashboard",
        "Data Analysis Application",
        "Automated Web Scraper"
      ],
      icon: <BsCodeSquare />
    },
    machinelearning: {
      title: "Machine Learning & AI",
      duration: "6 Weeks",
      level: "Intermediate",
      description: "Dive into the world of Machine Learning and Artificial Intelligence. Understand algorithms, model training, and implementing AI solutions.",
      curriculum: [
        "ML Fundamentals & Statistics",
        "Supervised & Unsupervised Learning",
        "Neural Networks & Deep Learning",
        "Natural Language Processing",
        "Computer Vision Applications",
        "Model Deployment & MLOps"
      ],
      projects: [
        "Predictive Analytics System",
        "Image Recognition Application",
        "NLP-based Recommendation Engine"
      ],
      icon: <BsGraphUp />
    },
    cybersecurity: {
      title: "Cybersecurity Essentials",
      duration: "5 Weeks",
      level: "All Levels",
      description: "Build a strong foundation in cybersecurity concepts, tools, and techniques to protect systems and networks from threats and vulnerabilities.",
      curriculum: [
        "Security Fundamentals & Principles",
        "Network Security & Protocols",
        "Vulnerability Assessment",
        "Ethical Hacking Techniques",
        "Security Tools & Practices",
        "Incident Response & Management"
      ],
      projects: [
        "Security Audit Implementation",
        "Penetration Testing Report",
        "Secure System Architecture"
      ],
      icon: <BsShieldCheck />
    }
  };
  
  // Stats data
  const stats = [
    { value: "4000+", label: "Students Trained", icon: <FaUserGraduate /> },
    { value: "95%", label: "Placement Rate", icon: <FaChartLine /> },
    { value: "40+", label: "Industry Partners", icon: <FaLaptopCode /> },
    { value: "12+", label: "Winter Programs", icon: <FaCertificate /> }
  ];
  
  // Testimonials data
  const testimonials = [
    {
      quote: "The winter training at SkillVedaa was a game-changer for my career. I learned Python and secured an internship right after the program!",
      name: "Aarav Singh",
      position: "Computer Science Student, IIT Bombay",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "The Machine Learning program was intense but extremely rewarding. The hands-on projects gave me practical experience that stands out on my resume.",
      name: "Priya Sharma",
      position: "Data Science Enthusiast, Delhi University",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  ];
  
  // Program benefits
  const benefits = [
    {
      icon: <HiOutlineLightBulb />,
      title: "Practical Learning",
      description: "Focus on hands-on experience with real-world projects and industry applications"
    },
    {
      icon: <FaUserGraduate />,
      title: "Expert Mentorship",
      description: "Learn directly from industry professionals with years of experience"
    },
    {
      icon: <HiOutlineAcademicCap />,
      title: "Certification",
      description: "Receive industry-recognized certificates to boost your resume"
    },
    {
      icon: <BsCalendarCheck />,
      title: "Flexible Schedule",
      description: "Choose between weekday and weekend batches to suit your availability"
    }
  ];
  
  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
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
    setFormData({
      name: "",
      email: "",
      phone: "",
      program: "Python Programming",
      message: ""
    });
  };
  
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

  return (
    <>
  
  <Navbar />
    <div className="winter-training-page">
      
      {/* Hero Section */}
      <div className="hero-section" ref={heroRef}>
        <div className="snowflakes" aria-hidden="true">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="snowflake">❅</div>
          ))}
        </div>
        
        <motion.div 
          style={{ opacity: headerOpacity, scale: headerScale }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Breadcrumb courseImage={bannerPic} />
        </motion.div>
        
        <motion.div 
          className="hero-content container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto text-center">
              <motion.div 
                className="badge-container"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <span className="hero-badge">
                  <FaSnowflake className="badge-icon" />
                  Winter 2025 Batch Enrolling Now
                </span>
              </motion.div>
              
              <motion.h1 
                className="hero-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                Master <span className="gradient-text">In-Demand Skills</span> This Winter
              </motion.h1>
              
              <motion.p 
                className="hero-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.9 }}
              >
                Transform your winter break into a career-boosting opportunity with our intensive training programs
              </motion.p>
              
              <motion.div 
                className="hero-cta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                <a href="#registration" className="btn-primary">
                  Enroll Now <HiOutlineArrowNarrowRight className="btn-icon" />
                </a>
                <a href="#programs" className="btn-secondary">
                  Explore Programs
                </a>
              </motion.div>
              
              <motion.div 
                className="countdown-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.3 }}
              >
                <div className="countdown-label">
                  <BsClock /> Early Bird Discount Ends In:
                </div>
                <div className="countdown-timer">
                  <div className="countdown-item">
                    <div className="countdown-value">{timeLeft.days}</div>
                    <div className="countdown-unit">Days</div>
                  </div>
                  <div className="countdown-divider">:</div>
                  <div className="countdown-item">
                    <div className="countdown-value">{timeLeft.hours}</div>
                    <div className="countdown-unit">Hours</div>
                  </div>
                  <div className="countdown-divider">:</div>
                  <div className="countdown-item">
                    <div className="countdown-value">{timeLeft.minutes}</div>
                    <div className="countdown-unit">Mins</div>
                  </div>
                  <div className="countdown-divider">:</div>
                  <div className="countdown-item">
                    <div className="countdown-value">{timeLeft.seconds}</div>
                    <div className="countdown-unit">Secs</div>
                  </div>
                </div>
              </motion.div>
            </div>
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
            <h2>Program <span className="gradient-text">Benefits</span></h2>
            <p className="section-subtitle">Why our winter training program stands out</p>
          </motion.div>
          
          <motion.div 
            className="benefits-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                className="benefit-card"
                key={index}
                variants={fadeInUp}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 }
                }}
              >
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="stats-section" ref={statsRef}>
        <div className="container">
          <div className="stats-wrapper">
            <motion.div 
              className="stats-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {stats.map((stat, index) => (
                <motion.div 
                  className="stat-item"
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Programs Section */}
      <section className="programs-section" id="programs">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2>Winter <span className="gradient-text">Programs</span></h2>
            <p className="section-subtitle">Explore our intensive training programs</p>
          </motion.div>
          
          <div className="programs-tabs">
            <button 
              className={`tab-button ${activeProgram === "python" ? "active" : ""}`}
              onClick={() => setActiveProgram("python")}
            >
              <BsCodeSquare className="tab-icon" />
              <span>Python</span>
            </button>
            <button 
              className={`tab-button ${activeProgram === "machinelearning" ? "active" : ""}`}
              onClick={() => setActiveProgram("machinelearning")}
            >
              <BsGraphUp className="tab-icon" />
              <span>Machine Learning</span>
            </button>
            <button 
              className={`tab-button ${activeProgram === "cybersecurity" ? "active" : ""}`}
              onClick={() => setActiveProgram("cybersecurity")}
            >
              <BsShieldCheck className="tab-icon" />
              <span>Cybersecurity</span>
            </button>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeProgram}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="program-details"
            >
              <div className="program-header">
                <div className="program-icon">
                  {programs[activeProgram].icon}
                </div>
                <div className="program-title">
                  <h3>{programs[activeProgram].title}</h3>
                  <div className="program-meta">
                    <span className="duration">
                      <BsClock /> {programs[activeProgram].duration}
                    </span>
                    <span className="level">{programs[activeProgram].level}</span>
                  </div>
                </div>
              </div>
              
              <p className="program-description">
                {programs[activeProgram].description}
              </p>
              
              <div className="program-content">
                <div className="curriculum">
                  <h4>Curriculum Highlights</h4>
                  <ul>
                    {programs[activeProgram].curriculum.map((item, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <div className="projects">
                  <h4>Projects You'll Build</h4>
                  <div className="project-cards">
                    {programs[activeProgram].projects.map((project, index) => (
                      <motion.div 
                        className="project-card"
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="project-number">{index + 1}</div>
                        <div className="project-name">{project}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="program-cta">
                <a href="#registration" className="btn-primary">
                  Enroll in this Program <HiOutlineArrowNarrowRight className="btn-icon" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
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
            <h2>Student <span className="gradient-text">Success Stories</span></h2>
            <p className="section-subtitle">Hear from our past participants</p>
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
                  <div className="author-image">
                    <img src={testimonial.image} alt={testimonial.name} />
                  </div>
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.position}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Target Audience Section */}
      <section className="audience-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2>Who Should <span className="gradient-text">Join?</span></h2>
            <p className="section-subtitle">Our winter training is perfect for:</p>
          </motion.div>
          
          <div className="audience-cards">
            <motion.div 
              className="audience-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="audience-icon">🎓</div>
              <h3>College Students</h3>
              <p>Engineering and technology students looking to gain practical skills during their winter break</p>
              <ul className="audience-benefits">
                <li>Enhance your resume with practical skills</li>
                <li>Build portfolio-worthy projects</li>
                <li>Get a head start on internship opportunities</li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="audience-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="audience-icon">🛠️</div>
              <h3>Fresh Graduates</h3>
              <p>Recent graduates looking to bridge the gap between academic knowledge and industry requirements</p>
              <ul className="audience-benefits">
                <li>Develop job-ready technical skills</li>
                <li>Get placement assistance</li>
                <li>Network with industry professionals</li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="audience-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="audience-icon">🚀</div>
              <h3>Working Professionals</h3>
              <p>Professionals looking to upskill or make a career transition into high-demand technical domains</p>
              <ul className="audience-benefits">
                <li>Learn new technologies and frameworks</li>
                <li>Flexible weekend batches available</li>
                <li>Certificate to boost career prospects</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Registration Section */}
      <section className="registration-section" id="registration">
        <div className="container">
          <div className="registration-container">
            <div className="row">
              <motion.div 
                className="col-lg-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="registration-content">
                  <h2>Enroll for <span className="gradient-text">Winter 2025</span></h2>
                  <p>
                    Register now to secure your spot in our premium winter training program.
                    Limited seats available!
                  </p>
                  
                  <div className="registration-features">
                    <div className="feature">
                      <div className="feature-check">✓</div>
                      <span>Early Bird Discount Available</span>
                    </div>
                    <div className="feature">
                      <div className="feature-check">✓</div>
                      <span>Flexible Batch Options</span>
                    </div>
                    <div className="feature">
                      <div className="feature-check">✓</div>
                      <span>Industry-Recognized Certification</span>
                    </div>
                    <div className="feature">
                      <div className="feature-check">✓</div>
                      <span>Placement Support</span>
                    </div>
                  </div>
                  
                  <div className="batch-info">
                    <h4>Upcoming Batches:</h4>
                    <div className="batch">
                      <div className="batch-date">December 10, 2025</div>
                      <div className="batch-status">Limited Seats</div>
                    </div>
                    <div className="batch">
                      <div className="batch-date">December 20, 2025</div>
                      <div className="batch-status available">Available</div>
                    </div>
                    <div className="batch">
                      <div className="batch-date">January 5, 2026</div>
                      <div className="batch-status available">Available</div>
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
                <div className="form-container">
                  <form className="registration-form" onSubmit={handleSubmit}>
                    <div className="form-header">
                      <h3>Register Your Interest</h3>
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
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="program">Interested Program</label>
                      <select
                        id="program"
                        name="program"
                        value={formData.program}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="Python Programming">Python Programming</option>
                        <option value="Machine Learning & AI">Machine Learning & AI</option>
                        <option value="Cybersecurity Essentials">Cybersecurity Essentials</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="message">Any Questions?</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Tell us if you have any specific questions"
                      ></textarea>
                    </div>
                    
                    <button type="submit" className="submit-button">
                      Submit Application <HiOutlineArrowNarrowRight className="btn-icon" />
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

export default WinterTraining;