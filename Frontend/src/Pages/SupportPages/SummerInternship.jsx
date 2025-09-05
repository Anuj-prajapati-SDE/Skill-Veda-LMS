import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FaLaptopCode, FaUserGraduate, FaCertificate, FaCalendarAlt, FaUsers, FaChartLine } from "react-icons/fa";
import { BsLightningChargeFill, BsCodeSquare, BsGraphUp, BsShieldCheck, BsCloud, BsGlobe } from "react-icons/bs";
import { HiOutlineArrowNarrowRight, HiOutlineClock } from "react-icons/hi";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import bannerPic from "../../assets/img/bg-page.jpg";
import "./SummerTraining.css";

const SummerTraining = () => {
  // State for active course category
  const [activeTrack, setActiveTrack] = useState("webdev");
  
  // State for registration form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "Web Development",
    message: ""
  });
  
  // State for countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 8,
    minutes: 30,
    seconds: 0
  });
  
  // Refs for scroll animations
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  // Course data
  const courses = {
    webdev: [
      {
        title: "Full Stack Web Development",
        duration: "6 Weeks",
        level: "Beginner to Intermediate",
        icon: <BsCodeSquare />,
        highlights: ["HTML5, CSS3, JavaScript", "React.js & Node.js", "MongoDB & Express", "Responsive Design", "API Integration"],
        projects: 3
      },
      {
        title: "Advanced JavaScript Frameworks",
        duration: "4 Weeks",
        level: "Intermediate",
        icon: <BsCodeSquare />,
        highlights: ["React Advanced Patterns", "State Management", "NextJS", "TypeScript", "Testing & Deployment"],
        projects: 2
      },
      {
        title: "UI/UX Design Fundamentals",
        duration: "3 Weeks",
        level: "All Levels",
        icon: <BsGlobe />,
        highlights: ["Design Principles", "Wireframing", "Prototyping", "User Research", "Figma & Adobe XD"],
        projects: 2
      }
    ],
    datascience: [
      {
        title: "Data Science Fundamentals",
        duration: "6 Weeks",
        level: "Beginner to Intermediate",
        icon: <BsGraphUp />,
        highlights: ["Python for Data Science", "Data Analysis with Pandas", "Data Visualization", "Statistical Analysis", "Machine Learning Basics"],
        projects: 3
      },
      {
        title: "Machine Learning & AI",
        duration: "5 Weeks",
        level: "Intermediate",
        icon: <BsGraphUp />,
        highlights: ["Supervised Learning", "Unsupervised Learning", "Neural Networks", "Natural Language Processing", "Computer Vision"],
        projects: 2
      },
      {
        title: "Big Data Analytics",
        duration: "4 Weeks",
        level: "Intermediate to Advanced",
        icon: <BsGraphUp />,
        highlights: ["Hadoop Ecosystem", "Spark", "Data Warehousing", "ETL Processes", "Data Pipelines"],
        projects: 2
      }
    ],
    cybersecurity: [
      {
        title: "Cybersecurity Fundamentals",
        duration: "5 Weeks",
        level: "Beginner to Intermediate",
        icon: <BsShieldCheck />,
        highlights: ["Network Security", "Cryptography", "Ethical Hacking", "Security Policies", "Threat Detection"],
        projects: 3
      },
      {
        title: "Penetration Testing",
        duration: "4 Weeks",
        level: "Intermediate",
        icon: <BsShieldCheck />,
        highlights: ["Vulnerability Assessment", "Exploitation Techniques", "Post-Exploitation", "Reporting", "Security Tools"],
        projects: 2
      }
    ],
    cloud: [
      {
        title: "Cloud Computing Essentials",
        duration: "5 Weeks",
        level: "Beginner to Intermediate",
        icon: <BsCloud />,
        highlights: ["AWS/Azure Fundamentals", "Cloud Architecture", "Deployment Models", "Scalability", "Cost Management"],
        projects: 3
      },
      {
        title: "DevOps & CI/CD",
        duration: "4 Weeks",
        level: "Intermediate",
        icon: <BsCloud />,
        highlights: ["Docker & Kubernetes", "CI/CD Pipelines", "Infrastructure as Code", "Monitoring & Logging", "Automation"],
        projects: 2
      }
    ]
  };
  
  // Stats data
  const stats = [
    { value: "5000+", label: "Students Trained", icon: <FaUsers /> },
    { value: "97%", label: "Placement Rate", icon: <FaChartLine /> },
    { value: "50+", label: "Industry Partners", icon: <FaLaptopCode /> },
    { value: "15+", label: "Specialized Courses", icon: <FaCertificate /> }
  ];
  
  // Program features
  const features = [
    {
      icon: <FaLaptopCode />,
      title: "Hands-on Learning",
      description: "Practice-oriented curriculum with real-world projects and coding exercises"
    },
    {
      icon: <FaUserGraduate />,
      title: "Expert Mentorship",
      description: "Learn directly from industry professionals with years of experience"
    },
    {
      icon: <FaCertificate />,
      title: "Certification",
      description: "Receive industry-recognized certificates to boost your resume"
    },
    {
      icon: <FaCalendarAlt />,
      title: "Flexible Schedule",
      description: "Choose between weekday and weekend batches to suit your availability"
    }
  ];
  
  // Timeline data
  const timeline = [
    { week: "Week 1", focus: "Fundamentals & Core Concepts", icon: "🔍" },
    { week: "Week 2-3", focus: "Technical Skill Development", icon: "🛠️" },
    { week: "Week 4-5", focus: "Project Implementation", icon: "🏗️" },
    { week: "Week 6", focus: "Advanced Topics & Final Project", icon: "🚀" }
  ];
  
  // Testimonials data
  const testimonials = [
    {
      quote: "The summer training at SkillVedaa completely transformed my technical skills. I secured an internship right after completing the program!",
      author: "Rahul Sharma",
      course: "Full Stack Web Development",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "The hands-on approach and real-world projects gave me practical experience that my college curriculum couldn't provide. Highly recommend!",
      author: "Priya Patel",
      course: "Data Science Fundamentals",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
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
      course: "Web Development",
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
    <div className="summer-training-page">
      
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
            <div className="col-lg-8 mx-auto text-center">
              <motion.div 
                className="badge-container"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <span className="hero-badge">
                  <BsLightningChargeFill className="badge-icon" />
                  Summer 2025 Batch Enrolling Now
                </span>
              </motion.div>
              
              <motion.h1 
                className="hero-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                Transform Your Summer with <span className="gradient-text">Industry-Ready</span> Training
              </motion.h1>
              
              <motion.p 
                className="hero-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.9 }}
              >
                Gain cutting-edge skills, work on real-world projects, and boost your career prospects
                with SkillVedaa's immersive summer training program
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
                <a href="#courses" className="btn-secondary">
                  Explore Courses
                </a>
              </motion.div>
              
              <motion.div 
                className="countdown-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.3 }}
              >
                <div className="countdown-label">
                  <HiOutlineClock /> Early Bird Offer Ends In:
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
      
      {/* Program Overview Section */}
      <section className="overview-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2>Program <span className="gradient-text">Overview</span></h2>
            <p className="section-subtitle">Immersive training designed for students and professionals</p>
          </motion.div>
          
          <div className="row align-items-center">
            <motion.div 
              className="col-lg-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="overview-content">
                <h3>Summer Training & Internship</h3>
                <p>
                  At <strong>SkillVedaa</strong> (A Unit of Morling Global Pvt Ltd.), we offer specialized
                  training and internship programs designed to equip students and professionals with
                  practical skills, industry knowledge, and hands-on experience to enhance their career prospects.
                </p>
                <p>
                  Our comprehensive summer program combines theoretical learning with practical implementation,
                  enabling participants to build industry-ready skills and create impressive portfolio projects.
                </p>
                
                <div className="overview-highlights">
                  <div className="highlight-item">
                    <div className="highlight-icon">🎯</div>
                    <div className="highlight-text">Practical, job-oriented curriculum</div>
                  </div>
                  <div className="highlight-item">
                    <div className="highlight-icon">🔗</div>
                    <div className="highlight-text">Industry-academia collaboration</div>
                  </div>
                  <div className="highlight-item">
                    <div className="highlight-icon">💼</div>
                    <div className="highlight-text">Internship opportunities for top performers</div>
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
              <div className="timeline-container">
                <h3>Program Structure</h3>
                <div className="timeline">
                  {timeline.map((item, index) => (
                    <div className="timeline-item" key={index}>
                      <div className="timeline-marker">
                        <span className="timeline-icon">{item.icon}</span>
                        <div className="timeline-connector"></div>
                      </div>
                      <div className="timeline-content">
                        <h4>{item.week}</h4>
                        <p>{item.focus}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
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
      
      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2>Program <span className="gradient-text">Features</span></h2>
            <p className="section-subtitle">What makes our summer training program stand out</p>
          </motion.div>
          
          <motion.div 
            className="features-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {features.map((feature, index) => (
              <motion.div 
                className="feature-card"
                key={index}
                variants={fadeInUp}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 }
                }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Courses Section */}
      <section className="courses-section" id="courses">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2>Our <span className="gradient-text">Courses</span></h2>
            <p className="section-subtitle">Explore our cutting-edge training programs</p>
          </motion.div>
          
          <div className="courses-tabs">
            <button 
              className={`tab-button ${activeTrack === "webdev" ? "active" : ""}`}
              onClick={() => setActiveTrack("webdev")}
            >
              <BsCodeSquare className="tab-icon" />
              <span>Web Development</span>
            </button>
            <button 
              className={`tab-button ${activeTrack === "datascience" ? "active" : ""}`}
              onClick={() => setActiveTrack("datascience")}
            >
              <BsGraphUp className="tab-icon" />
              <span>Data Science</span>
            </button>
            <button 
              className={`tab-button ${activeTrack === "cybersecurity" ? "active" : ""}`}
              onClick={() => setActiveTrack("cybersecurity")}
            >
              <BsShieldCheck className="tab-icon" />
              <span>Cybersecurity</span>
            </button>
            <button 
              className={`tab-button ${activeTrack === "cloud" ? "active" : ""}`}
              onClick={() => setActiveTrack("cloud")}
            >
              <BsCloud className="tab-icon" />
              <span>Cloud Computing</span>
            </button>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTrack}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="courses-grid"
            >
              {courses[activeTrack].map((course, index) => (
                <motion.div 
                  className="course-card"
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <div className="course-header">
                    <div className="course-icon">{course.icon}</div>
                    <div className="course-meta">
                      <span className="course-duration">
                        <HiOutlineClock /> {course.duration}
                      </span>
                      <span className="course-level">{course.level}</span>
                    </div>
                  </div>
                  <h3>{course.title}</h3>
                  <div className="course-highlights">
                    <h4>What You'll Learn:</h4>
                    <ul>
                      {course.highlights.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="course-footer">
                    <div className="projects-count">
                      <span>{course.projects}</span> Projects
                    </div>
                    <a href="#registration" className="course-enroll">
                      Enroll Now <HiOutlineArrowNarrowRight />
                    </a>
                  </div>
                </motion.div>
              ))}
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
                    <img src={testimonial.image} alt={testimonial.author} />
                  </div>
                  <div className="author-info">
                    <h4>{testimonial.author}</h4>
                    <p>{testimonial.course}</p>
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
            <p className="section-subtitle">Our program is perfect for:</p>
          </motion.div>
          
          <motion.div 
            className="audience-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div 
              className="audience-card"
              variants={fadeInUp}
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
            >
              <div className="audience-icon">🎓</div>
              <h3>Students</h3>
              <p>Engineering, IT, and Management students looking to gain practical skills and enhance their resume</p>
              <ul className="audience-benefits">
                <li>Gain practical skills beyond classroom learning</li>
                <li>Build portfolio-worthy projects</li>
                <li>Improve internship and placement prospects</li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="audience-card"
              variants={fadeInUp}
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
            >
              <div className="audience-icon">💼</div>
              <h3>Professionals</h3>
              <p>Working professionals aiming to upskill or transition to in-demand technology domains</p>
              <ul className="audience-benefits">
                <li>Master cutting-edge technologies</li>
                <li>Add valuable credentials to your profile</li>
                <li>Prepare for new roles and responsibilities</li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="audience-card"
              variants={fadeInUp}
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
            >
              <div className="audience-icon">💡</div>
              <h3>Tech Enthusiasts</h3>
              <p>Anyone passionate about technology looking to build practical skills in trending domains</p>
              <ul className="audience-benefits">
                <li>Turn your passion into expertise</li>
                <li>Learn from industry practitioners</li>
                <li>Join a community of like-minded learners</li>
              </ul>
            </motion.div>
          </motion.div>
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
                  <h2>Enroll in <span className="gradient-text">Summer 2025</span></h2>
                  <p>
                    Register now to secure your spot in our premium summer training program.
                    Limited seats available for each batch!
                  </p>
                  
                  <div className="registration-features">
                    <div className="feature">
                      <div className="feature-check">✓</div>
                      <span>Early Bird Discount Available</span>
                    </div>
                    <div className="feature">
                      <div className="feature-check">✓</div>
                      <span>Flexible Payment Options</span>
                    </div>
                    <div className="feature">
                      <div className="feature-check">✓</div>
                      <span>Placement Assistance</span>
                    </div>
                    <div className="feature">
                      <div className="feature-check">✓</div>
                      <span>Lifetime Access to Course Materials</span>
                    </div>
                    <div className="feature">
                      <div className="feature-check">✓</div>
                      <span>Internship Opportunities for Top Performers</span>
                    </div>
                  </div>
                  
                  <div className="batch-info">
                    <h4>Upcoming Batches:</h4>
                    <div className="batch">
                      <div className="batch-date">June 1, 2025</div>
                      <div className="batch-status">Few Seats Left</div>
                    </div>
                    <div className="batch">
                      <div className="batch-date">June 15, 2025</div>
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
                      <label htmlFor="course">Interested Course</label>
                      <select
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="Web Development">Web Development</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                        <option value="Cloud Computing">Cloud Computing</option>
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
      
      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2>Frequently <span className="gradient-text">Asked Questions</span></h2>
            <p className="section-subtitle">Get answers to common questions about our summer training program</p>
          </motion.div>
          
          <div className="faq-grid">
            <motion.div 
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3>How long is the summer training program?</h3>
              <p>Most of our training programs run for 4-6 weeks, with flexible timing options to accommodate your schedule.</p>
            </motion.div>
            
            <motion.div 
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3>Do I need prior experience for these courses?</h3>
              <p>Most courses are designed for beginners, but having a basic understanding of programming concepts is helpful. Advanced courses may require specific prerequisites.</p>
            </motion.div>
            
            <motion.div 
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3>Is there any placement assistance after completion?</h3>
              <p>Yes, we provide placement assistance including resume building, interview preparation, and connections with our industry partners for internship and job opportunities.</p>
            </motion.div>
            
            <motion.div 
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3>Will I receive a certificate after completing the program?</h3>
              <p>Yes, all participants receive an industry-recognized certificate upon successful completion of the program and associated projects.</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
     </>
  );
};

export default SummerTraining;