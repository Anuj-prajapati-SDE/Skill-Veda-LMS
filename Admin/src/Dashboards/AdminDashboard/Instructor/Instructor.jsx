import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, Links, useNavigate } from 'react-router-dom';

const Instructor = () => {

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const notifyA = (e) => toast.success(e);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowModal(false);
    notifyA("Logged Out Successfully");
    navigate("/"); // Redirect to home
  };

  return (
    <>
      <div className="admin-courses-header">
        <h2>Instructor</h2>
        <div className="admin-search-bar">
          <input
            type="text"
            placeholder="What do you want to learn?"
            className="admin-search-input"
          />
          <button className="admin-search-button"><i class="fas fa-search"></i></button>
          <Link to="/">
            <i className="ri-home-9-line"></i>
          </Link>
          <div>
            {/* Logout Icon with Click Event */}
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

            {/* Bootstrap Modal */}
            <div
              className={`modal fade ${showModal ? "show d-block" : ""}`}
              tabIndex="-1"
              role="dialog"
              style={{ background: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog" role="document">
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
    </>
  );
}

export default Instructor