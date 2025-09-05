const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "admin"], default: "student" },
    phoneNumber: { type: String, required: true, unique: true },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/hiddendev/image/upload/v1739817474/download_go1ai9.jpg",
    },
    biography: { type: String, default: "Type Some Here..............." },
    batch: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    otp: {
      code: String,
      expiration: Date,
    },
    isVerified: { type: Boolean, default: false },
    interestedCourses: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
