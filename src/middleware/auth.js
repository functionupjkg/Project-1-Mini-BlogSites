const jwt = require('jsonwebtoken');
const authorModel = require('../controller/authorController');
const blogModel = require('../controller/blogsController');
const mongoose = require('mongoose');


//=======================================
const authenticate = async function (req, res){
    let userName = req.body.email;
    let user = req.body.authorModel.findOne({ email : userName })
    let token = jwt.sing(
        {
            userId : user._Id.toString(),
            Category : "Book",
            place : "Bibrary"

        },
        "Function-Blog-Library"
    );
    res.setHeader("x-auth-token", token);
    res.status(500).send({ status : true, data : token });
};



//=========





module.exports.authenticate = authenticate