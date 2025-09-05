import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import "./Profile.css";

const EditProfile = () => {
  const API_URL = import.meta.env.VITE_Backend_URL;
  const notifyA = (message) => toast.success(message);
  const notifyB = (message) => toast.error(message);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // For showing image preview

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    image: "",
    biography: "",
    phoneNumber: "",
  });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          notifyB("User ID not found");
          return;
        }
        const response = await axios.get(`${API_URL}/api/user/getUserDetails/${userId}`);
        setUserData((prev) => ({
          ...prev,
          ...response.data.user,
        }));
      } catch (error) {
        notifyB("Error fetching user data");
      }
    };
    fetchUserData();
  }, []);

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image selection and show preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl); // Set preview image URL
    }
  };

  // Handle form submission (Update user profile)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        notifyB("User ID missing");
        return;
      }
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("biography", userData.biography);
      formData.append("phoneNumber", userData.phoneNumber);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      const response = await axios.put(`${API_URL}/api/user/updateUserProfile/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUserData((prev) => ({
        ...prev,
        ...response.data.user,
      }));
      setImagePreview(null); // Clear preview after saving
      notifyA("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.response || error.message);
      notifyB("Failed to update profile. Please try again.");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowModal(false);
    notifyA("Logged Out Successfully");
    navigate("/");
  };

  return (
    <>
      {/* Header Section */}
      <div className="admin-courses-header">
        <h2>Profile Dashboard</h2>
        <div className="admin-search-bar">
          <input
            type="text"
            placeholder="What do you want to learn?"
            className="admin-search-input"
          />
          <button className="logout-icon bg-green">
            <i className="fas fa-search"></i>
          </button>
          <Link className="logout-icon" to="/">
            <i className="ri-home-9-line"></i>
          </Link>
          <div>
            <Link
              to="/"
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

      {/* Profile Section */}
      <div className="Student-profile-section">
        <div className="profile-container">
          {userData.name ? (
            <div className="profile-content">
              <div className="profile-photo-section">
                <div className="profile-photo">
                  <img
                    src={imagePreview || userData.image || "/default-avatar.png"}
                    alt="Profile"
                  />
                </div>
                <div className="file-input-wrapper">
                  <label htmlFor="profilePhotoUpload" className="custom-file-upload">
                    Upload Photo
                  </label>
                  <input
                    id="profilePhotoUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              {/* Profile Info Form */}
              <div className="profile-info">
                <h2>Profile Info</h2>
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      placeholder="Name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      readOnly
                      disabled
                    />
                  </div>

                  <div className="form-group">
                    <label>Biography</label>
                    <ReactQuill
                      value={userData.biography}
                      onChange={(value) =>
                        setUserData((prev) => ({ ...prev, biography: value }))
                      }
                      placeholder="Write something about yourself..."
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={userData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                    />
                  </div>

                  <button type="submit" className="save-button">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditProfile;
