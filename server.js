// server.js

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, numpeople, routenumber, time } = req.body;
    const data = `Name: ${name}, Number of People: ${numpeople}, Route Number: ${routenumber}, Time: ${time}\n`;

    // Append the form data to the "database.db" file
    fs.appendFile('database.db', data, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send('Form submitted successfully!');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});