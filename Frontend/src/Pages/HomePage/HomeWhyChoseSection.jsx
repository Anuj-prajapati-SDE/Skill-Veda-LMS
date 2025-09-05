import React, { useRef } from 'react';
import { WHY_CHOOSE_US } from '../../Constants/index';
import { color, motion, useScroll, useTransform } from 'framer-motion';
import './HomeWhyChooseSection.css';

const HomeWhyChooseSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacitySection = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  
  // Animation variants
  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  };
  
  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const featureVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  };
  
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  };

  return (
    <section className="why-choose-section" ref={sectionRef}>
      <motion.div className="background-shapes" style={{ y: backgroundY, opacity: opacitySection }}>
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape-dots"></div>
      </motion.div>

      <div className="container">
        <motion.div 
          className="section-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headingVariants}
        >
          <span className="subheading">{WHY_CHOOSE_US.HEADING}</span>
          <h2 className="heading">
            {WHY_CHOOSE_US.SUBHEADING.split(' ').slice(0, 4).join(' ')} <br />
            <span className="highlight">{WHY_CHOOSE_US.SUBHEADING.split(' ').slice(4).join(' ')}</span>
          </h2>
          <div className="heading-separator"></div>
        </motion.div>
        
        <motion.div 
          className="intro-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
        >
          <div className="intro-card-content">
            <div className="intro-icon">🚀</div>
            <h3>Upgrade Your Skills, Unlock New Opportunities</h3>
            <p>At SkillVedaa (A Unit of Morling Global Pvt Ltd.), we empower individuals and professionals with top-notch learning resources to enhance their careers. Whether you're looking to advance in your current role, switch industries, or gain expertise in a new domain, we have everything you need to upskill effectively.</p>
          </div>
        </motion.div>
        
        <div className="content-wrapper">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <motion.div 
                className="media-container"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={imageVariants}
              >
                <div className="image-wrapper">
                  <div className="image-bg-pattern"></div>
                  <img 
                    src={WHY_CHOOSE_US.IMAGE_SRC} 
                    alt={WHY_CHOOSE_US.IMAGE_ALT} 
                    className="featured-image"
                  />
                  <a
                    href={WHY_CHOOSE_US.VIDEO_LINK}
                    className="video-play-button"
                    aria-label="Play introduction video"
                  >
                    <span className="play-icon">
                      <i className={WHY_CHOOSE_US.VIDEO_ICON_CLASS}></i>
                    </span>
                    <span className="pulse-ring"></span>
                  </a>
                </div>
                
                <motion.div 
                  className="experience-badge"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                >
                  <span className="exp-number">10+</span>
                  <span className="exp-text">Years of Excellence</span>
                </motion.div>
              </motion.div>
            </div>
            
            <div className="col-lg-7">
              <motion.div 
                className="features-grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={staggerContainerVariants}
              >
                <div className="row">
                  {WHY_CHOOSE_US.FEATURES.map((feature, index) => (
                    <div className="col-md-6" key={index}>
                      <motion.div 
                        className="feature-card"
                        variants={featureVariants}
                        whileHover={{ 
                          y: -8, 
                          boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                          transition: { duration: 0.3 }
                        }}
                      >
                        <div className="feature-number">{feature.NUMBER}</div>
                        <div className="feature-icon">
                          <i className={feature.ICON_CLASS}></i>
                        </div>
                        <h4>{feature.TITLE}</h4>
                        <div className="feature-description">
                          {feature.DESCRIPTION.map((desc, idx) => (
                            <p key={idx}>{desc}</p>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        <motion.div 
          className="cta-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
        >
          <div className="cta-content">
            <div className="cta-icon">🔥</div>
            <h3  style={{color:"white"}}>Start Your Upskilling with SkillVedaa Today!</h3>
            <p>Don't wait—invest in your future now. Explore our courses and take the next step in your professional journey.</p>
            <div className="cta-buttons">
              <a href="/courses" className="btn-primary">
                Explore Courses
                <span className="btn-arrow">→</span>
              </a>
              <a href="/contact" className="btn-secondary">Contact Us</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeWhyChooseSection;