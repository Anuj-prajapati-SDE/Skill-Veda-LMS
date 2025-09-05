import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import placeholder_600 from '../../assets/img/800x600.png';
import placeholder_100 from '../../assets/img/100x100.png';

const HomeCoursesSection = () => {
  const apiUrl = import.meta.env.VITE_Backend_URL;
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/admin/getPublishedCourses`);
      const sortedCourses = response.data.sort((a, b) => b.rating - a.rating);
      setCourses(sortedCourses);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      setCourses([]);
    }
  };

  const placeholderCourses = [
    {
      _id: 1,
      image: placeholder_600,
      duration: 'Lifetime',
      enrolledStudents: [],
      advisorImage: placeholder_100,
      advisorName: 'N/A',
      category: 'N/A',
      rating: 0,
      reviews: 0,
      fees: 'Free',
      name: 'No Course Available',
    },
  ];

  const displayedCourses = courses.length > 0 ? courses.slice(0, 3) : placeholderCourses;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="courses-area default-padding bottom-less"
    >
      <div className="container">
        <div className="heading-left">
          <div className="row">
            <div className="col-lg-5">
              <h5>Popular Courses</h5>
              <h2>Our Most Popular & Trending Online Courses</h2>
            </div>
            <div className="col-lg-6 offset-lg-1">
              <p>
                Explore our most popular courses, curated to help you master new skills and advance your career.
              </p>
              <Link className="btn btn-md btn-dark border" to="/courses">
                View All <i className="fas fa-plus" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="courses-items">
          <div className="row">
            {displayedCourses.map((course, index) => (
              <motion.div
                key={course._id}
                className="single-item col-lg-4 col-md-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8, ease: 'easeOut' }}
              >
                <div className="item">
                  <div className="thumb">
                    <img
                      src={course.image}
                      alt={course.name}
                      style={{ width: '378.4px', height: '226.3px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                  </div>
                  <div className="info">
                    <h4>
                      <Link to={`/coursesdetails/${course._id}`}>{course.name}</Link>
                    </h4>
                    <p>{course.description ? `${course.description.substring(0, 100)}...` : 'No description available'}</p>
                    <div className="price-rating">
                      <div className="rating">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fas ${i < course.rating ? 'fa-star' : 'fa-star-o'}`}
                          />
                        ))}
                        <span>({course.rating || 0})</span>
                      </div>
                      <div className="price">{course.fees === 0 ? 'Free' : `₹ ${course.fees}`}</div>
                    </div>
                    <div className="bottom">
                      <ul>
                        <li>
                          <i className="fas fa-user" /> {course.enrolledStudents.length || '0'} Students
                        </li>
                      </ul>
                      <Link to={`/coursesdetails/${course._id}`} className="btn btn-sm btn-dark border">
                        {course.fees === 0 ? 'Get Enrolled' : 'Enroll Now'}
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomeCoursesSection;
