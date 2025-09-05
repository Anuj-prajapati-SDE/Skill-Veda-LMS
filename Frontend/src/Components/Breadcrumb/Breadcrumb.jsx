import React from 'react';
import { useLocation } from 'react-router-dom';
import './Breadcrumb.css'
const Breadcrumb = ({ courseImage }) => {
  const location = useLocation();
  const path = location.pathname.split('/').filter(Boolean).join(' / ');

  return (
    <div
      className="breadcrumb-area bg-gray text-center shadow dark text-light bg-cover"
      style={{ backgroundImage: `url(${courseImage || "assets/img/2440x1578.png"})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <h1>{path || 'About Us'}</h1>
            <ul className="breadcrumb">
              <li>
                <a href="#">
                  <i className="fas fa-home" /> Home
                </a>
              </li>
              <li className="active">{path || 'Section name'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
