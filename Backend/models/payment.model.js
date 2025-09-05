const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "EnrolledUser", required: true },
    courseId : { type: String, required: true },
    courseName : { type: String, required: true },
    RegistrationFees: { type: Number, default:0},
    orderId: { type: String, required: true },
    paymentId : {type: String},
    PayedAmount: { type: Number, required: true },
    couponDiscount: { type: Number, required: true },
    discountAmount: { type: Number, required: true },
    courseFullPayment: { type: Number, required: true },
    paymentType: { 
        type: String, 
        enum: ["Paid Full Fees", "Paid Registration Fees"], 
        required: true 
    },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("payment", PaymentSchema);
