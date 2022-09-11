const express = require('express');
const router = express.Router();
const authorController = require("../controller/authorController")
const blogsController = require("../controller/blogsController")
const midAuth = require ("../middleware/auth")




//<<----------------- BLOG Project ---------------------------->>

// Create Author Api -------------------------------------
router.post('/authors',  authorController.createAuthor )

//  Login Api ------------------------------------------------
router.post('/login', authorController.authorLogin)

// Create Blogs Api ---------------------------------------
router.post('/blogs', midAuth.authenticate , blogsController.createBlog)
router.get ('/blogs' , midAuth.authenticate , blogsController.getBlogs)

// Update Blogs Api ----------------------------------------
router.put('/blogs/:blogId', midAuth.authenticate ,  midAuth.authorise, blogsController.updateBlogs )

//   Delete Blog Api -----------------------------------------
router.delete('/blogs/:blogId', midAuth.authenticate , midAuth.authorise, blogsController.deleteByParams)
router.delete('/blogs', midAuth.authenticate ,  blogsController.deleteByQueryParams)










module.exports = router;
