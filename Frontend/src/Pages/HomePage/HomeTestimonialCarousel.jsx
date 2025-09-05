import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LeftDesignImg from '../../assets/img/shape/5.png';
import './HomeTestimonialCarousel.css';

const HomeTestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);
  const carouselRef = useRef(null);

  // Enhanced testimonials with more realistic content and better images
  const testimonials = [
    {
      text: "The course structure and mentoring at SkillVedaa transformed my career path. I went from struggling with coding basics to confidently building full-stack applications in just 3 months. The hands-on projects were particularly valuable for my portfolio.",
      name: "Priya Sharma",
      role: "Full Stack Developer",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5
    },
    {
      text: "What sets SkillVedaa apart is their personalized approach to teaching. The instructors took time to understand my learning style and career goals, then tailored their guidance accordingly. Their placement assistance helped me land a job at a top tech company.",
      name: "Rahul Khanna",
      role: "UI/UX Designer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4.5
    },
    {
      text: "As someone transitioning from a non-technical background, I was worried about keeping up, but SkillVedaa's step-by-step curriculum made the journey manageable and enjoyable. The community support from fellow learners was an unexpected bonus.",
      name: "Ananya Patel",
      role: "Data Analyst",
      image: "https://randomuser.me/api/portraits/women/66.jpg",
      rating: 5
    },
    {
      text: "The practical industry projects at SkillVedaa gave me real-world experience that immediately impressed interviewers. Within weeks of completing the program, I received multiple job offers with salary packages exceeding my expectations.",
      name: "Vikram Singh",
      role: "Cloud Engineer",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      rating: 4.5
    }
  ];

  // Determine slides to show based on screen width
  const getSlidesToShow = () => {
    if (window.innerWidth < 768) {
      return 1;
    } else if (window.innerWidth < 1200) {
      return 2;
    }
    return 3;
  };

  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());

  // Update slides to show on window resize
  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(getSlidesToShow());
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [currentIndex, isAutoPlaying]);

  // Navigation functions
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - slidesToShow ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - slidesToShow : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
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
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Generate star ratings
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }

    return stars;
  };

  return (
    <section className="testimonial-section">
      {/* Background Shape */}
      <div className="background-shape">
        <img src={LeftDesignImg} alt="Design Element" className="left-shape" />
        <div className="circle-shape"></div>
        <div className="dots-pattern"></div>
      </div>

      <div className="container">
        {/* Section Heading */}
        <motion.div 
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="subtitle" style={{fontSize:"2rem", fontWeight:"600"}}>Testimonials</span>
          <h2 className="section-title">
            What People Say About <span className="highlight">Our Quality</span>
          </h2>
          <div className="title-separator"></div>
        </motion.div>

        {/* Testimonial Carousel */}
        <div 
          className="testimonial-carousel-container"
          ref={carouselRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div 
            className="testimonial-track"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
              width: `${(testimonials.length * 100) / slidesToShow}%`
            }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index} 
                className="testimonial-slide"
                style={{ width: `${100 / testimonials.length}%` }}
                initial={{ scale: 0.9, opacity: 0.8 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="testimonial-card">
                  <div className="quote-icon">
                    <i className="fa-solid fa-quote-right"></i>
                  </div>
                  <div className="testimonial-content">
                    <p>{testimonial.text}</p>
                    <div className="rating">
                      {renderRatingStars(testimonial.rating)}
                    </div>
                  </div>
                  <div className="testimonial-author">
                    <div className="author-image">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                    <div className="author-info">
                      <h4>{testimonial.name}</h4>
                      <span>{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation Controls */}
          <div className="carousel-controls">
            <button 
              className="nav-button prev-button" 
              onClick={prevSlide}
              aria-label="Previous testimonial"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <div className="carousel-indicators">
              {Array.from({ length: testimonials.length - slidesToShow + 1 }).map((_, index) => (
                <button
                  key={index}
                  className={`indicator-dot ${currentIndex === index ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
            
            <button 
              className="nav-button next-button" 
              onClick={nextSlide}
              aria-label="Next testimonial"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="testimonial-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 style={{color:"white"}}>Ready to transform your career?</h3>
          <p>Join thousands of satisfied students who have taken the next step in their professional journey</p>
          <a href="/courses" className="cta-button">
            Explore Our Courses
            <i className="fas fa-arrow-right"></i>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeTestimonialCarousel;