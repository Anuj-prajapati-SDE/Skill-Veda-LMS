const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.registerUser);
router.post('/verify-otp', authController.verifyOTP);
router.post('/forgotpassword', authController.forgotPassword);
router.post('/verify-otp-forgotpassword', authController.verifyForgotPasswordOTP);
router.post('/login', authController.loginUser); 
router.post('/loginAdmin', authController.loginAdmin); 
router.post('/createAdmin', authController.createAdmin); 
router.post('/createTestAdmin', authController.createTestAdmin); 
router.post('/resetAdminPassword', authController.resetAdminPassword); 
router.get('/fixAdminLogin', authController.fixAdminLogin); 
router.get('/user', authController.getUser);
router.get('/admin', authController.getAdmin);
router.post('/logout', authController.logoutUser); 

module.exports = router;

