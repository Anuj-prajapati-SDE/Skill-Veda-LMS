const Course = require('../models/course.model');
const Admin = require('../models/admin.model');
const User = require('../models/user.model');
const Assignment = require('../models/assignment.model');
const Contact = require('../models/contact.model');
const EnrolledUser = require("../models/EnrolledUser");
// const upload = require('../configs/cloudinary.config');
const transporter = require('../configs/nodemailer.config');

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

const upload = multer({ storage }).single('image');

exports.getAdminDetails = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the admin ID is passed as a URL parameter

    // Fetch admin details by ID
    const admin = await Admin.findById(id).select('name email image'); // Only select the required fields

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({
      message: 'Admin details fetched successfully',
      admin,
    });
  } catch (error) {
    console.error('Failed to fetch admin details:', error);
    res.status(500).json({ message: 'Failed to fetch admin details. Please try again later.' });
  }
};

exports.createCourses = (req, res) => {
  // Use Multer to handle the file upload
  upload(req, res, async (err) => {
    if (err) {
      console.error('Image upload failed:', err);
      return res.status(500).json({ message: 'Image upload failed. Please try again.' });
    }

    try {
      // Extract form data and uploaded image URL
      const { name, description, fees, duration } = req.body;
      const image = req.file?.path; // URL of the uploaded image from Cloudinary
      console.log(image);

      if (!image) {
        return res.status(400).json({ message: 'Image is required.' });
      }

      // Create a new course instance
      const newCourse = new Course({
        name,
        description,
        fees,
        duration,
        image,
        createdAt: new Date(),
      });

      // Save the course to the database
      const savedCourse = await newCourse.save();

      // Respond with the saved course
      res.status(201).json({
        message: 'Course created successfully',
        course: savedCourse,
      });
    } catch (error) {
      console.error('Course creation failed:', error);
      res.status(500).json({ message: 'Failed to create course. Please try again later.' });
    }
  });
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find(); // Fetch all courses from the database
    res.status(200).json(courses);
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    res.status(500).json({ message: 'Failed to fetch courses. Please try again.' });
  }
};

exports.getPublishedCourses = async (req, res) => {
  try {
    // Fetch courses where publish is true
    const courses = await Course.find({ publish: true });
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching published courses:", error);
    res.status(500).json({ message: "Failed to fetch published courses. Please try again later." });
  }
};

exports.togglePublishStatus = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Find course by ID
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    // Toggle publish status
    course.publish = !course.publish;
    await course.save();

    res.status(200).json({ message: `Course ${course.publish ? "published" : "unpublished"} successfully.`, course });
  } catch (error) {
    console.error("Error toggling publish status:", error);
    res.status(500).json({ message: "Failed to update publish status. Please try again later." });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params; // Extract the course ID from the request parameters
    const course = await Course.findById(id); // Find the course by ID

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course); // Respond with the found course
  } catch (error) {
    console.error('Failed to fetch course:', error);
    res.status(500).json({ message: 'Failed to fetch course. Please try again.' });
  }
};

exports.updateCourse = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Image upload failed:", err);
      return res.status(500).json({ message: "Image upload failed. Please try again." });
    }

    try {
      const { id } = req.params; // Get course ID from URL
      const { name, description, fees, duration, lectures, startDate, endDate } = req.body;
      const image = req.file ? req.file.path : null; // Get uploaded image path if available

      // Find the course by ID
      const course = await Course.findById(id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      // Update basic course details (excluding lectures)
      if (name) course.name = name;
      if (description) course.description = description;
      if (fees) course.fees = fees;
      if (duration) course.duration = duration;
      if (image) course.image = image;
      if (startDate) course.startDate = startDate;
      if (endDate) course.endDate = endDate;

      // Update lectures if provided
      if (lectures) {
        try {
          const parsedLectures = JSON.parse(lectures);
          if (Array.isArray(parsedLectures)) {
            parsedLectures.forEach((lecture) => {
              const { _id, lectureName, lectureDescription, lectureLink } = lecture;

              if (_id) {
                // Update existing lecture
                const lectureToUpdate = course.lectures.id(_id);
                if (lectureToUpdate) {
                  if (lectureName) lectureToUpdate.lectureName = lectureName;
                  if (lectureDescription) lectureToUpdate.lectureDescription = lectureDescription;
                  if (lectureLink) lectureToUpdate.lectureLink = lectureLink;
                }
              } else {
                // Add new lecture
                course.lectures.push({ lectureName, lectureDescription, lectureLink });
              }
            });
          }
        } catch (parseError) {
          return res.status(400).json({ message: "Invalid lectures data format." });
        }
      }

      // Save the updated course
      const updatedCourse = await course.save();

      res.status(200).json({
        message: "Course updated successfully",
        course: updatedCourse,
      });
    } catch (error) {
      console.error("Course update failed:", error);
      res.status(500).json({ message: "Failed to update course. Please try again later." });
    }
  });
};

exports.latestStudents = async (req, res) => {
  try {
    const students = await User.find({})
      .sort({ createdAt: -1 }) // Sort by newest first
      .select("name interestedCourses phoneNumber gender createdAt") // Only required fields
      .populate("interestedCourses", "name"); // Populate course names

    res.status(200).json({ success: true, students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getLatestEnrolledStudents = async (req, res) => {
  try {
    // Fetch latest enrolled students sorted by enrolledTime (descending order)
    const enrolledStudents = await EnrolledUser.find().sort({ enrolledTime: -1 });

    res.status(200).json({ enrolledStudents });
  } catch (error) {
    console.error("Error fetching enrolled students:", error);
    res.status(500).json({ message: "Failed to fetch enrolled students. Please try again later." });
  }
};

exports.getassingments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ courseId: req.params.courseId });
    res.json(assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.uploadAssignment = async (req, res) => {
  try {
    const { title, description, submissionDate, submissionEndingDate, status } = req.body;
    const courseId = req.params.courseId;

    const newAssignment = new Assignment({
      courseId,
      title,
      description,
      submissionDate,
      submissionEndingDate,
      status,
    });

    const savedAssignment = await newAssignment.save();
    res.status(201).json(savedAssignment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deletecourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Find the course and delete
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({
      message: 'Course deleted successfully',
      deletedCourse
    });

  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Failed to delete course' });
  }
};

exports.handleContactForm = async (req, res) => {
  try {
    const { name, email, phoneNumber, problem } = req.body;

    const newContact = new Contact({
      name,
      email,
      phoneNumber,
      problem,
    });

    console.log(transporter)
    await transporter.sendMail({
      from: `"Your LMS Team" <${process.env.GMAIL_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Contact Form Submission',
      html: `
        <h2>You have a new contact form submission:</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Problem:</strong> ${problem}</p>
      `,
    });

    await newContact.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error handling contact form:', error);
    res.status(500).json({ message: 'Error sending message!' });
  }
};

