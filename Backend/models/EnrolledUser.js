const mongoose = require("mongoose");

const EnrolledUserSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    feesStatus: {
      type: String,
      enum: ["Paid Full Fees", "Paid Registration Fees", "Unpaid"],
      default : "Unpaid",
      required: true,
    },
    PayedAmount: { type: Number, required: true, default:0 },
    discountAmount: { type: Number, required: true, default:0 },
    couponDiscount: { type: Number, required: true, default:0 },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true, 
    },
    courseName: { type: String, required: true },
    enrolledTime: { type: Date, default: Date.now },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'payment',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EnrolledUser", EnrolledUserSchema);
