
require('dotenv').config();

const baseUrl = process.env.BASE_URL;

// Signup Form Submission
document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.text();
        alert(data); // Show the response from the server
    } catch (error) {
        console.error('Error:', error);
    }
});

// Login Form Submission
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.text();
        alert(data); // Show the response from the server

        // If login is successful, you can redirect or do other actions here
    } catch (error) {
        console.error('Error:', error);
    }
});