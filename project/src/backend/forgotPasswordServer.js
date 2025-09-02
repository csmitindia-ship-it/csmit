import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Temporary in-memory OTP store (you should use a database in real projects)
const otpStore = {};

// Nodemailer transporter (Gmail with App Password)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "csmitindia@gmail.com", // Your Gmail
    pass: "kjue fgfj pwqy fqvk",  // Your 16-digit App Password
  },
});

// Endpoint: Send OTP
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  console.log(`Generated OTP for ${email}: ${otp}`);

  const mailOptions = {
    from: "csmitindia@gmail.com",
    to: email,
    subject: "Your OTP for Password Reset",
    text: `Don't share your OTP with anyone. 
    Your OTP is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "OTP sent successfully to your email" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send OTP email" });
  }
});

// Endpoint: Verify OTP
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  if (otpStore[email] === otp) {
    delete otpStore[email]; // remove OTP after successful verification
    return res.json({ message: "OTP verified successfully" });
  }

  return res.status(400).json({ message: "Invalid OTP" });
});

// Endpoint: Reset Password
app.post("/reset-password", (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (!email || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "Email and passwords are required" });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // In a real app, you would save the new password to your database here.
  console.log(`Password for ${email} has been reset to: ${newPassword}`);

  res.json({ message: "Password reset successfully" });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});