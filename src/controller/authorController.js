const authorModel = require("../model/authorModel");
const jwt = require("jsonwebtoken");


const validateEmail = function (email) {
    return (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/).test(email)

}

//================================================function Creation of Author Data ===========================



const createAuthor = async (req, res) => {
    try {
        let data = req.body;

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: " Date is require for Author Data Creation" });
        }
        
        if (!(data.fname)) {
            return res.status(400).send({ status: false, msg: "Enter your first Name" });
        }
        if (!(data.lname)) {
            return res.status(400).send({ status: false, msg: "Enter your last Name" });
        }
        if ((!data.title)) {
            return res.status(400).send({ status: false, msg: "Enter your title" });
        }
        if (!["Mr", "Miss", "Mrs"].includes(data.title)) {
            return res.status(400).send({ status: false, msg: "Title must be type of  ['Mr','Miss','Mrs']" })
        }
        if (!(data.email)) {
            return res.status(400).send({ status: false, msg: "Please Enter your Email id" });
        }
        if (!validateEmail(req.body.email))
        return res.status(400).send({ status: false, msg: "Please Enter a valid email" })
        req.body.email = req.body.email.toLowerCase()
        let emailExited = await authorModel.findOne({ email: data.email })

        if (emailExited) {
            return res.status(400).send({ status: false, msg: "This Email already exists, Please Try another !" });
        }
        if (!(data.password)) {
            return res.status(400).send({ status: false, msg: "Please Enter your password" });
        }

        let getAuthorData = await authorModel.create(data);
        res.status(201).send({ status: true, data: getAuthorData });

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}


// const getAuthor = async (req, res) => {
//     try {
               
//         let getAuthorData = await authorModel.find();
//         res.status(201).send({ status: true, data: getAuthorData });

//     } catch (err) {
//         res.status(500).send({ status: false, msg: err.message });
//     }
// }



module.exports = { createAuthor };


