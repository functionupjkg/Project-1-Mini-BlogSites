const express = require('express');
const router = express.Router();
const authorController = require("../controller/authorController")
const blogsController = require("../controller/blogsController")



//<<----------------- BLOG Project ---------------------------->>


// Create Author Api -------------------------------------
router.post('/authors', authorController.createAuthor )

// Create Blogs Api ---------------------------------------
router.post('/blogs', blogsController.createBlog)
router.get ('/blogs' , blogsController.getBlogs)

// Update Blogs Api ----------------------------------------
router.put('/blogs/:blogId', blogsController.updateBlogs )

//   Get Blog Api -----------------------------------------
router.delete("/blogs/:blogId",blogsController.deleteByParams)
router.delete("/blogs", blogsController.deleteByQueryParams)








module.exports = router;
