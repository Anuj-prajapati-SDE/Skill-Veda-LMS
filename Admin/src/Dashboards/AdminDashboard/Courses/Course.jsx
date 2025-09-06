import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../Courses/Course.css";
import { Link } from "react-router-dom";
import CourseEdit from "./CourseEdit";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Course = () => {
  const apiUrl = import.meta.env.VITE_Backend_URL;
  const [courses, setCourses] = useState([]);
  const [originalCourses, setOriginalCourses] = useState([]); // Store original courses
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editCourseId, setEditCourseId] = useState(null);
  const [newCourseData, setNewCourseData] = useState({
    name: "",
    description: "",
    fees: "",
    duration: "",
    image: null,
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  const notifyA = (e) => toast.success(e);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowModal(false);
    notifyA("Logged Out Successfully");
    navigate("/"); // Redirect to home
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/admin/getcourses`);
      setCourses(response.data);
      console.log(response.data);
      setOriginalCourses(response.data); // Store a copy in originalCourses
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourseData({ ...newCourseData, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewCourseData({ ...newCourseData, image: e.target.files[0] });
  };

  const handleSubmitCourse = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newCourseData.name);
    formData.append("description", newCourseData.description);
    formData.append("fees", newCourseData.fees);
    formData.append("duration", newCourseData.duration);
    formData.append("image", newCourseData.image);

    try {
      const response = await axios.post(
        `${apiUrl}api/admin/createcourses`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Course created:", response.data);
      fetchCourses();

      setNewCourseData({
        name: "",
        description: "",
        fees: "",
        duration: "",
        image: null,
      });
      setIsCreatingCourse(false);
    } catch (error) {
      console.error("Failed to create course:", error.response?.data || error);
    }
  };

  const handleEditCourse = (courseId) => {
    setEditCourseId(courseId);
    setIsEditing(true);
  };

  const handleBackToCourses = () => {
    setIsEditing(false);
    setEditCourseId(null);
  };

  // Handle search input changes
  const handleSearch = () => {
    const searchTerm = searchInputRef.current.value.toLowerCase();
    const filteredCourses = originalCourses.filter((course) =>
      course.name.toLowerCase().includes(searchTerm)
    );
    setCourses(filteredCourses);
  };

  return (
    <div className="admin-course-container">
      <div className="admin-courses-header">
        <h2>Courses </h2>
        <div className="admin-search-bar">
          <input
            type="text"
            placeholder="What do you want to learn?"
            className="admin-search-input"
            ref={searchInputRef} // Add ref for search input
            onChange={handleSearch} // Call handleSearch on input change
          />
          <button className="logout-icon bg-green">
            <i class="fas fa-search"></i>
          </button>
          <Link className="logout-icon" to="/">
            <i className="ri-home-9-line"></i>
          </Link>
          <div>
            <Link
              to={"/"}
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
              className="logout-icon"
            >
              <i className="ri-logout-circle-r-line"></i>
            </Link>

            <div
              className={`modal fade ${showModal ? "show d-block" : ""}`}
              tabIndex="-1"
              role="dialog"
              style={{ background: "rgba(0,0,0,0.5)" }}
            >
              <div
                className="modal-dialog"
                role="document"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "100vh",
                }}
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirm Logout</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={() => setShowModal(false)}
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>Are you sure you want to log out?</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="secondary-button"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="primary-button red"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isEditing ? (
        <>
          {isCreatingCourse && (
            <div className="course-form">
              <div className="popup-content">
                <span
                  className="close-button"
                  onClick={() => setIsCreatingCourse(false)}
                >
                  &times;
                </span>
                <h3>Create New Course</h3>
                <form onSubmit={handleSubmitCourse} className="course-form">
                  <div className="form-group">
                    <label htmlFor="image">Course Image:</label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleImageChange}
                      className="image-input"
                      required
                    />
                  </div>
                  {newCourseData.image && ( // Display the image if it exists
                    <img
                      src={URL.createObjectURL(newCourseData.image)}
                      alt={newCourseData.name}
                      className="preview-image"
                    />
                  )}

                  <div className="form-group">
                    <label htmlFor="name">Course Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newCourseData.name}
                      onChange={handleInputChange}
                      className="text-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                      id="description"
                      name="description"
                      value={newCourseData.description}
                      onChange={handleInputChange}
                      className="textarea-input"
                      rows="4"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="fees">Fees:</label>
                    <input
                      type="number"
                      id="fees"
                      name="fees"
                      value={newCourseData.fees}
                      onChange={handleInputChange}
                      className="text-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="duration">Duration:</label>
                    <input
                      type="text"
                      id="duration"
                      name="duration"
                      value={newCourseData.duration}
                      onChange={handleInputChange}
                      className="text-input"
                      required
                    />
                  </div>

                  <button type="submit" className="submit-button">
                    Create Course
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="admin-created-courses-container">
            <div className="adding-courses">
              <p style={{ marginBottom: "0" }}>
                Add new courses by clicking this button
              </p>
              <button
                onClick={() => setIsCreatingCourse(true)}
                className="primary-button"
              >
                Add Course
              </button>
            </div>
            <div className="courses-list">
              {courses.map((course) => (
                <div key={course._id} className="course-item">
                  {course.image && (
                    <img
                      src={course.image}
                      alt={course.name}
                      className="course-image"
                    />
                  )}
                  <div className="course-details">
                    <div className="course-title">
                      <h4>{course.name}</h4>
                      <p>{course.fees === 0 ? "Free" : `₹${course.fees}`}</p>
                    </div>
                    <p className="course-duration">
                      {" "}
                      <span>{course.duration}</span>
                    </p>
                    <p className="description">{course.description}</p>

                    <button
                      onClick={() => handleEditCourse(course._id)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <CourseEdit courseId={editCourseId} onBack={handleBackToCourses} />
      )}
    </div>
  );
};

export default Course;
