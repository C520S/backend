const express = require('express')
const router = express.Router()

const  journeyController = require('./../controller/journeyController')



router.route("/").get(journeyController.getAllJourneys);


module.exports =router