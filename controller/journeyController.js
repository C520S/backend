// Imported the JourneyModel
const Journeys = require("./../models/journeyModel");

exports.getAllJourneys = async (req, res) => {
  try {
    // Set up pagination variables based on the request parameters
    const page = Number(req.query.page) || 1;
    const limit = req.query.limit * 1 || 15;
    const skip = (page - 1) * limit;
    // Calculate the total number of pages of data
    let totalPNumofData = await Journeys.countDocuments();
    let totalPages = Math.trunc(totalPNumofData / limit);

    // Retrieve the journey data from the database, with optional search parameters if provided
    let journeysData = await Journeys.find().skip(skip).limit(limit);

    if (req.query.search) {
      // If search parameter is provided, use it to filter the data
      const search = req.query.search;
      console.log(search);
      journeysData = await Journeys.find({
        departureStationName: { $regex: search, $options: "i" },
      })
        .skip(skip)
        .limit(limit);

      totalPNumofData = await Journeys.countDocuments({
        departureStationName: { $regex: search, $options: "i" },
      });
      totalPages = Math.trunc(totalPNumofData / limit);

      // Throw an error if no data is found for the search
      if (!journeysData.length) {
        throw new Error("Cannot find the journey you need");
      }
    }

    // Send the response to the client with the journey data and pagination information
    res.status(200).json({
      status: "success",
      results: journeysData.length,
      data: {
        journeysData,
        totalPages,
      },
    });
  } catch (err) {
    // If there are any errors during the process, send an error response to the client
    let error = err.message; // Get the error message from the error object
    res.status(404).json({
      status: "Not Found",
      messgae: error,
    });
  }
};
