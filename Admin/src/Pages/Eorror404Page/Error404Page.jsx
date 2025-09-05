import React from 'react'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import svg1 from '../../assets/img/illustration/1.svg';
import './Eorror404Page.css'

const Error404Page = () => {
  return (
    <>
      <Breadcrumb></Breadcrumb>
      <div className="error-page-area overflow-hidden default-padding">
        <div className="container">
          <div className="row align-center">
            <div className="col-lg-6 thumb">
              <img src={`${svg1}`} alt="Thumb" />
            </div>
            <div className="col-lg-6">
              <div className="error-box">
                <h1>404</h1>
                <h2>Sorry Page Was Not Found!</h2>
                <p>
                  Household shameless incommode at no objection behaviour.
                  Especially do at he possession insensible sympathize boisterous.
                </p>
                <a className="btn circle btn-md btn-gradient" href="#">
                  Back to home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Error404Page