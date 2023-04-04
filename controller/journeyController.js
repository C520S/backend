// Imported the JourneyModel
const Journeys = require('./../models/journeyModel')





exports.getAllJourneys = async (req,res)=>{
 
    try{

        const  page = Number(req.query.page) || 1;
        const limit = req.query.limit * 1 || 15;
        const skip = (page -1)* limit
       

        // pagination 
        const journeysData = await Journeys.find().skip(skip).limit(limit)
        console.log(journeysData);
        res.status(200).json({
            status: 'success',
            results : journeysData.length,
            data: {
              journeysData
            }
      
          })
    }catch(err){
        res.status(404).json({
            status: 'failure',
            messgae: err.messgae
          }) 
    }

}