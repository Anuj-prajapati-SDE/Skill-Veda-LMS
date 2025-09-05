const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  fees: { type: Number, required: true }, 
  duration: { type: String },
  startDate: {
    type: Date,
    // required: true,
},
endDate: {
    type: Date,
    // required: true
},
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  rating: { type: Number, min: 0, max: 5, default: 0 },
  publish: { type: Boolean, default: false },
  lectures: [
    {
      lectureName: { type: String },
      lectureDescription: { type: String },
      lectureLink: { type: String }, 
      lectureImage:{ type: String , default : "https://res.cloudinary.com/hiddendev/image/upload/v1739819269/2202_w037_n003_210a_p1_210_vmbwxk.jpg"}
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
