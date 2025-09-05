const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'Admin' },
  email: { type: String, required: true, unique: true, default: 'admin@example.com' },
  password: { type: String, required: true }, 
  image: { type: String, default: "https://res.cloudinary.com/hiddendev/image/upload/v1738933705/userProfileImages/OIP_lrd61m.jpg"},
  role: { type: String, default: 'admin' },
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
