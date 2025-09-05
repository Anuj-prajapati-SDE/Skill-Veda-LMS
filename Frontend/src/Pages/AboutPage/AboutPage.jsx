import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import AboutImage from "../../assets/img/About.webp"; 
import "./AboutPage.css";
import { FaQuoteLeft, FaLinkedin, FaTwitter } from "react-icons/fa";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState("legacy");
  const galleryRef = useRef(null);
  const isGalleryInView = useInView(galleryRef, { once: false, amount: 0.2 });
  
  // Parallax effect for header
  const { scrollYProgress } = useScroll();
  const headerY = useTransform(scrollYProgress, [0, 0.5], [0, -150]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const aboutData = {
    title: '',
    tagline: 'Empowering Careers, Transforming Futures',
    description:
      'SkillVedaa, a unit of Morling Global Pvt Ltd., is a premier upskilling and training platform with over 14 years of excellence in the training and placement domain. Founded by a group of visionary engineers, we are committed to bridging the skill gap and empowering individuals with industry-aligned learning solutions.',
    legacy: {
      title: 'Our Legacy & Expertise',
      icon: '🚀',
      content:
        'With vast experience in training, workforce development, and career placement, we have successfully guided thousands of professionals toward rewarding careers. Our programs are designed to meet evolving industry standards, ensuring learners gain job-ready skills and practical expertise.',
      stats: [
        { value: "14+", label: "Years of Excellence" },
        { value: "10K+", label: "Careers Transformed" },
        { value: "95%", label: "Placement Rate" },
      ]
    },
    reach: {
      title: 'Our Reach & Presence',
      icon: '🌍',
      content:
        'Headquartered in Noida, we operate PAN India, catering to the diverse upskilling needs of students, professionals, and corporate teams across the country.',
      stats: [
        { value: "25+", label: "Cities Covered" },
        { value: "100+", label: "Corporate Partners" },
        { value: "5", label: "Training Centers" },
      ]
    },
    vision: {
      title: 'Our Vision',
      icon: '🌟',
      content:
        'To become a leading global learning platform that empowers individuals with future-ready skills, fosters innovation, and enhances employability by aligning with industry standards and emerging trends.',
    },
    mission: {
      title: 'Our Mission',
      icon: '🎯',
      points: [ 
        'Bridge the Skill Gap – Deliver industry-aligned training programs that equip learners with practical and in-demand skills.',
        'Enhance Employability – Provide quality education, certification, and career support to help individuals secure meaningful job opportunities.',
        'Foster Innovation & Growth – Create a dynamic learning ecosystem that encourages continuous professional development.',
        'Ensure Nationwide Impact – Expand our reach to impact students, professionals, and corporates across India and beyond.',
      ],
    },
    leadership: [
      {
        name: 'Anand Pandey',
        designation: 'Co-Founder & Technical Head',
        experience: '15+ years of experience in the technical domain',
        qualification: 'M.Tech with expertise in cutting-edge technologies and innovation',
        passion: 'Passionate about tech-driven education and fostering industry-ready professionals',
        quote: "Technology education should adapt as fast as technology evolves. That's our commitment at SkillVedaa.",
        social: {
          linkedin: "#",
          twitter: "#"
        }
      },
      {
        name: 'Binit Kumar',
        designation: 'Co-Founder & Operations Head',
        experience: '14+ years of experience in training and placement',
        qualification: 'Expertise in workforce development and corporate training',
        passion: 'Dedicated to bridging the gap between education and industry requirements',
        quote: "Our success is measured by the career growth of our students. Their achievements drive our mission forward.",
        social: {
          linkedin: "#",
          twitter: "#"
        }
      },
    ],
    gallery: [
      { id: 90, title: "Training Workshop", description: "Advanced technical training session in our Noida center" },
      { id: 95, title: "Corporate Partnership", description: "Signing ceremony with our latest industry partner" },
      { id: 151, title: "Student Achievements", description: "Celebrating our students' placement success" },
      { id: 80, title: "Campus Recruitment", description: "Onsite recruitment drive with tech leaders" },
      { id: 90, title: "Innovation Lab", description: "Students working on cutting-edge projects" },
      { id: 555, title: "Graduation Day", description: "Celebrating completion of professional certification" },
    ]
  };

  // Custom scroll progress indicator
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="premium-about-page">
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress-container">
        <div 
          className="scroll-progress-bar" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
      
      <Navbar />
      <Breadcrumb courseImage={AboutImage} />

      {/* Hero Section with Parallax */}
      <motion.section 
        className="about-hero" 
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <div className="hero-content">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About <span className="gradient-text">SkillVedaa</span>
          </motion.h1>
          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {aboutData.tagline}
          </motion.p>
          <motion.div 
            className="hero-separator"
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ duration: 1, delay: 0.6 }}
          ></motion.div>
          <motion.p
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {aboutData.description}
          </motion.p>
        </div>
        {/* <div className="hero-backdrop"></div> */}
      </motion.section>

      {/* Feature Cards with Statistics */}
      <section className="about-features">
        <div className="container">
          <div className="features-tabs">
            <button 
              className={`tab-button ${activeTab === "legacy" ? "active" : ""}`}
              onClick={() => setActiveTab("legacy")}
            >
              <span className="tab-icon">{aboutData.legacy.icon}</span>
              <span>Legacy</span>
            </button>
            <button 
              className={`tab-button ${activeTab === "reach" ? "active" : ""}`}
              onClick={() => setActiveTab("reach")}
            >
              <span className="tab-icon">{aboutData.reach.icon}</span>
              <span>Reach</span>
            </button>
            <button 
              className={`tab-button ${activeTab === "vision" ? "active" : ""}`}
              onClick={() => setActiveTab("vision")}
            >
              <span className="tab-icon">{aboutData.vision.icon}</span>
              <span>Vision</span>
            </button>
            <button 
              className={`tab-button ${activeTab === "mission" ? "active" : ""}`}
              onClick={() => setActiveTab("mission")}
            >
              <span className="tab-icon">{aboutData.mission.icon}</span>
              <span>Mission</span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "legacy" && (
              <motion.div 
                className="feature-content-wrapper"
                key="legacy"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="feature-content">
                  <h2 className="gradient-text">{aboutData.legacy.title}</h2>
                  <p>{aboutData.legacy.content}</p>
                  
                  <div className="stats-container">
                    {aboutData.legacy.stats.map((stat, index) => (
                      <motion.div 
                        className="stat-item"
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="feature-decoration legacy-decoration"></div>
              </motion.div>
            )}
            
            {activeTab === "reach" && (
              <motion.div 
                className="feature-content-wrapper"
                key="reach"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="feature-content">
                  <h2 className="gradient-text">{aboutData.reach.title}</h2>
                  <p>{aboutData.reach.content}</p>
                  
                  <div className="stats-container">
                    {aboutData.reach.stats.map((stat, index) => (
                      <motion.div 
                        className="stat-item"
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="feature-decoration reach-decoration"></div>
              </motion.div>
            )}
            
            {activeTab === "vision" && (
              <motion.div 
                className="feature-content-wrapper"
                key="vision"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="feature-content">
                  <h2 className="gradient-text">{aboutData.vision.title}</h2>
                  <p>{aboutData.vision.content}</p>
                  
                  <div className="vision-illustration">
                    <div className="vision-circles">
                      <div className="vision-circle c1"></div>
                      <div className="vision-circle c2"></div>
                      <div className="vision-circle c3"></div>
                    </div>
                  </div>
                </div>
                <div className="feature-decoration vision-decoration"></div>
              </motion.div>
            )}
            
            {activeTab === "mission" && (
              <motion.div 
                className="feature-content-wrapper"
                key="mission"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="feature-content">
                  <h2 className="gradient-text">{aboutData.mission.title}</h2>
                  
                  <ul className="mission-list">
                    {aboutData.mission.points.map((point, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="mission-point-icon"></div>
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="feature-decoration mission-decoration"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Leadership Section */} 
      <section className="leadership-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Leadership <span className="gradient-text">Team</span></h2>
            <div className="section-subtitle">The Visionaries Behind SkillVedaa</div>
          </motion.div>

          <div className="leadership-grid">
            {aboutData.leadership.map((leader, index) => (
              <motion.div 
                className="leader-card"
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="leader-card-inner">
                  <div className="leader-photo-wrapper">
                    <div className="leader-photo">
                      <div className="leader-initials">{leader.name.split(' ').map(n => n[0]).join('')}</div>
                    </div>
                    <div className="leader-social">
                      <a href={leader.social.linkedin} aria-label="LinkedIn profile">
                        <FaLinkedin />
                      </a>
                      <a href={leader.social.twitter} aria-label="Twitter profile">
                        <FaTwitter />
                      </a>
                    </div>
                  </div>
                  
                  <div className="leader-info">
                    <h3>{leader.name}</h3>
                    <div className="leader-designation">{leader.designation}</div>
                    
                    <div className="leader-quote">
                      <FaQuoteLeft className="quote-icon" />
                      <p>{leader.quote}</p>
                    </div>
                    
                    <div className="leader-details">
                      <div className="leader-detail">
                        <div className="detail-dot"></div>
                        <p>{leader.experience}</p>
                      </div>
                      <div className="leader-detail">
                        <div className="detail-dot"></div>
                        <p>{leader.qualification}</p>
                      </div>
                      <div className="leader-detail">
                        <div className="detail-dot"></div>
                        <p>{leader.passion}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section" ref={galleryRef}>
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Our <span className="gradient-text">Gallery</span></h2>
            <div className="section-subtitle">Glimpses of Excellence</div>
          </motion.div>

          <div className="gallery-grid">
            {aboutData.gallery.map((item, index) => (
              <motion.div 
                className="gallery-item"
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isGalleryInView ? { 
                  opacity: 1, 
                  scale: 1,
                  transition: { duration: 0.5, delay: index * 0.1 }
                } : {}}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="gallery-image-wrapper">
                  <img 
                    src={`https://picsum.photos/id/${item.id}/800/600`} 
                    alt={item.title}
                    className="gallery-image"
                  />
                  <div className="gallery-overlay">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="gallery-view-button">
                      <span>View Details</span>
                      <HiOutlineArrowNarrowRight className="arrow-icon" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;