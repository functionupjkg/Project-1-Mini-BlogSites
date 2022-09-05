const express = require('express');
const router = express.Router();
const blogsController =require("../controller/blogsController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/blogs",blogsController.createBlogs)
router.get("../getblog",blogsController.getblog)





module.exports = router;