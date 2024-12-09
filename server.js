// Import required modules
const express = require('express'); // Framework for building server-side applications
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const cors = require('cors'); // Middleware for enabling Cross-Origin Resource Sharing

// Create an Express application
const app = express();

// Define the port on which the server will run
const port = 3000;

// Initialize an object to store application data
let projectData = {};

// Middleware to parse incoming JSON data in request bodies
app.use(bodyParser.json());

// Middleware to enable CORS, allowing cross-origin requests
app.use(cors());

// Middleware to serve static files from the "website" directory
app.use(express.static('website'));

// Define a POST route to add data to the server
app.post('/add', (req, res) => {
    // Save the incoming data to the `projectData` object
    projectData = {
        temp: req.body.temp, // Temperature value
        date: req.body.date, // Date value
        feel: req.body.feel, // User's feelings
    };

    // Send a success response to the client
    res.send({ message: 'Data added successfully!' });
});

// Define a GET route to retrieve all stored data
app.get('/all', (req, res) => {
    // Send the `projectData` object as a response
    res.send(projectData);
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`); // Log a message to indicate the server is running
});
