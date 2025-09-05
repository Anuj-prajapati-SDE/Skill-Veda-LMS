import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StudentDataAnalytics.css";

const StudentDataAnalytics = () => {
  const apiUrl = import.meta.env.VITE_Backend_URL;
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState({});
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/admin/latestStudents`);
        setStudents(response.data.students);
      } catch (err) {
        setError("Failed to fetch student data");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/admin/getcourses`);
        const courseMap = {};
        response.data.forEach((course) => {
          courseMap[course._id] = course.name; // Store course ID -> Name mapping
        });
        setCourses(courseMap);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  // Fetch enrolled students
  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/admin/getLatestEnrolledStudents`
        );
        setEnrolledStudents(response.data.enrolledStudents);
      } catch (err) {
        console.error("Error fetching enrolled students:", err);
      }
    };

    fetchEnrolledStudents();
  }, []);

  // Filter students based on search term
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter enrolled students based on search term
  const filteredEnrolledStudents = enrolledStudents.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="student-analytics-container">
      <div className="student-data-header">
        Recent Student Joined
        <div className="student-analytics-searchbar">
          <input
            type="text"
            placeholder="Search students..."
            className="admin-search-input"
            value={searchTerm} // Bind search term to input value
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
          />
          <button className="logout-icon responsive-button bg-green">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
      <div className="table-1">
        <div className="table-responsive">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <table className="table table-hover table-borderless">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Interested Course</th>
                  <th>Time</th>
                  <th>Gender</th>
                  <th>Phone No</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {filteredStudents.map((student) => ( // Use filteredStudents here
                  <tr key={student._id}>
                    <td>
                      <span className="avatar">
                        <i className="fas fa-user"></i>
                      </span>
                      <a href="#">{student.name}</a>
                    </td>
                    <td>
                      {/* {courses[student.interestedCourses._id] || */}
                        "Unknown Course"
                    </td>
                    <td>{new Date(student.createdAt).toLocaleString()}</td>
                    <td>{student.gender}</td>
                    <td>{student.phoneNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <button type="button" className="btn btn-default">
        Recent Student Enrolled
      </button>
      <div className="table-1">
        <div className="table-responsive">
          {filteredEnrolledStudents.length === 0 ? ( // Use filteredEnrolledStudents here
            <p>No enrolled students found.</p>
          ) : (
            <table className="table table-hover table-borderless">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Course Name</th>
                  <th>Fees Status</th>
                  <th>Enrolled Time</th>
                  <th>Phone No</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {filteredEnrolledStudents.map((student, index) => ( // Use filteredEnrolledStudents here
                  <tr key={index}>
                    <td>
                      <span className="avatar">
                        <i className="fas fa-user"></i>
                      </span>
                      <a href="#">{student.name}</a>
                    </td>
                    <td>{student.courseName}</td>
                    <td>{student.feesStatus}</td>
                    <td>{new Date(student.enrolledTime).toLocaleString()}</td>
                    <td>{student.phoneNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDataAnalytics;
