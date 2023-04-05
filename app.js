
// Import the necessary modules for the application
const express = require("express"); // Import the Express framework
const morgan = require("morgan"); // Import the Morgan middleware for logging


// Import custom modules for handling requests
const journeyRoutes = require('./routes/journeyRoutes'); // Import the journeyRoutes module
const stationRoutes  = require('./routes/stationRoutes')
// Create a new instance of the Express application
const app = express(); 

// Register middleware for parsing incoming JSON data
app.use(express.json()); 

// Register Morgan middleware for logging HTTP requests in development environment
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); 
}

// Register the module base URL path
app.use('/api/v1/journeys', journeyRoutes);
app.use('/api/v1/stationList', stationRoutes)

// Export the Express application to be used in other modules
module.exports = app;
