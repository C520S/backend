// Import the Express framework
const express = require("express");

// Create a new router instance
const router = express.Router();

// Import the Controller modules
const journeyController = require("./../controller/journeyController");

// Set up routes
router.route("/").get(journeyController.getAllJourneys);

// Export the router instance for use in other parts of the application
module.exports = router;
