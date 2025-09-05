const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');
const Course = require('../models/course.model');
const transporter = require('../configs/nodemailer.config');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, batch, gender} = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered. Please use a different email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // const validCourses = await Course.find({ _id: { $in: interestedCourses } }).select("_id");
    // const courseIds = validCourses.map(course => course._id);

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiration = Date.now() + 1 * 60 * 1000; // 1 minute

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      batch,
      gender,
      otp: { code: otpCode, expiration: otpExpiration },
      isVerified: false,
      // interestedCourses: courseIds,
    });

    await newUser.save();

    setTimeout(async () => {
      const user = await User.findById(newUser._id);
      if (user && !user.isVerified) {
        await User.findByIdAndDelete(newUser._id);
        console.log(`Unverified user deleted: ${user.email}`);
      }
    }, 2 * 60 * 1000);

    await transporter.sendMail({
      from: `"Your LMS Team" <${process.env.GMAIL_EMAIL}>`,
      to: email,
      subject: "Your OTP Code for LMS Registration",
      html: `<p>Hello ${name},</p>
             <p>Your OTP code is: <b>${otpCode}</b></p>
             <p>This OTP will expire in 2 minute.</p>
             <p>Thank you for using our LMS!</p>`,
    });

    res.status(201).json({ message: "User registered successfully. Please check your email for the OTP." });
  } catch (error) {
    console.error("Registration failed:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.otp && user.otp.code === otp && user.otp.expiration > Date.now()) {

      user.isVerified = true;
      user.otp = undefined;
      await user.save();

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });

      try {
        await transporter.sendMail({
          from: `"Your LMS Team" <${process.env.GMAIL_EMAIL}>`,
          to: user.email,
          subject: 'Welcome to LMS!',
          html: `<p>Hi ${user.name},</p>
                 <p>Welcome to our LMS! We are excited to have you on board.</p>
                 <p>Thank you for registering!</p>`,
        });
        console.log('Welcome email sent to user');
      } catch (welcomeEmailError) {
        console.error('Error sending welcome email:', welcomeEmailError);
      }

      try {
        await transporter.sendMail({
          from: `"Your LMS Team" <${process.env.GMAIL_EMAIL}>`,
          to: process.env.ADMIN_EMAIL,
          subject: 'New User Registration',
          html: `<p>A new user has registered:</p>
                 <p>Name: ${user.name}</p>
                 <p>Email: ${user.email}</p>`,
        });
        console.log('Admin notification email sent');
      } catch (adminEmailError) {
        console.error('Error sending admin notification email:', adminEmailError);
      }

      res.json({ message: 'OTP verified successfully.', token });
    } else {
      if (user.otp.expiration <= Date.now()) {
        await User.findByIdAndDelete(user._id);
        return res.status(400).json({ message: 'OTP expired. User has been removed. Please register again.' });
      }
      res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('OTP verification failed:', error);
    res.status(500).json({ message: 'OTP verification failed' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User with this email does not exist.' });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiration = Date.now() + 10 * 60 * 1000; // 10 minutes

    user.otp = { code: otpCode, expiration: otpExpiration };
    await user.save();

    await transporter.sendMail({
      from: `"Your LMS Team" <${process.env.GMAIL_EMAIL}>`,
      to: email,
      subject: 'Your OTP Code for Password Reset',
      html: `<p>Hello,</p>
             <p>Your OTP code is: <b>${otpCode}</b></p>
             <p>This OTP will expire in 10 minutes.</p>
             <p>Thank you for using our LMS!</p>`,
    });

    res.status(200).json({ message: 'OTP sent to your email. Please check your inbox.' });
  } catch (error) {
    console.error('Error in forgot password:', error);
    res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
};

exports.verifyForgotPasswordOTP = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User with this email does not exist.' });
    }

    if (user.otp && user.otp.code === otp && user.otp.expiration > Date.now()) {

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      user.otp = undefined;
      await user.save();

      await transporter.sendMail({
        from: `"Your LMS Team" <${process.env.GMAIL_EMAIL}>`,
        to: email,
        subject: 'Password Reset Successful',
        html: `<p>Hello,</p>
               <p>Your password has been successfully reset.</p>
               <p>If you did not request this, please contact our support team immediately.</p>`,
      });

      res.status(200).json({ message: 'Password reset successfully.' });
    } else {
      if (user.otp.expiration <= Date.now()) {
        return res.status(400).json({ message: 'OTP expired. Please request a new OTP.' });
      }
      res.status(400).json({ message: 'Invalid OTP. Please try again.' });
    }
  } catch (error) {
    console.error('Error in verifying forgot password OTP:', error);
    res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id, role: "user" }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Set token in HTTP-only cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: "true", // Secure in production
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.json({ message: "Login successful", userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Login failed. Please try again later." });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // console.log("Admin login attempt:", { email, password: password ? "***" : "missing" });

    if (!email || !password) {
      console.log("Missing email or password");
      return res.status(400).json({ message: "Email and password are required" });
    }

    let user = await Admin.findOne({ email: email.toLowerCase().trim() });
    let role = "admin";

    // console.log("Admin found in database:", user ? { id: user._id, email: user.email } : "No admin found");

    if (!user) {
      console.log("Admin not found for email:", email);
      return res.status(400).json({ message: "Admin not found" });
    }

    // console.log("Comparing passwords...");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // console.log("Password validation result:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Password validation failed for admin:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // console.log("JWT token generated successfully");

    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents JavaScript access (XSS protection)
      secure: false, // Set to false for local development
      sameSite: "Lax", // Changed from None to Lax for local development
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
      path: '/', // Ensure cookie is available for all paths
    });

    // console.log("Cookie set successfully for admin:", email);

    res.json({
      message: "Login successful",
      userId: user._id,
      role,
      token: token, // Also send token in response for debugging
    });
  } 
  catch (error) {
    console.error("Admin Login failed:", error);
    res.status(500).json({ message: "Login failed. Please try again later." });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password, image } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with this email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({
      name: name || 'Admin',
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      image: image || "https://res.cloudinary.com/hiddendev/image/upload/v1738933705/userProfileImages/OIP_lrd61m.jpg",
      role: 'admin'
    });

    await newAdmin.save();

    // Send notification email to new admin
    try {
      await transporter.sendMail({
        from: `"LMS Admin Team" <${process.env.GMAIL_EMAIL}>`,
        to: email,
        subject: 'Welcome to LMS Admin Panel',
        html: `<p>Hi ${name || 'Admin'},</p>
               <p>Welcome to the LMS Admin Panel! Your admin account has been successfully created.</p>
               <p>Your login credentials:</p>
               <p>Email: ${email}</p>
               <p>Please keep your credentials secure and do not share them with anyone.</p>
               <p>Thank you!</p>`,
      });
      console.log('Welcome email sent to new admin');
    } catch (emailError) {
      console.error('Error sending welcome email to admin:', emailError);
    }

    // Send notification to main admin email
    try {
      await transporter.sendMail({
        from: `"LMS System" <${process.env.GMAIL_EMAIL}>`,
        to: process.env.ADMIN_EMAIL,
        subject: 'New Admin Account Created',
        html: `<p>A new admin account has been created:</p>
               <p>Name: ${name || 'Admin'}</p>
               <p>Email: ${email}</p>
               <p>Created at: ${new Date().toLocaleString()}</p>`,
      });
      console.log('Admin creation notification sent');
    } catch (adminEmailError) {
      console.error('Error sending admin notification email:', adminEmailError);
    }

    res.status(201).json({ 
      message: "Admin created successfully",
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
        createdAt: newAdmin.createdAt
      }
    });
  } catch (error) {
    console.error("Admin creation failed:", error);
    res.status(500).json({ message: "Admin creation failed. Please try again later." });
  }
};

// Helper function to create a test admin
exports.createTestAdmin = async (req, res) => {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: "admin@skillveda.com" });
    if (existingAdmin) {
      return res.status(400).json({ 
        message: "Test admin already exists",
        credentials: {
          email: "admin@skillveda.com",
          password: "admin123"
        }
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Create test admin
    const testAdmin = new Admin({
      name: 'Test Admin',
      email: "admin@skillveda.com",
      password: hashedPassword,
      role: 'admin'
    });

    await testAdmin.save();

    res.status(201).json({ 
      message: "Test admin created successfully",
      credentials: {
        email: "admin@skillveda.com",
        password: "admin123"
      }
    });
  } catch (error) {
    console.error("Test admin creation failed:", error);
    res.status(500).json({ message: "Test admin creation failed" });
  }
};

// Helper function to reset admin password
exports.resetAdminPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const newPassword = "admin123"; // Default password
    
    console.log(`Attempting to reset password for admin: ${email || "admin@example.com"}`);
    
    // Find admin
    const admin = await Admin.findOne({ email: email || "admin@example.com" });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update admin password
    admin.password = hashedPassword;
    await admin.save();

    console.log(`Password reset successful for admin: ${admin.email}`);

    res.status(200).json({ 
      message: "Admin password reset successfully",
      credentials: {
        email: admin.email,
        password: newPassword
      }
    });
  } catch (error) {
    console.error("Admin password reset failed:", error);
    res.status(500).json({ message: "Admin password reset failed" });
  }
};

// Temporary fix function - creates or updates admin with known password
exports.fixAdminLogin = async (req, res) => {
  try {
    console.log("Attempting to fix admin login...");
    
    const testEmail = "test@admin.com";
    const testPassword = "admin123";
    
    // Check if admin exists
    let admin = await Admin.findOne({ email: testEmail });
    
    if (admin) {
      console.log("Admin exists, updating password...");
      // Update existing admin
      const hashedPassword = await bcrypt.hash(testPassword, 10);
      admin.password = hashedPassword;
      await admin.save();
    } else {
      console.log("Creating new admin...");
      // Create new admin
      const hashedPassword = await bcrypt.hash(testPassword, 10);
      admin = new Admin({
        name: 'Test Admin',
        email: testEmail,
        password: hashedPassword,
        role: 'admin'
      });
      await admin.save();
    }

    console.log(`Admin fixed successfully: ${admin.email}`);

    res.status(200).json({ 
      message: "Admin login fixed successfully",
      credentials: {
        email: testEmail,
        password: testPassword,
        note: "Use these credentials to login"
      }
    });
  } catch (error) {
    console.error("Fix admin login failed:", error);
    res.status(500).json({ message: "Fix admin login failed", error: error.message });
  }
};


exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // Set to false for local development
      sameSite: "Lax", // Changed from None to Lax
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Logout failed" });
  }
};


exports.getUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    
    // console.log("GetUser request - Token present:", !!token);

    if (!token) {
      console.log("No token found in cookies");
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Token decoded successfully:", { userId: decoded.userId, role: decoded.role });
    
    res.json({ userId: decoded.userId, role: decoded.role });
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};


exports.getAdmin = async (req, res) => {
  try {
    // console.log("GetAdmin request received");
    // console.log("Request headers:", req.headers);
    // console.log("Request cookies:", req.cookies);
    
    let token = req.cookies.token;
    
    // If no token in cookies, check Authorization header
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7); // Remove 'Bearer ' prefix
        console.log("Token found in Authorization header");
      }
    } else {
      // console.log("Token found in cookies");
    }
    
    // console.log("GetAdmin request - Token present:", !!token);
    // console.log("Token value (first 20 chars):", token ? token.substring(0, 20) + "..." : "No token");

    if (!token) {
      console.log("No token found in cookies or Authorization header");
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Admin token decoded successfully:", { userId: decoded.userId, role: decoded.role });
    
    // Check if the user has admin role
    if (decoded.role !== 'admin') {
      console.log("User does not have admin role:", decoded.role);
      return res.status(403).json({ message: "Access denied. Admin role required." });
    }
    
    res.json({ userId: decoded.userId, role: decoded.role });
  } catch (error) {
    console.error("Admin token verification failed:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

