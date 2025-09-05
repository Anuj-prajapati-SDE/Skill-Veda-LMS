const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/payment.model");
const EnrolledUser = require("../models/EnrolledUser");
require("dotenv").config();

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_ID_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

// Create Order Controller
exports.createOrder = async (req, res) => {
    try {
        const {
            amount,
            name,
            description,
            email,
            contact,
            image,
            paymentType,
            UserId,
            courseFullPayment,
            courseName,
            courseId,
            discountAmount,
            couponDiscount,
            RegistrationAmount
        } = req.body;

        if (!amount || amount < 1) {
            return res.status(400).json({ success: false, msg: "Invalid amount" });
        }

        if (!UserId) {
            return res.status(400).json({ success: false, msg: "User ID is required" });
        }

        let course;
        const existingPayment = await EnrolledUser.find({ courseId: courseId, userId: UserId });
        existingPayment.map((existing) => {
            course = existing.feesStatus;
        });

        // Prevent duplicate payment for the same type
        if (paymentType === course) {
            return res.status(400).json({
                success: false,
                msg: `User has already paid the ${paymentType}. Cannot pay fees again.`,
            });
        }

        const options = {
            amount: amount * 100, // Convert to paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpayInstance.orders.create(options);

        // Check if the user already has a registration payment for the course
        let payment = await Payment.findOne({
            userId: UserId,
            courseId: courseId,
            paymentType: "Paid Registration Fees",
        });

        if (payment) {
            // Update existing registration payment with full payment details
            payment.PayedAmount = amount; // Add full payment amount
            payment.paymentType = paymentType;
            payment.courseFullPayment = courseFullPayment;
            payment.couponDiscount = couponDiscount;
            payment.discountAmount = discountAmount;
            payment.status = "pending";
            payment.orderId = order.id;

            await payment.save();
        } else {
            // Create a new payment record if registration doesn't exist
            if (paymentType === "Paid Registration Fees") {
                payment = new Payment({
                    userId: UserId,
                    orderId: order.id,
                    RegistrationFees: RegistrationAmount,
                    PayedAmount: amount,
                    paymentType,
                    courseId: courseId,
                    courseName: courseName,
                    courseFullPayment: courseFullPayment,
                    couponDiscount: couponDiscount,
                    discountAmount: discountAmount,
                    paymentId: "",
                    status: "pending",
                });
                await payment.save();
            }
            else {
                payment = new Payment({
                    userId: UserId,
                    orderId: order.id,
                    RegistrationFees: 0,
                    PayedAmount: amount,
                    paymentType,
                    courseId: courseId,
                    courseName: courseName,
                    courseFullPayment: courseFullPayment,
                    couponDiscount: couponDiscount,
                    discountAmount: discountAmount,
                    paymentId: "",
                    status: "pending",
                });
                await payment.save();
            }
        }

        res.status(200).json({
            success: true,
            msg: "Order Created Successfully",
            order_id: order.id,
            amount: options.amount,
            key_id: process.env.RAZORPAY_ID_KEY,
            product_name: name || "Web Development Course",
            description: description || "No description provided",
            image: image || "N/A",
            contact: contact || "N/A",
            name: name || "N/A",
            email: email || "N/A",
            paymentType,
        });

    } catch (error) {
        console.error("Razorpay Order Error:", error);
        res.status(500).json({ success: false, msg: "Payment processing failed", error: error.message });
    }
};

// Verify Payment Controller
exports.verifyPayment = async (req, res) => {
    try {
        const {
            discountAmount,
            couponDiscount,
            paymentType,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ success: false, msg: "Invalid payment details" });
        }

        // Verify the signature
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, msg: "Payment verification failed" });
        }

        // Find the payment record
        let payment = await Payment.findOne({ orderId: razorpay_order_id });

        if (!payment) {
            return res.status(404).json({ success: false, msg: "Payment record not found" });
        }

        // Update payment record after successful verification
        payment.status = "completed";
        payment.paymentId = razorpay_payment_id;
        payment.transactionId = razorpay_payment_id;

        await payment.save();

        // Update the enrolled user's record
        await EnrolledUser.findOneAndUpdate(
            { userId: payment.userId, courseId: payment.courseId },
            {
                feesStatus: paymentType, // Update feesStatus to 'full' if necessary
                paymentId: payment._id,
                PayedAmount: payment.PayedAmount, // Update with total amount paid
                discountAmount: discountAmount,
                couponDiscount: couponDiscount,
            },
            { new: true }
        );

        res.status(200).json({ success: true, msg: "Payment completed successfully", payment });

    } catch (error) {
        console.error("Payment Verification Error:", error);
        res.status(500).json({ success: false, msg: "Payment verification failed", error: error.message });
    }
};

// Get Payment Data Controller
exports.getPaymentData = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const payments = await Payment.find({ userId });

        if (!payments || payments.length === 0) {
            return res.status(404).json({ message: "No payment records found" });
        }

        res.status(200).json(payments);
    } catch (error) {
        console.error("Error fetching payment data:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
