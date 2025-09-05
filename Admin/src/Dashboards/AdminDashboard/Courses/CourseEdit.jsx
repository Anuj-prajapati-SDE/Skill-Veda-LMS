import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./CourseEdit.css"; // Custom styles
import BackButton from "../../../utilities/functions/BackButton";

const CourseEdit = ({ courseId, onBack }) => {
  const apiUrl = import.meta.env.VITE_Backend_URL;
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState({
    name: "",
    description: "",
    fees: "",
    duration: "",
    startDate: "",
    endDate: "",
    image: null,
    lectures: [],
  });

  const [singleLecture, setSingleLecture] = useState({
    lectureName: "",
    lectureDescription: "",
    lectureLink: "",
  });

  const [lectureList, setLectureList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [assignmentButton, setAssignmentButton] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  // Fetch course details
  const fetchCourseDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiUrl}/api/admin/getcourseById/${courseId}`
      );
      const data = response.data;

      // Format dates before setting state
      const formattedStartDate = data.startDate
        ? new Date(data.startDate).toISOString().slice(0, 10)
        : "";
      const formattedEndDate = data.endDate
        ? new Date(data.endDate).toISOString().slice(0, 10)
        : "";

      setCourseData({
        ...data,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
      setLectureList(response.data.lectures || []);
      // Fetch assignments
      const assignmentsResponse = await axios.get(
        `${apiUrl}/api/admin/${courseId}/assignments`
      );
      setAssignments(assignmentsResponse.data);
    } catch (error) {
      console.error("Failed to fetch course details:", error);
      toast.error("Error fetching course details.");
    } finally {
      setLoading(false);
    }
  };

  // Handle input change for course fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input for image
  const handleImageChange = (e) => {
    setCourseData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // Handle lecture input changes
  const handleLectureChange = (e) => {
    const { name, value } = e.target;
    setSingleLecture((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new lecture to the lecture list
  const addLecture = () => {
    if (
      !singleLecture.lectureName ||
      !singleLecture.lectureDescription ||
      !singleLecture.lectureLink
    ) {
      toast.error("Please fill in all fields before adding a lecture.");
      return;
    }
    setLectureList((prev) => [...prev, singleLecture]);
    setSingleLecture({
      lectureName: "",
      lectureDescription: "",
      lectureLink: "",
    });
  };

  // Save changes to the course
  const handleSaveChanges = async (e) => {
    console.log("Clicked");
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.keys(courseData).forEach((key) => {
      if (key === "lectures") {
        formData.append(key, JSON.stringify(lectureList));
      } else {
        formData.append(key, courseData[key]);
      }
    });

    console.log("Form data:", formData);

    try {
      await axios.put(`${apiUrl}/api/admin/editcourse/${courseId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Course updated successfully!");
    } catch (error) {
      console.error("Failed to update course:", error);
      toast.error("Error updating course.");
    } finally {
      setLoading(false);
    }
  };

  const togglePublishStatus = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${apiUrl}/api/admin/${courseId}/toggle-publish`
      );
      setCourseData((prev) => ({
        ...prev,
        publish: response.data.course.publish,
      }));
      toast.success(
        `Course ${response.data.course.publish ? "Published" : "Unpublished"
        } successfully!`
      );
    } catch (error) {
      console.error("Error toggling publish status:", error);
      toast.error("Failed to update publish status.");
    } finally {
      setLoading(false);
    }
  };

  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    submissionDate: "",
    submissionEndingDate: "",
    status: "Draft", // Default status
  });

  // Handle assignment input changes
  const handleAssignmentChange = (e) => {
    setNewAssignment((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Add a new assignment
  const handleAddAssignment = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/admin/${courseId}/assignments`,
        newAssignment
      );
      setAssignments((prev) => [...prev, response.data]);
      setNewAssignment({
        title: "",
        description: "",
        submissionDate: "",
        submissionEndingDate: "",
        status: "Draft", // Reset form fields
      });
      toast.success("Assignment added successfully!");
    } catch (error) {
      console.error("Error adding assignment:", error);
      toast.error("Error adding assignment");
    }
  };

  const handleDeleteCourse = async () => {
    setLoading(true);
    try {
      await axios.delete(`${apiUrl}/api/admin/deletecourse/${courseId}`);
      toast.success("Course deleted successfully!");
      onBack();
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Error deleting course. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-course-Edit-section">
      {assignmentButton ? (
        <div>
          {/* Add new assignment form */}
          <h4>
            <button
              type="button"
              onClick={() => setAssignmentButton(false)}
              className="back"
            >
              <i class="fa-solid fa-arrow-left"></i>
            </button>
            Add New Assignment
          </h4>
          <div className="admin-course-inputs-container">
            <div className="admin-course-input">
              <label htmlFor="assignmentTitle">Assignment Title:</label>
              <input
                type="text"
                className="text-input"
                id="assignmentTitle"
                name="title"
                placeholder="Assignment Title"
                value={newAssignment.title}
                onChange={handleAssignmentChange}
                required
              />
            </div>
            <div className="admin-course-input">
              <label htmlFor="assignmentDescription">Description:</label>
              <textarea
                id="assignmentDescription"
                name="description"
                className="text-input"
                placeholder="Assignment Description"
                value={newAssignment.description}
                onChange={handleAssignmentChange}
                required
              />
            </div>
          </div>
          <div className="admin-course-inputs-container">
            <div className="admin-course-input">
              <label htmlFor="submissionDate">Submission Date:</label>
              <input
                type="date"
                className="text-input"
                id="submissionDate"
                name="submissionDate"
                value={newAssignment.submissionDate}
                onChange={handleAssignmentChange}
                required
              />
            </div>
            <div className="admin-course-input">
              <label htmlFor="submissionEndingDate">
                Submission Ending Date:
              </label>
              <input
                type="date"
                className="text-input"
                id="submissionEndingDate"
                name="submissionEndingDate"
                value={newAssignment.submissionEndingDate}
                onChange={handleAssignmentChange}
                required
              />
            </div>
          </div>
          <div className="course-cancel-save-buttons">
            <button
              type="button"
              onClick={handleAddAssignment}
              className="primary-button"
            >
              Upload Assignment
            </button>
          </div>

          <hr className="divider" />

          <h4>Assignments:</h4>
          {/* Display existing assignments */}
          {assignments.length !== 0 ? (
            assignments.map((assignment) => (
              <div key={assignment._id}>
                <p>Title: {assignment.title}</p>
                {/* Display other assignment details as needed */}
              </div>
            ))
          ) : (
            <p>No Assignments created yet</p>
          )}
        </div>
      ) : (
        <>
          <div className="admin-course-Edit-heading-container">
            <button type="button" onClick={() => onBack()} className="back">
              <i class="fa-solid fa-arrow-left"></i>
            </button>{" "}
            Back to All Courses
            <button
              className="secondary-button"
              onClick={() => setAssignmentButton(true)}
            >
              Add Assignments
            </button>
          </div>
          <div className="admin-course-Edit-form-container">
            <form
              className="admin-course-Edit-form"
              onSubmit={handleSaveChanges}
            >
              <div className="admin-course-basic-information">
                <h4>Enter Basic Details</h4>
                <label htmlFor="name">Name</label>
                <input
                  placeholder="Course Name"
                  type="text"
                  id="name"
                  name="name"
                  className="text-input"
                  value={courseData.name}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="description">Description:</label>
                <textarea
                  type="text"
                  name="description"
                  className="text-input"
                  placeholder="Course Description goes here..."
                  value={courseData.description}
                  onChange={handleInputChange}
                  required
                  rows={5}
                />
                <div className="admin-course-dropdown-container">
                  <div
                    className="admin-course-dropdown"
                    id="admin-course-dropdown-3"
                  >
                    <label htmlFor="fees">Price in (INR) ₹ :</label>
                    <div className="currency-input">
                      <input
                        type="number"
                        name="fees"
                        onChange={handleInputChange}
                        min={0}
                        placeholder="000"
                        value={courseData.fees}
                      />
                    </div>
                  </div>
                  <div className="file-input">
                    <label htmlFor="duration">Course Duration :</label>
                    <input
                      type="text"
                      name="duration"
                      placeholder="Lifetime"
                      value={courseData.duration}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="file-input">
                    <label htmlFor="duration">Course Start Date :</label>
                    <input
                      type="date"
                      name="startDate"
                      placeholder=""
                      value={courseData.startDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="file-input">
                    <label htmlFor="duration">Course End Date :</label>
                    <input
                      type="date"
                      name="endDate"
                      placeholder=""
                      value={courseData.endDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="file-input">
                    <label htmlFor="thumbnail">Thumbnail :</label>
                    <input
                      type="file"
                      name="thumbnail"
                      id="thumbnail"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
              </div>
              <div className="video-lectures-container">
                <div className="video-lectures-body">
                  <div className="video-lectures-input">
                    <h4>Add Video Lectures:</h4>
                    <input
                      onChange={handleLectureChange}
                      name="lectureName"
                      type="text"
                      placeholder="Lecture Name"
                      value={singleLecture.lectureName}
                    />
                    <input
                      onChange={handleLectureChange}
                      name="lectureDescription"
                      type="text"
                      placeholder="Lecture Description"
                      value={singleLecture.lectureDescription}
                    />
                    <div className="video-label">
                      <input
                        onChange={handleLectureChange}
                        name="lectureLink"
                        type="text"
                        placeholder="Link"
                        value={singleLecture.lectureLink}
                      />
                      <button
                        type="button"
                        onClick={addLecture}
                        className="primary-button"
                      >
                        Add Lecture
                      </button>
                    </div>
                  </div>
                  <div className="video-lectures-list">
                    <h4>Added Video Lectures:</h4>
                    {lectureList.length !== 0 ? (
                      lectureList.map((item, idx) => (
                        <div key={idx} className="video-lecture">
                          <div className="video-thumbnail">
                            <img
                              src={item.lectureImage}
                              alt="video-thumbnail"
                            />
                          </div>
                          <div className="video-details">
                            <h5>{item.lectureName}</h5>
                            <p>{item.lectureDescription}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No video lectures added</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="course-cancel-save-buttons">
                <button type="submit" className="primary-button">
                  <i class="fa-solid fa-check"></i> Update
                </button>
                <button
                  type="button"
                  className={`secondary-button ${courseData.publish ? "published" : "unpublished"
                    }`}
                  onClick={togglePublishStatus}
                >
                  {courseData.publish ? (
                    <>
                      <i class="fa-solid fa-users-slash"></i> Unpublish
                    </>
                  ) : (
                    <>
                      <i class="fa-solid fa-users"></i> Publish
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="primary-button red"
                >
                  <i class="fa-solid fa-trash"></i> Course
                </button>
              </div>
            </form>
          </div>
          {/* Bootstrap Modal */}
          {showModal && (
            <div
              className="modal fade show d-block"
              tabIndex="-1"
              role="dialog"
              style={{ background: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Delete Course</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={() => setShowModal(false)}
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>Are you sure you want to Delete this Course</p>
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
                      onClick={handleDeleteCourse}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CourseEdit;
