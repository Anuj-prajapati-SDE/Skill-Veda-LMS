const mongoose = require('mongoose'); 

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Could not connect to MongoDB', err);
    process.exit(1); // Exit the application if database connection fails
  }
};

module.exports = { connectDB };
