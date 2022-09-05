const express = require('express');
const router = express.Router();
// const CowinController = require("../controllers/cowinController")
// const WeatherController =require("../controllers/weatherController")
// const MemeController = require("../controllers/memeController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


//router.get("/cowin/states", CowinController.getStates)





module.exports = router;