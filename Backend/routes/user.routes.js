const express = require('express');
const router = express.Router();
const { enrollStudent } = require('../controllers/user.controller');
const {getEnrolledUser} = require ("../controllers/user.controller");
const { getEnrolledCourses } = require('../controllers/user.controller');
const { getUserDetails } = require('../controllers/user.controller');
const {UpdateUserProfile} = require('../controllers/user.controller')
const {markAttendance, getAttendance} = require("../controllers/user.controller");

router.post("/enroll-student", enrollStudent);
router.get("/getEnrollmentStudent/:userId/:courseId", getEnrolledUser);
router.get("/enrolled-courses", getEnrolledCourses);
router.get("/getUserDetails/:userId", getUserDetails);
router.put("/updateUserProfile/:userId", UpdateUserProfile);
router.post("/markedAttendance", markAttendance);
router.get("/:studentId", getAttendance);
module.exports = router;
 