const router = require('express').Router();
const adminController = require('../controllers/admin.controller');

router.get('/getAdminDetails/:id', adminController.getAdminDetails); 
router.post('/createcourses', adminController.createCourses); 
router.get('/getcourses', adminController.getCourses); 
router.get('/getPublishedCourses', adminController.getPublishedCourses); 
router.get('/getcourseById/:id', adminController.getCourseById); 
router.put('/:courseId/toggle-publish', adminController.togglePublishStatus); 
router.put('/editcourse/:id', adminController.updateCourse); 
router.get('/latestStudents', adminController.latestStudents); 
router.get('/getLatestEnrolledStudents', adminController.getLatestEnrolledStudents); 
router.post('/:courseId/assignments', adminController.uploadAssignment); 
router.get('/:courseId/assignments', adminController.getassingments); 
router.delete('/deletecourse/:courseId', adminController.deletecourse); 
router.post('/contact', adminController.handleContactForm);

module.exports = router;
