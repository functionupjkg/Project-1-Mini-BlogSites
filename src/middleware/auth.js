const jwt = require('jsonwebtoken');
const authorModel = require('../controller/authorController');
const blogModel = require('../controller/blogsController');
const mongoose = require('mongoose');
const { listeners } = require('../model/blogsModel');


//======================================= Authencation ====================================

const authenticate = async function (req, res, next) {
    try {
        let token = req.headers["x-Api-key"];
        if (!token) token = req.headers["x-api-key"];
        if (!token) return res.status(400).send({ status: false, msg: "Token must be present" });

        let decodeToken = jwt.verify(token, "FunctionUp-Blog-Library", (err, decode) => {
            if (err) {
                return res.status(400).send({status : false, msg : "Error : Invalid Token or Expired Token"})
            } (decode == true)
            next()
        });
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
};



///=================================== Authorisation ============================

const authorise = async function (req, res, next) {
    try {
        let token = req.headers["x-Api-key"]
        if (!token) token = req.headers["x-api-key"];
   
        let decodeToken = jwt.verify(token, "FunctionUp-Blog-Library")
        let userLoggedIn = decodeToken.authorId

        let blogId =req.params.blogId
        if(!mongoose.Types.ObjectId.isValid(blogId))
        return res.status(400).send({status : false , msg : "BlogId is Invalid.. Please Enter Correct BlogId"});

        let findBlog = await blogModel.findById(blogId);
        if(!findBlog)
        return res.status(404).send({status : false, msg : "No Such Blog Available."})

        if(findBlog.authorId.toString() !== userLoggedIn)
        return res.status(403).send({status:false, msg : "Unauthorized Author, You can't change / Delelte to ohters Blog"});

        next();
       

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}


  



module.exports.authenticate = authenticate;
module.exports.authorise = authorise;