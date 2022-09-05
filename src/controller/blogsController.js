
const blogsModel = require("../Model/blogsModel")

const jwt = require('jsonwebtoken');
// --------------------Create Blogs Function ------------------------------------
const createBlogs = async function (req, res){
    let data = req.body
    let saveData = await blogsModel.create(data)
    res.status(201).send({status : true, msg: "Blogs created successfully", data:saveData});  
}
const getblog = async function (req, res) {
    let data = req.query
    let deleted = data.isdeleted
    let published = data.ispublished

    if (!deleted === "true") {
      res.status(200).send(deleted)
    }
    else if (published === "true") {
      res.status(200).send(published)
    }
    else {
        return res.status(401).send({ status: false, msg: "no document found" })
    }
}

module.exports.createBlogs=createBlogs;


module.exports.getblog = getblog;
