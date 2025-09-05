import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage, Eorror404Page } from "./Pages/index.js";
import ScrollToTop from "./utilities/functions/ScrollToTop.jsx";
import AHome from './Dashboards/AdminDashboard/Home/Home.jsx';
import Course from './Dashboards/AdminDashboard/Courses/Course.jsx';
import Instructor from './Dashboards/AdminDashboard/Instructor/Instructor.jsx';
import User from './Dashboards/AdminDashboard/User/User.jsx';
import AdminDashboard from "./Dashboards/AdminDashboard/AdminDashboard.jsx";
import PrivateRoute from "./utilities/PrivateComponent/PrivateComponent.jsx";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/admindashboard/"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }>
          <Route path="home" element={<AHome></AHome>} />
          <Route path="course" element={<Course></Course>} />
          <Route path="instructor" element={<Instructor></Instructor>} />
          <Route path="user" element={<User></User>} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<Eorror404Page />} />
      </Routes>
    </Router>
  )
}

export default App