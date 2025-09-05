import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { HOME_ABOUT_SECTION } from "../../Constants/index.js";
import "./HomeAboutSection.css";

const HomeAboutSection = () => {
  const [counts, setCounts] = useState(HOME_ABOUT_SECTION.COUNTERS.map(() => 0));
  const sectionRef = useRef(null);
  const hasStarted = useRef(false);
  const controls = useAnimation();
  
  // Improved counter animation using spring physics
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
          
          if (!hasStarted.current) {
            hasStarted.current = true;
            startCounting();
          }
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [controls]);

  const startCounting = () => {
    HOME_ABOUT_SECTION.COUNTERS.forEach((counter, index) => {
      const duration = 2000; // Faster animation
      const fps = 60;
      const totalFrames = duration / (1000 / fps);
      let frame = 0;
      
      // Easing function for more natural counting effect
      const easeOutQuart = t => 1 - Math.pow(1 - t, 4);
      
      const animate = () => {
        if (frame < totalFrames) {
          frame++;
          const progress = easeOutQuart(frame / totalFrames);
          const currentCount = Math.round(counter.TARGET * progress);
          
          setCounts(prev => 
            prev.map((value, i) => i === index ? currentCount : value)
          );
          
          requestAnimationFrame(animate);
        }
      };
      
      setTimeout(() => requestAnimationFrame(animate), index * 150);
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const fadeInUpVariant = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }
    }
  };
  
  const fadeInLeftVariant = {
    hidden: { x: -60, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }
    }
  };

  const textRevealVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="about-section" ref={sectionRef}>
      <div className="about-background-elements">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-dots"></div>
      </div>
    
      <div className="container">
        <motion.div 
          className="about-container"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="row align-items-center">
            <div className="col-lg-6">
              <motion.div className="about-content" variants={fadeInLeftVariant}>
                <motion.span className="about-subtitle" variants={textRevealVariant}>
                  About Us
                </motion.span>
                
                <motion.h2 className="about-title" variants={textRevealVariant}>
                  {HOME_ABOUT_SECTION.HEADING}
                </motion.h2>
                
                <motion.div className="title-separator" variants={textRevealVariant}></motion.div>
                
                <motion.p className="about-description" variants={textRevealVariant}>
                  {HOME_ABOUT_SECTION.DESCRIPTION}
                </motion.p>
                
                <motion.div className="about-counters" variants={fadeInUpVariant}>
                  {HOME_ABOUT_SECTION.COUNTERS.map((counter, index) => (
                    <motion.div 
                      className="counter-item"
                      key={counter.ID}
                   
                      whileHover={{ 
                        y: -8, 
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                        transition: { duration: 0.3 }
                      }}
                    >
                      <div className="counter-icon">
                        {counter.ICON && counter.ICON}
                        {!counter.ICON && <div className="counter-default-icon"></div>}
                      </div>
                      <div className="counter-content">
                        <span className="counter-number">
                          <span className="counter-value">{counts[index].toLocaleString()}+</span>
                          {counter.SUFFIX && <span className="counter-suffix">{counter.SUFFIX}</span>}
                        </span>
                        <span className="counter-label">{counter.LABEL}</span>
                      </div> 
                    </motion.div>
                  ))}
                </motion.div>
                
                <motion.div className="about-buttons" variants={fadeInUpVariant}>
                  <a href="/about" className="btn btn-primary">
                    Learn More
                    <span className="btn-icon">→</span>
                  </a>
                  <a href="/contact" className="btn btn-outline">
                    Contact Us
                  </a>
                </motion.div>
              </motion.div>
            </div>
            
            <div className="col-lg-6">
              <motion.div 
                className="about-image-container"
                variants={fadeInUpVariant}
              >
                <div className="image-pattern"></div>
                <motion.div 
                  className="about-image"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.5 }}
                >
                  <img 
                    src={HOME_ABOUT_SECTION.IMAGE_SRC} 
                    alt={HOME_ABOUT_SECTION.IMAGE_ALT} 
                    className="main-image"
                  />
                </motion.div>
                
                <motion.div 
                  className="experience-badge"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                >
                  <span className="years">5+</span>
                  <span className="text">Years of Experience</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeAboutSection;