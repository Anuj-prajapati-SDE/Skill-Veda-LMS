const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const Admin = require('./models/admin.model');
const { connectDB } = require('./configs/db.config');
const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');
const authRoutes = require('./routes/auth.routes');
const paymentRoutes = require('./routes/payment.routes');
const helpSectionRoutes = require('./routes/helpSection.routes');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(cookieParser()); // Use cookie-parser to parse cookies

// Fix CORS issue and allow credentials
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://skillvedaa.in",
  "https://lms-portal-wa5z.onrender.com"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies and authentication headers
  })
);


app.use(bodyParser.json());

// const allowedIPs = ['::1', '127.0.0.1'];
// app.use((req, res, next) => {
//   if (allowedIPs.includes(req.ip)) {
//     next(); // Allow the request
//   } else {
//     res.status(403).send('Forbidden');
//   }
// });


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/help', helpSectionRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

app.get('/', (req, res) => {
  res.send('Welcome to the server');
});

// Initialize admin account
// const initializeAdmin = async () => {
//   try {
//     const adminExists = await Admin.findOne({ email: 'admin@example.com' });

//     if (!adminExists) {
//       const hashedPassword = await bcrypt.hash('secureAdminPassword123', 10);

//       const newAdmin = new Admin({
//         name: 'Mr. Binit',
//         email: 'admin@example.com',
//         password: hashedPassword,
//       });

//       await newAdmin.save();
//       console.log('Admin account initialized.');
//     } else {
//       console.log('Admin account already exists.');
//     }
//   } catch (error) {
//     console.error('Error initializing admin account:', error);
//   }
// };
// initializeAdmin();
//--------------------------

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
