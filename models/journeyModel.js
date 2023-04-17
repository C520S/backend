// Import the Mongoose module
const mongoose = require("mongoose");

// Define a schema for journeys
const journeySchema = new mongoose.Schema({
  departureTime: { type: String, trim: true, required: true },
  returnTime: { type: String, trim: true, required: true },
  departureStationId: { type: Number, trim: true, required: true },
  departureStationName: { type: String, trim: true, required: true },
  returnStationid: { type: Number, trim: true, required: true },
  returnStationName: { type: String, trim: true, required: true },
  coveredDistance: {
    type: Number,
    trim: true,
    required: true,
    min: [10, "coveredDistance must be above 10m"],
  },
  duration: {
    type: Number,
    trim: true,
    required: true,
    min: [10, "duration must be above 10s"],
  },
});


// Create a Mongoose model based on the journey schema
const Journeys = mongoose.model("Journeys", journeySchema);

// Export the Journeys model for use in other parts of the application
module.exports = Journeys;
