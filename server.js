const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 5500;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use a file-based SQLite database
const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to database');
    }
});

// Create the users table if it doesn't exist
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (name TEXT, num_people INTEGER, route_number TEXT, time TEXT)", (err) => {
        if (err) {
            console.error('Could not create table', err);
        } else {
            console.log('Table created or already exists');
        }
    });
});

// Handle form submission
app.post('/submit', (req, res) => {
    const name = req.body.name;
    const numPeople = req.body['num-people'];
    const routeNumber = req.body['route-number'];
    const time = req.body.time;
    db.run("INSERT INTO users (name, num_people, route_number, time) VALUES (?, ?, ?, ?)", [name, numPeople, routeNumber, time], (err) => {
        if (err) {
            console.error('Error inserting data', err);
            return res.status(500).send('Error submitting form');
        }
        res.status(200).send('Form submitted successfully');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

// Close the database connection when the server shuts down
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database', err);
        } else {
            console.log('Database connection closed');
        }
        process.exit(0);
    });
});