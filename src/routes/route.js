const express = require('express');
const router = express.Router();
 const authorController = require("../controller/authorController")
 const blogsController = require("../controller/blogsController");
// const WeatherController =require("../controller/weatherController")
// const MemeController = require("../controllers/memeController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.post("/authors", authorController.createAuthor)
router.post("/blogs", blogsController.createBlogs)




module.exports = router;