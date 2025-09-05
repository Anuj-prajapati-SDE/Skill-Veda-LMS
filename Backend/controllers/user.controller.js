const moment = require("moment");
const User = require('../models/user.model');
const Course = require('../models/course.model');
const EnrolledUser = require("../models/EnrolledUser");
const Attendance = require("../models/attendance.model");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'courses',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    },
});

const upload2 = multer({ storage }).single('image');


exports.enrollStudent = async (req, res) => {
    try {
        const { userId, courseId } = req.body;

        // Validate input
        if (!userId || !courseId) {
            return res.status(400).json({ message: "User ID, Course ID, and Fees Status are required." });
        }

        // Find user and course
        const user = await User.findById(userId);
        const course = await Course.findById(courseId);

        if (!user || !course) {
            return res.status(404).json({ message: "User or Course not found." });
        }

        // Check if user is already enrolled
        if (user.enrolledCourses.includes(courseId)) {
            return res.status(400).json({ message: "User is already enrolled in this course." });
        }

        // Enroll student
        user.enrolledCourses.push(courseId);
        course.enrolledStudents.push(userId);

        // Save enrollment details in EnrolledUser collection
        const enrolledStudent = new EnrolledUser({
            userId: user._id,
            name: user.name,
            phoneNumber: user.phoneNumber,
            courseId: course._id,
            courseName: course.name, // Store course name instead of ID
            enrolledTime: new Date(),
        });

        // Save all changes to the database
        await enrolledStudent.save();
        await user.save();
        await course.save();

        res.status(200).json({ message: "Student enrolled successfully.", enrolledStudent });
    } catch (error) {
        console.error("Error enrolling student:", error);
        res.status(500).json({ message: "Failed to enroll student. Please try again later." });
    }
};

exports.getEnrolledUser = async (req, res) => {
    try {
        const { userId, courseId } = req.params;

        if (!userId || !courseId) {
            return res.status(400).json({ message: "User ID and Course ID are required" });
        }

        const enrolledUser = await EnrolledUser.findOne({ userId, courseId })
            .populate("userId", "name email") // Populate user details if needed
            .populate("courseId", "title description") // Populate course details if needed
            .populate("paymentId", "status amount") // Populate payment details if available
            .exec();

        if (!enrolledUser) {
            return res.status(404).json({ message: "Enrollment not found" });
        }

        res.status(200).json(enrolledUser);
    } catch (error) {
        console.error("Error fetching enrolled user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.getEnrolledCourses = async (req, res) => {
    try {
        const { userId } = req.query; // Get userId from query params

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Find the student and get enrolledCourses array
        const student = await User.findById(userId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const enrolledCourseIds = student.enrolledCourses; // Get enrolled course IDs

        // Fetch courses using enrolled course IDs
        const courses = await Course.find({ _id: { $in: enrolledCourseIds } });

        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user by userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user details
        res.json({ user });
    } catch (error) {
        console.error('Error fetching student details:', error);
        res.status(500).json({ message: 'Error fetching student details' });
    }
};

exports.UpdateUserProfile = (req, res) => {
    upload2(req, res, async (err) => {
        if (err) {
            // Handle multer errors
            console.error("Multer error:", err);
            return res.status(400).json({ error: "Failed to upload2 image. Please try again." });
        }

        try {
            const userId = req.params.userId;
            const updates = { ...req.body };

            // If an image was upload2ed, update the `image` field
            if (req.file) {
                updates.image = req.file.path; // Cloudinary returns the image URL in the `path` field
            }

            // Update the user in the database
            const user = await User.findByIdAndUpdate(userId, updates, { new: true });

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            res.status(200).json({
                message: "User profile updated successfully",
                user,
            });
        } catch (error) {
            console.error("Error updating user profile:", error);
            res.status(500).json({ error: "An error occurred while updating the profile. Please try again later." });
        }
    });
};

// Mark Attendance
exports.markAttendance = async (req, res) => {
    try {
        const { studentId, latitude, longitude } = req.body;

        if (!studentId || latitude === undefined || longitude === undefined) {
            return res.status(400).json({ error: "Student ID, latitude, and longitude are required" });
        }

        const todayDate = moment().format("YYYY-MM-DD");

        const newAttendance = new Attendance({
            studentId,
            date: todayDate,
            location: {
                type: "Point",
                coordinates: [longitude, latitude], // GeoJSON format (longitude first)
            },
        });

        await newAttendance.save();
        res.status(201).json({ message: "Attendance marked successfully" });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "Attendance already marked for today" });
        }
        res.status(500).json({ error: "Server error" });
    }
};


// Get Attendance Records
exports.getAttendance = async (req, res) => {
    try {
        const { studentId } = req.params;
        const records = await Attendance.find({ studentId }).sort({ date: -1 });
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
  };
   

