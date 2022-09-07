const jwt = require('jsonwebtoken');
const authorModel = require('../controller/authorController');
const blogModel = require('../controller/blogsController');
const mongoose = require('mongoose');


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



//=================================== Authorisation ============================

// const authorise = function (req, res, next){
//    try{
//     if token = req.headers["x-Api-key"]
//     if(!token) token = req.headers ["x-api-key"];
//     if(!token) return res.status(400).send({status: false, msg : "Token must be present"});

//     let decodeToken = jwt.verify(token, "FunctionUp-Blog-Library", (err, decode) => {
//         if (err) {
//             re
//         }
//     })

// } catch (err) {
//     res.status(500).send({ status: false, msg: err.message });
// }
// }





module.exports.authenticate = authenticate