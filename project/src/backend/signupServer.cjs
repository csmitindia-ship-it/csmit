const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL Database Connection
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
  } catch (error) {
    console.error('Error connecting to MySQL database:', error);
    process.exit(1); // Exit the process if connection fails
  }
}

// Endpoint to handle user signup
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

  // Basic validation
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'Full name, email, and password are required.' });
  }

  try {
    // In a real application, you should hash the password before storing it.
    // For example, using a library like bcrypt.
    const [result] = await db.execute(
      'INSERT INTO users (fullName, email, password, dob, mobile, college, department, yearOfPassing, state, district) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [fullName, email, password, dob, mobile, college, department, yearOfPassing, state, district]
    );

    res.status(201).json({ message: 'User created successfully', userId: result.insertId });
  } catch (error) {
    // Check for duplicate email
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Email already exists.' });
    }
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Failed to create user.' });
  }
});

const PORT = 5001; // Using a different port to avoid conflict with the other server

app.listen(PORT, () => {
  connectToDatabase();
  console.log(`Signup server is running on http://localhost:${PORT}`);
});
