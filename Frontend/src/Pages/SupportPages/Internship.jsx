import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FaBriefcase, FaLaptopCode, FaUserGraduate, FaCertificate, FaChartLine, FaRegLightbulb } from "react-icons/fa";
import { BsLightningCharge, BsArrowRight, BsCalendarCheck, BsClock, BsBuilding } from "react-icons/bs";
import { HiOutlineArrowNarrowRight, HiOutlineDocumentText, HiOutlineAcademicCap } from "react-icons/hi";
import Navbar from "../../Components/Navbar/Navbar";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import Footer from "../../Components/Footer/Footer";
import "./InternshipProgram.css";
import bannerPic from "../../assets/img/bg-page.jpg";

const InternshipProgram = () => {
  // State for active internship domain
  const [activeDomain, setActiveDomain] = useState("software");
  
  // State for application form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    domain: "Software Development",
    message: ""
  });
  
  // State for success message after form submission
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Refs for scroll animations
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
  
  // Internship domains data
  const domains = {
    software: {
      title: "Software Development",
      duration: "3-6 Months",
      stipend: "Performance Based",
      icon: <FaLaptopCode />,
      description: "Gain hands-on experience in web and mobile application development using cutting-edge technologies and frameworks.",
      responsibilities: [
        "Collaborate with senior developers on live projects",
        "Write clean, maintainable, and efficient code",
        "Participate in code reviews and development meetings",
        "Troubleshoot and debug applications",
        "Create and maintain technical documentation"
      ],
      skills: ["HTML/CSS/JavaScript", "React/Angular", "Node.js", "Python", "Mobile Development", "Git/GitHub"]
    },
    data: {
      title: "Data Science & Analytics",
      duration: "3-6 Months",
      stipend: "Performance Based",
      icon: <FaChartLine />,
      description: "Work on real-world data problems, implementing machine learning algorithms and creating data visualizations for business insights.",
      responsibilities: [
        "Clean and preprocess datasets for analysis",
        "Develop and implement data models and algorithms",
        "Create data visualizations and dashboards",
        "Generate insights from complex datasets",
        "Present findings to stakeholders"
      ],
      skills: ["Python", "SQL", "Data Visualization", "Statistical Analysis", "Machine Learning", "Pandas/NumPy"]
    },
    digital: {
      title: "Digital Marketing",
      duration: "3-6 Months",
      stipend: "Performance Based",
      icon: <FaRegLightbulb />,
      description: "Learn digital marketing strategies by working on live campaigns, social media management, and content creation for real businesses.",
      responsibilities: [
        "Assist in planning and executing digital marketing campaigns",
        "Create and schedule social media content",
        "Monitor campaign performance and analytics",
        "Conduct keyword research and SEO optimization",
        "Contribute to email marketing and content strategies"
      ],
      skills: ["Social Media Marketing", "SEO/SEM", "Content Creation", "Email Marketing", "Google Analytics", "Digital Advertising"]
    }
  };
  
  // Stats data
  const stats = [
    { value: "500+", label: "Internships Completed", icon: <FaBriefcase /> },
    { value: "92%", label: "Placement Rate", icon: <FaChartLine /> },
    { value: "45+", label: "Partner Companies", icon: <BsBuilding /> },
    { value: "12+", label: "Industry Domains", icon: <FaCertificate /> }
  ];
  
  // Testimonials data
  const testimonials = [
    {
      quote: "My internship at SkillVedaa was a game-changer for my career. The hands-on experience and mentorship I received were invaluable.",
      name: "Ravi Kumar",
      position: "Former Intern, now Software Engineer at Tech Solutions",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "The real-world projects during my internship gave me confidence and skills that set me apart during job interviews. Highly recommend!",
      name: "Priya Sharma",
      position: "Data Analyst at Analytics Corp",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  ];
  
  // Program benefits
  const benefits = [
    {
      icon: <HiOutlineAcademicCap />,
      title: "Hands-on Learning",
      description: "Work on real projects to gain practical skills and experience"
    },
    {
      icon: <FaUserGraduate />,
      title: "Expert Mentorship",
      description: "Learn directly from industry professionals who guide your growth"
    },
    {
      icon: <HiOutlineDocumentText />,
      title: "Certification",
      description: "Receive industry-recognized certificates to boost your resume"
    },
    {
      icon: <BsCalendarCheck />,
      title: "Flexible Schedule",
      description: "Part-time and full-time options to fit your availability"
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
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        education: "",
        domain: "Software Development",
        message: ""
      });
    }, 5000);
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
    <div className="internship-page">
      
      {/* Hero Section */}
      <div className="hero-section" ref={heroRef}>
        
          <Breadcrumb courseImage={bannerPic} />
      
        
        <motion.div 
          className="hero-content container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="row align-items-center">
            <div className="col-lg-7">
              <motion.div 
                className="badge-container"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <span className="hero-badge">
                  <BsLightningCharge className="badge-icon" />
                  Applications Open for 2025 Batch
                </span>
              </motion.div>
              
              <motion.h1 
                className="hero-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                Launch Your Career with <span className="gradient-text">Industry Experience</span>
              </motion.h1>
              
              <motion.p 
                className="hero-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.9 }}
              >
                Gain real-world skills, build an impressive portfolio, and open doors to exciting career opportunities with SkillVedaa's comprehensive internship programs
              </motion.p>
              
              <motion.div 
                className="hero-features"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div className="feature-item" variants={fadeInUp}>
                  <div className="feature-icon">✓</div>
                  <span>Work on Real Industry Projects</span>
                </motion.div>
                <motion.div className="feature-item" variants={fadeInUp}>
                  <div className="feature-icon">✓</div>
                  <span>Expert Mentorship & Guidance</span>
                </motion.div>
                <motion.div className="feature-item" variants={fadeInUp}>
                  <div className="feature-icon">✓</div>
                  <span>Industry-Recognized Certification</span>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="hero-cta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <a href="#apply-now" className="btn-primary">
                  Apply Now <HiOutlineArrowNarrowRight className="btn-icon" />
                </a>
                <a href="#domains" className="btn-secondary">
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
            <h2>Why Choose Our <span className="gradient-text">Internship Program</span></h2>
            <p className="section-subtitle">Build skills that matter in today's job market</p>
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
      
      {/* Domain Tabs Section */}
      <section className="domains-section" id="domains">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2>Internship <span className="gradient-text">Domains</span></h2>
            <p className="section-subtitle">Explore our diverse internship opportunities</p>
          </motion.div>
          
          <div className="domains-tabs">
            <button 
              className={`tab-button ${activeDomain === "software" ? "active" : ""}`}
              onClick={() => setActiveDomain("software")}
            >
              <FaLaptopCode className="tab-icon" />
              <span>Software Development</span>
            </button>
            <button 
              className={`tab-button ${activeDomain === "data" ? "active" : ""}`}
              onClick={() => setActiveDomain("data")}
            >
              <FaChartLine className="tab-icon" />
              <span>Data Science</span>
            </button>
            <button 
              className={`tab-button ${activeDomain === "digital" ? "active" : ""}`}
              onClick={() => setActiveDomain("digital")}
            >
              <FaRegLightbulb className="tab-icon" />
              <span>Digital Marketing</span>
            </button>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeDomain}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="domain-details"
            >
              <div className="domain-header">
                <div className="domain-icon">
                  {domains[activeDomain].icon}
                </div>
                <div className="domain-title">
                  <h3>{domains[activeDomain].title}</h3>
                  <div className="domain-meta">
                    <span className="duration">
                      <BsClock /> {domains[activeDomain].duration}
                    </span>
                    <span className="stipend">Stipend: {domains[activeDomain].stipend}</span>
                  </div>
                </div>
              </div>
              
              <p className="domain-description">
                {domains[activeDomain].description}
              </p>
              
              <div className="domain-content">
                <div className="responsibilities">
                  <h4>Key Responsibilities</h4>
                  <ul>
                    {domains[activeDomain].responsibilities.map((item, index) => (
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
                
                <div className="skills">
                  <h4>Skills You'll Gain</h4>
                  <div className="skills-grid">
                    {domains[activeDomain].skills.map((skill, index) => (
                      <motion.div 
                        className="skill-tag"
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="domain-cta">
                <a href="#apply-now" className="btn-primary">
                  Apply for this Internship <HiOutlineArrowNarrowRight className="btn-icon" />
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
            <h2>Success <span className="gradient-text">Stories</span></h2>
            <p className="section-subtitle">Hear from our former interns</p>
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
      
      {/* Who Should Apply Section */}
      <section className="audience-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2>Who Should <span className="gradient-text">Apply?</span></h2>
            <p className="section-subtitle">Our internship programs are perfect for:</p>
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
              <p>Final-year students looking to gain practical industry experience before graduation</p>
              <ul className="audience-benefits">
                <li>Apply classroom knowledge to real projects</li>
                <li>Build an impressive resume</li>
                <li>Gain an edge in the job market</li>
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
              <div className="audience-icon">📈</div>
              <h3>Fresh Graduates</h3>
              <p>Recent graduates looking to enhance their skills and employability</p>
              <ul className="audience-benefits">
                <li>Bridge the gap between education and industry</li>
                <li>Work on portfolio-worthy projects</li>
                <li>Gain confidence through hands-on experience</li>
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
              <div className="audience-icon">💻</div>
              <h3>Career Changers</h3>
              <p>Professionals looking to transition into a new field or domain</p>
              <ul className="audience-benefits">
                <li>Gain experience in your target industry</li>
                <li>Learn from experts in your desired field</li>
                <li>Build a new professional network</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Application Section */}
      <section className="application-section" id="apply-now">
        <div className="container">
          <div className="application-container">
            <div className="row">
              <motion.div 
                className="col-lg-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="application-content">
                  <h2>Apply for <span className="gradient-text">2025 Internships</span></h2>
                  <p>
                    Submit your application today to kickstart your professional journey.
                    Limited positions available!
                  </p>
                  
                  <div className="application-process">
                    <h4>Application Process:</h4>
                    <div className="process-step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h5>Submit Application</h5>
                        <p>Fill out the application form with your details and preferences</p>
                      </div>
                    </div>
                    <div className="process-step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h5>Assessment & Interview</h5>
                        <p>Complete a skill assessment and interview with our team</p>
                      </div>
                    </div>
                    <div className="process-step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h5>Onboarding</h5>
                        <p>Receive your internship offer and join our community of learners</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="important-dates">
                    <h4>Important Dates:</h4>
                    <div className="date-item">
                      <div className="date">August 15, 2025</div>
                      <div className="date-label">Application Deadline</div>
                    </div>
                    <div className="date-item">
                      <div className="date">September 1, 2025</div>
                      <div className="date-label">Internship Start Date</div>
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
                  <AnimatePresence>
                    {showSuccess ? (
                      <motion.div 
                        className="success-message"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="success-icon">✓</div>
                        <h3>Application Submitted!</h3>
                        <p>Thank you for your interest in our internship program. We'll review your application and get back to you within 5-7 business days.</p>
                      </motion.div>
                    ) : (
                      <form className="application-form" onSubmit={handleSubmit}>
                        <div className="form-header">
                          <h3>Internship Application</h3>
                          <p>Fill out the form below to apply</p>
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
                          <label htmlFor="education">Educational Background</label>
                          <input
                            type="text"
                            id="education"
                            name="education"
                            value={formData.education}
                            onChange={handleInputChange}
                            placeholder="Degree, Institution, Year"
                            required
                          />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="domain">Preferred Domain</label>
                          <select
                            id="domain"
                            name="domain"
                            value={formData.domain}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="Software Development">Software Development</option>
                            <option value="Data Science & Analytics">Data Science & Analytics</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="message">Why do you want to join this internship?</label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows="3"
                            placeholder="Tell us about your goals and expectations"
                            required
                          ></textarea>
                        </div>
                        
                        <button type="submit" className="submit-button">
                          Submit Application <HiOutlineArrowNarrowRight className="btn-icon" />
                        </button>
                      </form>
                    )}
                  </AnimatePresence>
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

export default InternshipProgram;