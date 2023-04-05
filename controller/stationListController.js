const StationListData  = require('./../models/stationModel')



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
            status: 'failure',
            messgae: error
          }) 
    }

}