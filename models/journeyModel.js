// Import the Mongoose module
const mongoose = require("mongoose");

// Define a schema for journeys
const journeySchema = new mongoose.Schema({
    
  departureTime: { type: String, trim: true },
  returnTime: { type: String, trim: true },
  departureStationId: { type: Number, trim: true },
  departureStationName: { type: String, trim: true },
  returnStationid: { type: Number, trim: true },
  returnStationName: { type: String, trim: true },
  coveredDistance: { type: Number, trim: true , min:[10, 'coveredDistance must be above 10m']},
  duration: { type: Number, trim: true,  min:[10, 'duration must be above 10s'],
 }
});

// Create a Mongoose model based on the journey schema
const Journeys = mongoose.model('Journeys', journeySchema)


// Export the Journeys model for use in other parts of the application
module.exports =  Journeys;