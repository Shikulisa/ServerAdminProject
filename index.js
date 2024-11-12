require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
    connection.release();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.query(query, [email, hashedPassword], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send(err.sqlMessage);
            } else {
                res.status(200).send('User registered successfully');
            }
        });
    } catch(err){
        console.error(err);
        res.status(500).send(err);
    }
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    
    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage);
        } else if (results.length === 0) {
            res.status(401).send('Invalid email or password.');
        } else {
            const isPasswordCorrect = await bcrypt.compare(password, results[0].password);
            if (isPasswordCorrect) {
                res.status(200).send('Login successful');
            } else {
                res.status(401).send('Invalid password, try again.');
            }
        }
    });
});
