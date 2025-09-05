import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase, FaGithub, FaLaptopCode, FaMobileAlt } from "react-icons/fa";
import { SiExpress, SiMongodb, SiBootstrap, SiVercel, SiNetlify } from "react-icons/si";
import { HiOutlineArrowNarrowRight, HiOutlineAcademicCap, HiOutlineLightBulb } from "react-icons/hi";
import { RiRocketLine, RiCodeSSlashLine, RiUserSearchLine } from "react-icons/ri";
import { BiCheckShield, BiTimeFive } from "react-icons/bi";
import Navbar from "../../Components/Navbar/Navbar";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import Footer from "../../Components/Footer/Footer";
import bannerPic from "../../assets/img/bg-page.jpg";
import "./WebDevelopmentPage.css";

const WebDevelopment = () => {
  // State for active tab in curriculum section
  const [activeModule, setActiveModule] = useState("frontend");
  
  // State for expanded FAQ items
  const [expandedFaq, setExpandedFaq] = useState(null);
  
  // State for enrollment form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    background: "",
    message: ""
  });
  
  // Refs for scroll animations
  const heroRef = useRef(null);
  const curriculumRef = useRef(null);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
  
  // Course features data
  const features = [
    {
      icon: <FaLaptopCode />,
      title: "Full-Stack Development",
      description: "Master both frontend and backend technologies to build complete web applications"
    },
    {
      icon: <RiCodeSSlashLine />,
      title: "Industry-Relevant Skills",
      description: "Learn modern frameworks and tools currently used in the industry"
    },
    {
      icon: <HiOutlineAcademicCap />,
      title: "Expert Instructors",
      description: "Learn from experienced web developers with real-world project experience"
    },
    {
      icon: <RiRocketLine />,
      title: "Project-Based Learning",
      description: "Build real-world projects to apply your skills and create a portfolio"
    }
  ];
  
  // Curriculum data
  const curriculum = {
    frontend: {
      title: "Frontend Development",
      icon: <FaReact className="text-primary" />,
      weeks: "Weeks 1-4",
      description: "Master the art of creating beautiful, responsive user interfaces with modern frontend technologies.",
      topics: [
        {
          title: "HTML5 & CSS3 Foundations",
          icon: <FaHtml5 />,
          subtopics: ["Semantic HTML", "CSS Flexbox & Grid", "Responsive Design", "CSS Animations"]
        },
        {
          title: "JavaScript Essentials",
          icon: <FaJs />,
          subtopics: ["ES6+ Features", "DOM Manipulation", "Asynchronous JS", "Error Handling"]
        },
        {
          title: "React.js Development",
          icon: <FaReact />,
          subtopics: ["Components & Props", "State Management", "Hooks", "Context API", "React Router"]
        },
        {
          title: "UI Frameworks",
          icon: <SiBootstrap />,
          subtopics: ["Bootstrap 5", "Material UI", "Styled Components", "Responsive Frameworks"]
        }
      ]
    },
    backend: {
      title: "Backend Development",
      icon: <FaNodeJs className="text-primary" />,
      weeks: "Weeks 5-8",
      description: "Develop robust server-side applications with Node.js, Express, and MongoDB to power your web applications.",
      topics: [
        {
          title: "Node.js Fundamentals",
          icon: <FaNodeJs />,
          subtopics: ["Node.js Environment", "NPM", "File System", "Event Loop", "Streams & Buffers"]
        },
        {
          title: "Express.js Framework",
          icon: <SiExpress />,
          subtopics: ["Route Handling", "Middleware", "Template Engines", "Error Handling", "REST API Development"]
        },
        {
          title: "Database Integration",
          icon: <SiMongodb />,
          subtopics: ["MongoDB Basics", "Mongoose ODM", "CRUD Operations", "Indexing & Aggregation", "Data Validation"]
        },
        {
          title: "Authentication & Security",
          icon: <BiCheckShield />,
          subtopics: ["JWT", "OAuth", "Password Hashing", "CORS", "Security Best Practices"]
        }
      ]
    },
    deployment: {
      title: "Integration & Deployment",
      icon: <FaGithub className="text-primary" />,
      weeks: "Weeks 9-12",
      description: "Bring everything together, implement advanced features, and deploy your applications to the world.",
      topics: [
        {
          title: "Full-Stack Integration",
          icon: <FaDatabase />,
          subtopics: ["API Integration", "State Management", "Data Flow Architecture", "Performance Optimization"]
        },
        {
          title: "Version Control",
          icon: <FaGithub />,
          subtopics: ["Git Fundamentals", "Branching Strategies", "Collaboration Workflows", "GitHub/GitLab"]
        },
        {
          title: "Deployment & CI/CD",
          icon: <SiVercel />,
          subtopics: ["Netlify", "Vercel", "Heroku", "AWS Basics", "CI/CD Pipelines"]
        },
        {
          title: "Final Project",
          icon: <RiRocketLine />,
          subtopics: ["Project Planning", "Implementation", "Testing", "Deployment", "Presentation"]
        }
      ]
    }
  };
  
  // Projects showcase data
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured online store with product catalog, shopping cart, user authentication, and payment processing.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "Social Media Dashboard",
      description: "A responsive dashboard that integrates with social media APIs to display analytics, schedule posts, and manage engagement.",
      technologies: ["React", "Context API", "Chart.js", "REST APIs", "Firebase"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1415&q=80"
    },
    {
      title: "Real-Time Chat Application",
      description: "A modern chat platform with real-time messaging, user profiles, message history, and file sharing capabilities.",
      technologies: ["React", "Socket.io", "Express", "MongoDB", "JWT"],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    }
  ];
  
  // Testimonials data
  const testimonials = [
    {
      quote: "The web development course at SkillVedaa transformed my career. I went from knowing almost nothing about coding to landing a junior developer position within months of completion.",
      name: "Rahul Sharma",
      position: "Frontend Developer at TechSolutions",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "The project-based approach was exactly what I needed. By building real applications throughout the course, I gained practical experience that I showcase in my portfolio.",
      name: "Priya Patel",
      position: "Freelance Web Developer",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "The instructors were fantastic - always available to answer questions and providing valuable insights from their industry experience. Highly recommend this program!",
      name: "Vikram Singh",
      position: "Full Stack Developer at InnovateX",
      image: "https://randomuser.me/api/portraits/men/67.jpg"
    }
  ];
  
  // FAQ data
  const faqItems = [
    {
      question: "Is this course suitable for complete beginners?",
      answer: "Yes, this course is designed with a progressive curriculum that starts with the fundamentals and gradually advances to more complex topics. No prior coding experience is required, although basic computer literacy is helpful."
    },
    {
      question: "How much time should I dedicate to the course each week?",
      answer: "For optimal learning, we recommend dedicating 15-20 hours per week. This includes attending live sessions, working on assignments, and building projects. The course is structured to accommodate working professionals with flexible scheduling."
    },
    {
      question: "Will I receive a certificate upon completion?",
      answer: "Yes, you'll receive an industry-recognized certification upon successful completion of the course and final project. This certificate can be added to your resume and LinkedIn profile to showcase your web development skills."
    },
    {
      question: "Is job placement assistance provided?",
      answer: "Yes, we offer comprehensive career support including resume building, portfolio development, interview preparation, and connections with our hiring partners. While we don't guarantee job placement, our students have an excellent track record of securing positions within 3 months of graduation."
    },
    {
      question: "What kind of projects will I build during the course?",
      answer: "Throughout the course, you'll build several projects of increasing complexity, from simple static websites to full-stack applications. The final project is a comprehensive web application that integrates all the technologies and concepts learned during the program."
    }
  ];
  
  // Course details
  const courseDetails = [
    { label: "Duration", value: "12 Weeks", icon: <BiTimeFive /> },
    { label: "Level", value: "Beginner to Advanced", icon: <HiOutlineAcademicCap /> },
    { label: "Projects", value: "6+ Real-world Projects", icon: <RiCodeSSlashLine /> },
    { label: "Access", value: "Lifetime Course Access", icon: <RiUserSearchLine /> },
    { label: "Support", value: "Dedicated Mentor Support", icon: <HiOutlineLightBulb /> },
    { label: "Format", value: "Online & Self-paced", icon: <FaMobileAlt /> }
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
    setFormData({
      name: "",
      email: "",
      phone: "",
      background: "",
      message: ""
    });
  };
  
  // Toggle FAQ expansion
  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <>
     
      <Navbar />
    <div className="web-development-page">
      
      {/* Hero Section */}
      <div className="hero-section" ref={heroRef}>
          <Breadcrumb courseImage={bannerPic} />

        
        <div className="container">
          <div className="hero">
            <div className="row align-items-center">
                <motion.span 
                  className="hero-badge"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <span className="hero-badge-icon">🔥</span> Most Popular Course
                </motion.span>
              <div className="col-lg-6">
                
                <motion.h1 
                  className="hero-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Master <span className="gradient-text">Web Development</span> From Scratch to Pro
                </motion.h1>
                
                <motion.p 
                  className="hero-subtitle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Learn to build stunning, responsive websites and web applications with modern tools and frameworks
                </motion.p>
                
                <motion.div 
                  className="course-details-grid"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  {courseDetails.map((detail, index) => (
                    <div className="course-detail-item" key={index}>
                      <span className="detail-icon">{detail.icon}</span>
                      <div className="detail-content">
                        <span className="detail-label">{detail.label}</span>
                        <span className="detail-value">{detail.value}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
                
                <motion.div 
                  className="hero-cta"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <a href="#enroll-form" className="btn-primary">
                    Enroll Now <HiOutlineArrowNarrowRight className="btn-icon" />
                  </a>
                  <a href="#curriculum" className="btn-secondary">
                    View Curriculum
                  </a>
                </motion.div>
              </div>
              
              <div className="col-lg-6 d-none d-lg-block">
                <motion.div 
                  className="hero-image-container"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div className="tech-icons">
                    <div className="tech-icon html"><FaHtml5 /></div>
                    <div className="tech-icon css"><FaCss3Alt /></div>
                    <div className="tech-icon js"><FaJs /></div>
                    <div className="tech-icon react"><FaReact /></div>
                    <div className="tech-icon node"><FaNodeJs /></div>
                    <div className="tech-icon mongodb"><SiMongodb /></div>
                  </div>
                  <div className="hero-image"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Why Choose <span className="gradient-text">Our Program</span></h2>
            <p className="section-subtitle">Comprehensive training designed for career success</p>
          </motion.div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div 
                className="feature-card"
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Curriculum Section */}
      <section className="curriculum-section" id="curriculum" ref={curriculumRef}>
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Course <span className="gradient-text">Curriculum</span></h2>
            <p className="section-subtitle">Comprehensive learning path from basics to advanced concepts</p>
          </motion.div>
          
          <div className="curriculum-tabs">
            <button 
              className={`tab-button ${activeModule === "frontend" ? "active" : ""}`}
              onClick={() => setActiveModule("frontend")}
            >
              <FaReact className="tab-icon" />
              <span>Frontend</span>
            </button>
            <button 
              className={`tab-button ${activeModule === "backend" ? "active" : ""}`}
              onClick={() => setActiveModule("backend")}
            >
              <FaNodeJs className="tab-icon" />
              <span>Backend</span>
            </button>
            <button 
              className={`tab-button ${activeModule === "deployment" ? "active" : ""}`}
              onClick={() => setActiveModule("deployment")}
            >
              <FaGithub className="tab-icon" />
              <span>Integration & Deployment</span>
            </button>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeModule}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="curriculum-content"
            >
              <div className="curriculum-header">
                <div className="curriculum-icon">
                  {curriculum[activeModule].icon}
                </div>
                <div className="curriculum-title">
                  <h3>{curriculum[activeModule].title}</h3>
                  <span className="curriculum-duration">{curriculum[activeModule].weeks}</span>
                </div>
              </div>
              
              <p className="curriculum-description">{curriculum[activeModule].description}</p>
              
              <div className="topics-grid">
                {curriculum[activeModule].topics.map((topic, index) => (
                  <motion.div 
                    className="topic-card"
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="topic-header">
                      <div className="topic-icon">{topic.icon}</div>
                      <h4>{topic.title}</h4>
                    </div>
                    <ul className="subtopics-list">
                      {topic.subtopics.map((subtopic, idx) => (
                        <li key={idx}>{subtopic}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      
      {/* Projects Showcase Section */}
      <section className="projects-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Projects You'll <span className="gradient-text">Build</span></h2>
            <p className="section-subtitle">Apply your skills to create impressive real-world applications</p>
          </motion.div>
          
          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div 
                className="project-card"
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, idx) => (
                      <span className="tech-badge" key={idx}>{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Student <span className="gradient-text">Success Stories</span></h2>
            <p className="section-subtitle">Hear from our graduates who transformed their careers</p>
          </motion.div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                className="testimonial-card"
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
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
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Frequently Asked <span className="gradient-text">Questions</span></h2>
            <p className="section-subtitle">Everything you need to know about our web development program</p>
          </motion.div>
          
          <div className="faq-container">
            {faqItems.map((item, index) => (
              <motion.div 
                className={`faq-item ${expandedFaq === index ? 'active' : ''}`}
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="faq-question" onClick={() => toggleFaq(index)}>
                  <h3>{item.question}</h3>
                  <span className="faq-icon">{expandedFaq === index ? '−' : '+'}</span>
                </div>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div 
                      className="faq-answer"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Enrollment Form Section */}
      <section className="enrollment-section" id="enroll-form">
        <div className="container">
          <div className="enrollment-container">
            <div className="row">
              <motion.div 
                className="col-lg-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="enrollment-content">
                  <h2>Ready to <span className="gradient-text">Start Your Journey</span>?</h2>
                  <p>
                    Enroll in our Web Development program today and take the first step toward a rewarding tech career.
                  </p>
                  
                  <div className="enrollment-features">
                    <div className="enrollment-feature">
                      <div className="feature-check">✓</div>
                      <span>Industry-Recognized Certification</span>
                    </div>
                    <div className="enrollment-feature">
                      <div className="feature-check">✓</div>
                      <span>Job Placement Assistance</span>
                    </div>
                    <div className="enrollment-feature">
                      <div className="feature-check">✓</div>
                      <span>Flexible Learning Schedule</span>
                    </div>
                    <div className="enrollment-feature">
                      <div className="feature-check">✓</div>
                      <span>Real-World Project Portfolio</span>
                    </div>
                    <div className="enrollment-feature">
                      <div className="feature-check">✓</div>
                      <span>One-on-One Mentorship</span>
                    </div>
                  </div>
                  
                  <div className="batch-info">
                    <h4>Upcoming Batches:</h4>
                    <div className="batch">
                      <div className="batch-date">August 15, 2025</div>
                      <div className="batch-status">Limited Seats</div>
                    </div>
                    <div className="batch">
                      <div className="batch-date">September 1, 2025</div>
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
                  <form className="enrollment-form" onSubmit={handleSubmit}>
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
                      <label htmlFor="background">Your Background</label>
                      <select
                        id="background"
                        name="background"
                        value={formData.background}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select your background</option>
                        <option value="Student">Student</option>
                        <option value="Working Professional">Working Professional</option>
                        <option value="Career Changer">Career Changer</option>
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
                        placeholder="Tell us about your goals or any questions you have"
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

export default WebDevelopment;