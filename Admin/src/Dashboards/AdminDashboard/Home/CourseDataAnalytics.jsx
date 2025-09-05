import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CourseDataAnalytics.css";

const CourseDataAnalytics = () => {
  const apiUrl = import.meta.env.VITE_Backend_URL;
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/admin/getcourses`);
        setCourses(response.data);
      } catch (err) {
        setError("Failed to fetch course data");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Filter courses based on search term
  const filteredPublishedCourses = courses.filter(
    (course) =>
      course.publish &&
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUnpublishedCourses = courses.filter(
    (course) =>
      !course.publish &&
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="course-analytics-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {/* Published Courses */}
          <div className="student-data-header">
            <button type="button" className="btn btn-success">
              Published Courses
            </button>
            <div className="student-analytics-searchbar">
              <input
                type="text"
                placeholder="Search courses..."
                className="admin-search-input"
                value={searchTerm} // Bind search term to input value
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
              />
              <button className="logout-icon bg-green responsive-button">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Course Name</th>
                <th>No. of Students Enrolled</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {filteredPublishedCourses.map((course, index) => (
                // Use filteredPublishedCourses here
                <tr key={course.courseId}>
                  <th scope="row">{index + 1}</th>
                  <td>{course.name}</td>
                  <td>
                    {course.enrolledStudents
                      ? course.enrolledStudents.length
                      : 0}
                  </td>
                  <td>{new Date(course.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(course.updatedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Unpublished Courses */}
          <button type="button" className="btn btn-danger">
            Unpublished Courses
          </button>
          <table style={{ marginTop: "10px" }} className="table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Course Name</th>
                <th>No. of Students Enrolled</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {filteredUnpublishedCourses.map((course, index) => (
                // Use filteredUnpublishedCourses here
                <tr key={course.courseId}>
                  <th scope="row">{index + 1}</th>
                  <td>{course.name}</td>
                  <td>
                    {course.enrolledStudents
                      ? course.enrolledStudents.length
                      : 0}
                  </td>
                  <td>{new Date(course.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(course.updatedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CourseDataAnalytics;
