const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();

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

const storage2 = new CloudinaryStorage({
  cloudinary,
  params: {
      folder: 'userProfileImages', 
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'], 
  },
});

const upload = multer({ storage }).single('image');
const upload2 = multer({ storage2 }).single('image'); 

module.exports = upload;
module.exports = upload2;
