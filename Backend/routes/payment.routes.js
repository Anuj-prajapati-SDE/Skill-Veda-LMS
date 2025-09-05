const router = require('express').Router();
const paymentController = require('../controllers/payment.controller');
const { getPaymentData } = require("../controllers/payment.controller");
router.post("/order", paymentController.createOrder);
router.post("/verify-payment",paymentController.verifyPayment); 
router.get("/getPaymentData/:userId", getPaymentData);
module.exports = router;

