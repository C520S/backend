// Import the required modules
const mongoose = require('mongoose');
const dotenv = require('dotenv')

// Load environment variables from configuration file
dotenv.config({path: './config.env'})

// Import the app module
const  app = require('./app')

// Get the database connection URL from environment variables
const DB = process.env.DATABASE

// Connect to the MongoDB database
mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>{
  console.log('DB connection successful');
}).catch(err => console.log(err))

// Get the port number from environment variables or use the default port 3000
const port = process.env.PORT || 3000;

// Start the web server
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
