////set up server with express
const express = require("express");
const morgan = require("morgan");

//Imported Routes
const journeyRoutes = require('./routes/journeyRoutes')

const app = express();
app.use(express.json());
//middleware
if(process.env.NODE_ENV === 'development')app.use(morgan('dev'))






app.use('/api/v1/journeys', journeyRoutes);


module.exports =app;