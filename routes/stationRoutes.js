// Import the Express framework
const express = require('express')

// Create a new router instance
const router = express.Router();

// Import the Controller modules
const stationListController = require('./../controller/stationListController')

// Set up routes 
router.route("/").get(stationListController.getAllStation);



// Export the router instance for use in other parts of the application
module.exports = router