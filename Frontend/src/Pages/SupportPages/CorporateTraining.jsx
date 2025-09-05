import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FaChalkboardTeacher, FaUsers, FaCogs, FaChartLine, FaCode, FaBullhorn, FaHandshake, FaComments } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import bannerPic from "../../assets/img/bg-page.jpg";
import "./CorporateTraining.css"; 

const CorporateTraining = () => {
  // State for active tab in programs section
  const [activeTab, setActiveTab] = useState("technical");
  
  // State for form input in the contact section
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  
  // Refs for scroll animations
  const headerRef = useRef(null);
  const programsRef = useRef(null);
  const testimonialsRef = useRef(null);
  
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
  
  // Benefits data
  const benefitsList = [
    {
      icon: <FaChalkboardTeacher />,
      title: "Expert Instruction",
      description: "Learn from industry veterans with 10+ years of hands-on experience"
    },
    {
      icon: <FaCogs />,
      title: "Customized Programs",
      description: "Training solutions tailored to your organization's specific challenges"
    },
    {
      icon: <FaUsers />,
      title: "Team Development",
      description: "Build cohesive teams with improved communication and collaboration"
    },
    {
      icon: <FaChartLine />,
      title: "Performance Boost",
      description: "Measurable improvements in productivity and business outcomes"
    }
  ];
  
  // Testimonials data
  const testimonials = [
    {
      quote: "SkillVedaa transformed our IT department's capabilities, resulting in a 40% increase in project delivery speed.",
      author: "Rajesh Sharma",
      position: "CTO, TechSolutions Ltd"
    },
    {
      quote: "The customized leadership program helped us build a stronger management team. Highly recommended!",
      author: "Priya Patel",
      position: "HR Director, Global Innovations"
    },
    {
      quote: "Their technical training for our development team was exceptional. The practical approach made all the difference.",
      author: "Vikram Malhotra",
      position: "Development Manager, Futuresoft"
    }
  ];
  
  // Technical and non-technical programs data
  const programs = {
    technical: [
      { name: "Machine Learning & AI", duration: "4-6 weeks", level: "Advanced" },
      { name: "Full Stack Development", duration: "8-10 weeks", level: "Intermediate to Advanced" },
      { name: "Cloud Computing & DevOps", duration: "6-8 weeks", level: "Intermediate" },
      { name: "Data Science & Analytics", duration: "8 weeks", level: "Intermediate to Advanced" },
      { name: "Cybersecurity", duration: "4-6 weeks", level: "All levels" }
    ],
    nonTechnical: [
      { name: "Leadership & Management", duration: "3-4 weeks", level: "All levels" },
      { name: "Business Communication", duration: "2-3 weeks", level: "All levels" },
      { name: "Project Management", duration: "4 weeks", level: "Intermediate" },
      { name: "Digital Marketing", duration: "4-6 weeks", level: "Beginner to Intermediate" },
      { name: "Sales Excellence", duration: "3 weeks", level: "All levels" }
    ]
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
    alert("Thank you for your interest! Our team will contact you shortly.");
  };

  return (
    <> 
      <Navbar />
    <div className="corporate-training-page">   
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
                <span className="gradient-text">Corporate Training</span> Solutions
              </motion.h1>
              
              <motion.p 
                className="hero-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                Empower your workforce with cutting-edge skills and knowledge
              </motion.p>
              
              <motion.div 
                className="hero-features"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div className="feature-item" variants={fadeInUp}>
                  <IoMdCheckmarkCircleOutline className="feature-icon" />
                  <span>Customized Training Programs</span>
                </motion.div>
                <motion.div className="feature-item" variants={fadeInUp}>
                  <IoMdCheckmarkCircleOutline className="feature-icon" />
                  <span>Expert Industry Trainers</span>
                </motion.div>
                <motion.div className="feature-item " variants={fadeInUp}>
                  <IoMdCheckmarkCircleOutline className="feature-icon" />
                  <span>Hands-on Learning Experience</span>
                </motion.div>
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
            <p className="section-subtitle">Our corporate training programs deliver measurable business impact</p>
          </motion.div>
          
          <motion.div 
            className="benefits-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {benefitsList.map((benefit, index) => (
              <motion.div 
                className="benefit-card"
                key={index}
                variants={fadeInUp}
              >
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Our Approach Section */}
      <section className="approach-section">
        <div className="container">
          <div className="row align-items-center">
            <motion.div 
              className="col-lg-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="approach-content">
                <h2>Our Approach: <span className="gradient-text">Beyond Just Training</span></h2>
                <p>
                  At SkillVedaa, we take a holistic approach to corporate training. We understand that effective training is not just about transferring knowledge, but about creating transformative learning experiences that drive real business results.
                </p>
                
                <div className="approach-features">
                  <div className="approach-feature">
                    <div className="approach-feature-icon">
                      <span>01</span>
                    </div>
                    <div>
                      <h4>Analyze</h4>
                      <p>We begin by understanding your organization's unique challenges and objectives</p>
                    </div>
                  </div>
                  
                  <div className="approach-feature">
                    <div className="approach-feature-icon">
                      <span>02</span>
                    </div>
                    <div>
                      <h4>Customize</h4>
                      <p>Develop tailored training programs that address your specific needs</p>
                    </div>
                  </div>
                  
                  <div className="approach-feature">
                    <div className="approach-feature-icon">
                      <span>03</span>
                    </div>
                    <div>
                      <h4>Implement</h4>
                      <p>Deliver engaging, interactive training through expert facilitators</p>
                    </div>
                  </div>
                  
                  <div className="approach-feature">
                    <div className="approach-feature-icon">
                      <span>04</span>
                    </div>
                    <div>
                      <h4>Measure</h4>
                      <p>Track outcomes and ROI to ensure training objectives are met</p>
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
              <div className="approach-image-container">
                <div className="approach-image"></div>
                <div className="approach-stats">
                  <div className="stat-item">
                    <div className="stat-value">94%</div>
                    <div className="stat-label">Client Satisfaction</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">200+</div>
                    <div className="stat-label">Corporate Clients</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">15K+</div>
                    <div className="stat-label">Professionals Trained</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Training Programs Section */}
      <section className="programs-section" id="programs-section" ref={programsRef}>
        <div className="container">
          <motion.div 
            className="section-header text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2>Our Training <span className="gradient-text">Programs</span></h2>
            <p className="section-subtitle">Comprehensive solutions designed for today's business challenges</p>
          </motion.div>
          
          <div className="programs-tabs">
            <button 
              className={`tab-button ${activeTab === "technical" ? "active" : ""}`}
              onClick={() => setActiveTab("technical")}
            >
              <FaCode className="tab-icon" />
              <span>Technical Training</span>
            </button>
            <button 
              className={`tab-button ${activeTab === "nonTechnical" ? "active" : ""}`}
              onClick={() => setActiveTab("nonTechnical")}
            >
              <FaHandshake className="tab-icon" />
              <span>Non-Technical Training</span>
            </button>
          </div>
          
          <AnimatePresence mode="wait">
            {activeTab === "technical" && (
              <motion.div 
                key="technical"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="programs-content"
              >
                <div className="row">
                  <div className="col-lg-4">
                    <div className="programs-overview">
                      <h3>Technical Training</h3>
                      <p>
                        Our technical training programs are designed to keep your IT and development teams at the cutting edge of technology. From programming and data science to cloud computing and cybersecurity, we cover all the critical skills needed in today's digital economy.
                      </p>
                      
                      <div className="program-highlights">
                        <div className="highlight-item">
                          <FaCode className="highlight-icon" />
                          <span>Hands-on coding exercises</span>
                        </div>
                        <div className="highlight-item">
                          <FaUsers className="highlight-icon" />
                          <span>Real-world project work</span>
                        </div>
                        <div className="highlight-item">
                          <FaCogs className="highlight-icon" />
                          <span>Latest tools and frameworks</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-lg-8">
                    <div className="programs-list">
                      {programs.technical.map((program, index) => (
                        <motion.div 
                          className="program-card"
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                          <div className="program-icon">
                            <FaCode />
                          </div>
                          <div className="program-details">
                            <h4>{program.name}</h4>
                            <div className="program-meta">
                              <span>Duration: {program.duration}</span>
                              <span>Level: {program.level}</span>
                            </div>
                            <a href="#contact-section" className="program-link">
                              Learn More <HiOutlineArrowNarrowRight />
                            </a>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === "nonTechnical" && (
              <motion.div 
                key="nonTechnical"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="programs-content"
              >
                <div className="row">
                  <div className="col-lg-4">
                    <div className="programs-overview">
                      <h3>Non-Technical Training</h3>
                      <p>
                        Our non-technical training programs focus on developing the essential business, leadership, and soft skills that drive organizational success. From management training to communication skills, we help your teams excel in all aspects of business.
                      </p>
                      
                      <div className="program-highlights">
                        <div className="highlight-item">
                          <FaChartLine className="highlight-icon" />
                          <span>Leadership development</span>
                        </div>
                        <div className="highlight-item">
                          <FaComments className="highlight-icon" />
                          <span>Communication workshops</span>
                        </div>
                        <div className="highlight-item">
                          <FaBullhorn className="highlight-icon" />
                          <span>Presentation skills</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-lg-8">
                    <div className="programs-list">
                      {programs.nonTechnical.map((program, index) => (
                        <motion.div 
                          className="program-card"
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                          <div className="program-icon">
                            <FaHandshake />
                          </div>
                          <div className="program-details">
                            <h4>{program.name}</h4>
                            <div className="program-meta">
                              <span>Duration: {program.duration}</span>
                              <span>Level: {program.level}</span>
                            </div>
                            <a href="#contact-section" className="program-link">
                              Learn More <HiOutlineArrowNarrowRight />
                            </a>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="testimonials-section" ref={testimonialsRef}>
        <div className="container">
          <motion.div 
            className="section-header text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2>What Our <span className="gradient-text">Clients Say</span></h2>
            <p className="section-subtitle">Success stories from organizations we've helped transform</p>
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
                  <h2>Ready to <span className="gradient-text">Transform</span> Your Workforce?</h2>
                  <p>Contact us today to discuss how our customized corporate training programs can help your organization achieve its goals.</p>
                  
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
                        <p>corporate@skillvedaa.com</p>
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
                      <label htmlFor="company">Company Name</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Enter your company name"
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
                        placeholder="Tell us about your training needs"
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

export default CorporateTraining;