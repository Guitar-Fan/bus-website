const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use a file-based SQLite database
const db = new sqlite3.Database('database.db');

// Create the users table if it doesn't exist
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (name TEXT, num_people INTEGER, route_number TEXT, time TEXT)");
});

// Serve index.html from a specific route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
    const name = req.body.name;
    const numPeople = req.body['num-people'];
    const routeNumber = req.body['route-number'];
    const time = req.body.time;
    db.run("INSERT INTO users (name, num_people, route_number, time) VALUES (?, ?, ?, ?)", [name, numPeople, routeNumber, time], (err) => {
        if (err) {
            return console.log(err.message);
        }
        res.status(200).send('Form submitted successfully');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});