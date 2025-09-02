const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// --- Database Connection ---
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'csmit_db'
};

let db;

async function connectToDatabase() {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database.');
    await createTableIfNotExists();
  } catch (error) {
    console.error('Error connecting to MySQL database:', error);
    process.exit(1); // Exit the process if connection fails
  }
}

async function createTableIfNotExists() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      fullName VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      dob DATE,
      mobile VARCHAR(20),
      college VARCHAR(255),
      department VARCHAR(255),
      yearOfPassing INT,
      state VARCHAR(255),
      district VARCHAR(255),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await db.execute(createTableQuery);
    console.log('Users table is ready.');
  } catch (error) {
    console.error('Error creating users table:', error);
    process.exit(1);
  }
}

// --- Forgot Password Logic ---
const otpStore = {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "csmitindia@gmail.com",
    pass: "kjue fgfj pwqy fqvk",
  },
});

app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Check if user exists
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Email not found. Please sign up first." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;
    console.log(`Generated OTP for ${email}: ${otp}`);
    const mailOptions = {
      from: "csmitindia@gmail.com",
      to: email,
      subject: "Your OTP for Password Reset",
      text: `Your OTP is: ${otp}`,
    };
    await transporter.sendMail(mailOptions);
    res.json({ message: "OTP sent successfully to your email" });
  } catch (error) {
    console.error("Error in /send-otp:", error);
    res.status(500).json({ message: "Failed to send OTP email" });
  }
});

app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }
  if (otpStore[email] === otp) {
    delete otpStore[email];
    return res.json({ message: "OTP verified successfully" });
  }
  return res.status(400).json({ message: "Invalid OTP" });
});

app.post("/reset-password", async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;
  if (!email || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "Email and passwords are required" });
  }
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // In a real application, you should hash the password before storing it.
    await db.execute('UPDATE users SET password = ? WHERE email = ?', [newPassword, email]);
    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Failed to reset password" });
  }
});

// --- Signup Logic ---
app.post('/signup', async (req, res) => {
  const { 
    fullName, 
    email, 
    password, 
    dob, 
    mobile, 
    college, 
    department, 
    yearOfPassing, 
    state, 
    district 
  } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'Full name, email, and password are required.' });
  }

  try {
    // In a real application, you should hash the password before storing it.
    const [result] = await db.execute(
      'INSERT INTO users (fullName, email, password, dob, mobile, college, department, yearOfPassing, state, district) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [fullName, email, password, dob, mobile, college, department, yearOfPassing, state, district]
    );
    res.status(201).json({ message: 'User created successfully', userId: result.insertId });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Email already exists.' });
    }
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Failed to create user.' });
  }
});

// --- Start Server ---
const PORT = 5000;
app.listen(PORT, () => {
  connectToDatabase();
  console.log(`Unified server is running on http://localhost:${PORT}`);
});
