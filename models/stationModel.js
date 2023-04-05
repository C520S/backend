// Import the Mongoose module
const mongoose = require("mongoose");

// Define a schema for station

const stationListSchema = new mongoose.Schema({
    fid: { type: Number, trim: true },
    id: { type: Number, trim: true },
    nimi: { type: String, trim: true },
    Namn:{ type: String, trim: true },
    Name:{ type: String, trim: true },
    osoite: { type: String, trim: true },
    adress: { type: String, trim: true },
    kaupunki: { type: String, trim: true },
    Stad:{ type: String, trim: true },
   operaattor:{ type: String, trim: true },
   kapasiteet: { type: Number, trim: true },
    x: { type: Number, trim: true },
    y: { type: Number, trim: true },
  });


// Create a Mongoose model based on the stationListSchema
const  StationListData = mongoose.model('StationListData', stationListSchema)

  


// Export the station model for use in other parts of the application
module.exports = StationListData