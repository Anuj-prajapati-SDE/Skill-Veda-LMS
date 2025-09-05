import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SHome from './Dashboards/StudentDashboard/Home/Home.jsx'
import { HomePage, AboutPage, SignupPage, LoginPage, CousesDetailPage, ContactPage, CoursePage, Eorror404Page, FaqPage, ForgotPassword } from "./Pages/index.js";
import StudentDashboard from "./Dashboards/StudentDashboard/StudentDashboard";
import PrivateRoute from "./utilities/PrivateComponent/PrivateComponent.jsx";
import MyCourses from "./Dashboards/StudentDashboard/MyCourses/MyCouses.jsx";
import Assignment from './Dashboards/StudentDashboard/Assignment/Assigment.jsx'
import Result from './Dashboards/StudentDashboard/Result/Result.jsx'
import Profile from './Dashboards/StudentDashboard/Profile/Profile.jsx'
import PaymentPage from './Dashboards/StudentDashboard/MyCourses/Components/PaymentPage.jsx'
import VideoLecturePage from "./Dashboards/StudentDashboard/MyCourses/Components/VideoLecturePage.jsx";
import UnderDevelopment from "./Pages/UnderDevelopment/UnderDevelopment.jsx";
import ScrollToTop from "./utilities/functions/ScrollToTop.jsx";
import TermsConditions from "./Pages/Security/TermsConditions.jsx";
import RefundPolicy from "./Pages/Security/RefundPolicy.jsx";
import PrivacyPolicy from "./Pages/Security/PrivacyPolicy.jsx";
import SummerTraining from "./Pages/SupportPages/SummerInternship.jsx";
import WinterTraining from "./Pages/SupportPages/WinterInternship.jsx";
import InternshipProgram from "./Pages/SupportPages/Internship.jsx";
import CorporateTraining from "./Pages/SupportPages/CorporateTraining.jsx"; 
import CollegeCampusTraining from "./Pages/SupportPages/CollegeCampusTraining.jsx";
import WebDevelopment from "./Pages/SupportPages/WebDevelopment.jsx";
import ChatAssistant from "./Components/ChatAssistant/ChatAssistant.jsx";

function App() {
  return (
    <Router>
      <ChatAssistant/>
      <ScrollToTop />
      <Routes> 
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/coursesdetails/:id" element={<CousesDetailPage />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faqs" element={<FaqPage />} />
        <Route path="/terms-and-condition" element={<TermsConditions />} />
        <Route path="/refund-return-policy" element={<RefundPolicy />} />
        <Route path="/corporate-training" element={<CorporateTraining />} />
        <Route path="/college-campus-training" element={<CollegeCampusTraining/>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/summer-training" element={<SummerTraining />} />
        <Route path="/winter-training" element={<WinterTraining />} />
        <Route path="/internship-program" element={<InternshipProgram />} />
        <Route path="/web-development" element={<WebDevelopment />} />
        {/* Role-Based Protected Routes */} 
        <Route
          path="/userdashboard"
          element={
            <PrivateRoute role="user">
              <StudentDashboard />
            </PrivateRoute>
          }>
          <Route path="home" element={<SHome></SHome>} />
          <Route path="my-courses" element={<MyCourses />}>
            <Route path="payment-page/:id" element={<PaymentPage></PaymentPage>} />
            <Route path="video-leature/:id" element={<VideoLecturePage></VideoLecturePage>} />
          </Route>
          <Route path="assignment" element={<Assignment />} />
          <Route path="result" element={<Result />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        {/* 404 Page */}
        <Route path="*" element={<Eorror404Page />} />
        {/* Under Development Page */}
        <Route path="/underdevelopment" element={<UnderDevelopment />} />
      </Routes>
    </Router>
  );
}

export default App;
