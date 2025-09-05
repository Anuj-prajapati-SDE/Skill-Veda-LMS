import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_SECTIONS } from '../../Constants/index.js';
import './HomeBannerSection.css';

const HomeBannerSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const autoPlayRef = useRef(null);
  const bannerRef = useRef(null);

  // Handle auto rotation
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 6000); // Slightly longer duration for better reading time
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [activeIndex, isAutoPlaying]);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % HERO_SECTIONS.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + HERO_SECTIONS.length) % HERO_SECTIONS.length);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  // Pause on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      nextSlide();
    }

    if (touchStart - touchEnd < -100) {
      prevSlide();
    }
    
    // Resume auto-play after user interaction
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  // Slide animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.2,
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    })
  };

  // Direction for slide animations
  const [[direction], setDirection] = useState([1]);

  // Custom handler to track animation direction
  const handleNext = () => {
    setDirection([1]);
    nextSlide();
  };

  const handlePrev = () => {
    setDirection([-1]);
    prevSlide();
  };

  return (
    <section 
      className="hero-banner-section"
      ref={bannerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="hero-background">
        <div className="hero-shape hero-shape-1"></div>
        <div className="hero-shape hero-shape-2"></div>
        <div className="hero-shape hero-shape-3"></div>
        <div className="hero-dots"></div>
      </div>

      <div className="container">
        <div className="hero-carousel">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div 
              key={activeIndex}
              className="hero-slide"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 }
              }}
            >
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="hero-content">
                    <motion.span 
                      className="hero-subtitle"
                      custom={0}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {HERO_SECTIONS[activeIndex].SUBTITLE || "Welcome to SkillVedaa"}
                    </motion.span>
                    
                    <motion.h1 
                      className="hero-title"
                      custom={1}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {HERO_SECTIONS[activeIndex].HEADING.split(' ')[0]}{' '}
                      <span className="highlight">{HERO_SECTIONS[activeIndex].HEADING.split(' ').slice(1).join(' ')}</span>
                    </motion.h1>
                
                    <motion.p 
                      className="hero-description"
                      custom={2}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {HERO_SECTIONS[activeIndex].SUBHEADING}
                    </motion.p>
                    
                    <motion.div 
                      className="hero-buttons"
                      custom={3}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <a href="/courses" className="btn-primary">
                        {HERO_SECTIONS[activeIndex].BUTTON_TEXT}
                        <span className="btn-arrow">→</span>
                      </a>
                      <a href="/contact" className="btn-secondary">
                        Contact Us
                      </a>
                    </motion.div>
                  </div>
                </div>
                
                <div className="col-lg-6">
                  <motion.div 
                    className="hero-image-container"
                    custom={2}
                    variants={textVariants}
                    
                    animate="visible"
                  >
                    <div className="image-backdrop"></div>
                    <img 
                      src={HERO_SECTIONS[activeIndex].IMAGE_SRC} 
                      alt={HERO_SECTIONS[activeIndex].IMAGE_ALT} 
                      className="hero-image"
                    />
                    
                    {/* <div className="hero-features">
                      <div className="feature-item">
                        <div className="feature-icon">✓</div>
                        <div className="feature-text">Expert Instructors</div>
                      </div>
                      <div className="feature-item">
                        <div className="feature-icon">✓</div>
                        <div className="feature-text">Job Ready Skills</div>
                      </div>
                      <div className="feature-item">
                        <div className="feature-icon">✓</div>
                        <div className="feature-text">Industry Projects</div>
                      </div>
                    </div> */}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation Controls */}
          <div className="hero-controls">
            <button 
              className="nav-button prev-button" 
              onClick={handlePrev}
              aria-label="Previous slide"
            >
              <i className="ri-arrow-left-wide-line"></i>
            </button>
            
            <div className="slide-indicators">
              {HERO_SECTIONS.map((_, index) => (
                <button
                  key={index}
                  className={`indicator-dot ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
            
            <button 
              className="nav-button next-button" 
              onClick={handleNext}
              aria-label="Next slide"
            >
              <i className="ri-arrow-right-wide-line"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div className="hero-bottom-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="1" d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,165.3C672,192,768,224,864,229.3C960,235,1056,213,1152,192C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HomeBannerSection;