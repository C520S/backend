const StationListData  = require('./../models/stationModel')
const Journeys = require('./../models/journeyModel')


exports.getAllStation = async  (req,res) =>{
    try{
       
        const  page = Number(req.query.page) || 1;
        const limit = req.query.limit * 1 || 10;
        const skip = (page -1)* limit
      
      
        let stationListData = await StationListData.find().skip(skip).limit(limit);
       
      
        if(req.query.search){
       
          const search = req.query.search
          console.log(search);
          stationListData = await StationListData.find({nimi: {$regex: search, $options: "i"}}).skip(skip).limit(limit)

     
        if(!stationListData.length){
          throw new Error("Cannot find the station data you need")
        }
      }
      

        
      
        const totalPNumofData = await StationListData.countDocuments();
        const totalPages = Math.trunc(totalPNumofData / limit)
      
       res.status(200).json({
            status: 'success',
            results : stationListData.length,
            data: {
                stationListData,
              totalPages
            }
      
          })
    }catch(err){
    
      let error = err.message 
        res.status(404).json({
            status: 'Not Found',
            messgae: error
          }) 
    }

}

exports.getSingleStationView = async (req,res) =>{

try{
    const {stationName} = req.params
   
    
    let  stationData = await StationListData.find({nimi: stationName})
         stationData = stationData[0]
    
    const  stationDepartureNum = await Journeys.countDocuments({departureStationName: stationName})
    
    const  stationArrivalNum = await Journeys.countDocuments({returnStationName: stationName})
    
    
    let  averageDistanceofstationDeparture = await Journeys.aggregate([
        {$match :{departureStationName: stationName}},
        { $group:{_id: null, average:{$avg : '$coveredDistance'}} }
    ])

    averageDistanceofstationDeparture = Math.trunc(averageDistanceofstationDeparture[0].average)


    let averageDistanceofstationArrival = await Journeys.aggregate([
        {$match :{returnStationName: stationName}},
        { $group:{_id: null, average:{$avg : '$coveredDistance'}} }
        
    ])

    averageDistanceofstationArrival = Math.trunc(averageDistanceofstationArrival[0].average)


    const popular5startResults = await Journeys.aggregate([
        { $match: {departureStationName: stationName } },
        {
            $group: {
                _id: "$returnStationName",
                count: { $sum: 1 }
              }
        },
        { $sort: { count: -1 } },
        { $limit: 5 }
    ])
    const popular5start = popular5startResults.map(item => item._id).join(',')

    const popular5endResults =await Journeys.aggregate([
        { $match: { returnStationName: stationName } },
        {
            $group: {
                _id: "$departureStationName",
                count: { $sum: 1 }
              }
        },
        { $sort: { count: -1 } },
        { $limit: 5 }
    ])
    const popular5end =popular5endResults.map(item => item._id).join(',')
    
    // console.log(stationData);
    // console.log(stationDepartureNum);
    // console.log(stationArrivalNum);
    // console.log(averageDistanceofstationDeparture);
    // console.log(averageDistanceofstationArrival);
    // console.log(popular5start);
    // console.log(popular5end );

   const  singleStationViewData = {
    stationData,
    stationDepartureNum,
    stationArrivalNum,
    averageDistanceofstationDeparture,
    averageDistanceofstationArrival,
    popular5start,
    popular5end,
   }
  

   res.status(200).json({
    status: 'success',
    singleStationViewData, 
    

  })

}catch(err){
     
    let error = err.message 
    res.status(500).json({
        status: 'Internal Server Error',
        messgae: error
      }) 
   
}


}