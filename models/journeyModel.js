const mongoose = require("mongoose");

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


const Journeys = mongoose.model('Journeys', journeySchema)
// const test = new Journeys({
//   departureTime: '2312312'
// })

// test.save().then(doc => {
//   console.log(doc);
// }).catch(err =>console.log(err))

module.exports =  Journeys;