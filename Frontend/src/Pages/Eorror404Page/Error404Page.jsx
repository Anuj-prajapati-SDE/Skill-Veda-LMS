import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import svg1 from '../../assets/img/illustration/1.svg';
import './Eorror404Page.css'
import { Link } from 'react-router-dom';

const Error404Page = () => {
  return (
    <>
    <Navbar></Navbar>
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
              The page you want to visit does not exist or still in Development.
            </p>
            <Link className="btn circle btn-md btn-gradient" to="/">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</>
    <Footer></Footer>
    </>
  )
}

export default Error404Page