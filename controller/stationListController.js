// Require the StationListData and Journeys models
const StationListData = require("./../models/stationModel");
const Journeys = require("./../models/journeyModel");

// Controller function to get all station data
exports.getAllStation = async (req, res) => {
  try {
    // Calculate the number of documents to skip based on the page and limit
    const page = Number(req.query.page) || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    let stationListData = await StationListData.find().skip(skip).limit(limit);
    // Get the total number of documents in the StationListData model
    let totalPNumofData = await StationListData.countDocuments();
    let totalPages = Math.trunc(totalPNumofData / limit);

    // Check if there is a search query in the request parameters
    if (req.query.search) {
      const search = req.query.search;
      console.log(search);
      stationListData = await StationListData.find({
        nimi: { $regex: search, $options: "i" },
      })
        .skip(skip)
        .limit(limit);
        totalPNumofData = await StationListData.countDocuments({
          nimi: { $regex: search, $options: "i" },
        });
        totalPages = Math.trunc(totalPNumofData / limit);

      // If no data is returned from the search query, throw an error
      if (!stationListData.length) {
        throw new Error("Cannot find the station data you need");
      }
    }

  

    res.status(200).json({
      status: "success",
      results: stationListData.length,
      data: {
        stationListData,
        totalPages,
      },
    });
  } catch (err) {
    let error = err.message;
    res.status(404).json({
      status: "Not Found",
      messgae: error,
    });
  }
};
// This function is used to retrieve data about a single station, based on its name.
exports.getSingleStationView = async (req, res) => {
  try {
    // Extract the name of the station from the request parameters
    const { stationName } = req.params;

    // Retrieve data about the station from the database
    let stationData = await StationListData.find({ nimi: stationName });
    stationData = stationData[0];
    // Count the number of departures and arrivals for this station
    const stationDepartureNum = await Journeys.countDocuments({
      departureStationName: stationName,
    });
    const stationArrivalNum = await Journeys.countDocuments({
      returnStationName: stationName,
    });

    // Calculate the average distance of journeys that depart from this station
    let averageDistanceofstationDeparture = await Journeys.aggregate([
      { $match: { departureStationName: stationName } },
      { $group: { _id: null, average: { $avg: "$coveredDistance" } } },
    ]);

    averageDistanceofstationDeparture = Math.trunc(
      averageDistanceofstationDeparture[0].average
    );

    // Calculate the average distance of journeys that arrive at this station
    let averageDistanceofstationArrival = await Journeys.aggregate([
      { $match: { returnStationName: stationName } },
      { $group: { _id: null, average: { $avg: "$coveredDistance" } } },
    ]);

    averageDistanceofstationArrival = Math.trunc(
      averageDistanceofstationArrival[0].average
    );

    // Find the top 5 most popular destinations from this station
    const popular5startResults = await Journeys.aggregate([
      { $match: { departureStationName: stationName } },
      {
        $group: {
          _id: "$returnStationName",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    const popular5start = popular5startResults
      .map((item) => item._id)
      .join(",");

    // Find the top 5 most popular starting points for journeys to this station
    const popular5endResults = await Journeys.aggregate([
      { $match: { returnStationName: stationName } },
      {
        $group: {
          _id: "$departureStationName",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    const popular5end = popular5endResults.map((item) => item._id).join(",");

    // console.log(stationData);
    // console.log(stationDepartureNum);
    // console.log(stationArrivalNum);
    // console.log(averageDistanceofstationDeparture);
    // console.log(averageDistanceofstationArrival);
    // console.log(popular5start);
    // console.log(popular5end );

    // Assemble all the data into an object to be returned
    const singleStationViewData = {
      stationData,
      stationDepartureNum,
      stationArrivalNum,
      averageDistanceofstationDeparture,
      averageDistanceofstationArrival,
      popular5start,
      popular5end,
    };

    // Send the response to the client with the data
    res.status(200).json({
      status: "success",
      singleStationViewData,
    });
  } catch (err) {
    // Handle any errors that occur during the process
    let error = err.message;
    res.status(500).json({
      status: "Internal Server Error",
      messgae: error,
    });
  }
};
