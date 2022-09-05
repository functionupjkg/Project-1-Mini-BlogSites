const blogsModel =require('../model/blogsModel')
const jwt = require('jsonwebtoken');



// --------------------Create Blogs Function ------------------------------------
const createBlogs = async function (req, res){
    let data = req.body
    let saveData = await blogsModel.create(data)
    res.status(201).send({status : true, msg: "Blogs created successfully", data:saveData});
    
}

//< -----------------------------------EXPORTING--------------------------------->//

module.exports.createBlogs=createBlogs;
