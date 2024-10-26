const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const app = express();

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Connect to MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your DB username
    password: '', // Replace with your DB password
    database: 'serveradminproject' // Replace with your DB name
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database');
});

// Endpoint to handle signup
app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(query, [email, password], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            res.status(200).send('User registered successfully');
        }
    });
});

// Endpoint to handle login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else if (results.length > 0) {
            // Successful login
            res.status(200).send('Login successful');
        } else {
            // Invalid credentials
            res.status(401).send('Invalid email or password');
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
