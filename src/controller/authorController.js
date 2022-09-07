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
            return res.status(400).send({ status: false, msg: "First Name is Mandatory : Please Enter..!!" });
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

        let validFname = /^[a-zA-Z]+(\s[a-zA-Z]+)$/   
        if(!validFname.test(req.body.fname)) {return res.status(400).send({message : "Error : First Name should be Alphabates Only."})}
       
        let validLname = /^[a-zA-Z]+(\s[a-zA-Z]+)$/ 
        if(!validLname.test(req.body.lname)) {return res.status(400).send({message : "Error : Last Name should be Alphabates Only."})}

        let validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!validEmail.test(req.body.email)) { return res.status(400).send({ message: "Invalid Email address, Email Should be Ex : [abcd@gmail.com]" }) }
      
        let validTitle = ['Mr', 'Mrs', 'Miss']
        if (!validTitle.includes(req.body.title)) { return res.status(400).send({ message: "invalid title" }) }
       
        let validPassword = /^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{6,20}$/
        if (!validPassword.test(req.body.password)) { return res.status(400).send({ message: "Invalid Password, It should be length(6-20) character [Ex - Abc@123]"  }) }

        let getAuthorData = await authorModel.create(data);
        res.status(201).send({ status: true, data: getAuthorData });



    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}



// const createAuthor = async function (req, res) {

//     try {
//         let data = req.body;
//         let { email, password, fname, lname, title } = data
//         if (!email) { res.status(400).send({ msg: "Email Id is Mandatory. Please Enter" }) }
//         if (!password) { res.status(400).send({ msg: "password is required" }) }
//         if (!fname) { res.status(400).send({ msg: "fname is required" }) }
//         if (!lname) { res.status(400).send({ msg: "lname is required" }) }
//         if (!title) { res.status(400).send({ msg: "title is required" }) }

//         let validFname = /[a-zA-Z]/g
//         if(!validFname.test(req.body.fname)) {return res.status(400).send({message : "Error : First Name should be Alphabates Only."})}
//         let validLname = /[a-zA-Z]/g
//         if(!validLname.test(req.body.lname)) {return res.status(400).send({message : "Error : Last Name should be Alphabates Only."})}

//         let validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//         if (!validEmail.test(req.body.email)) { return res.status(400).send({ message: "Invalid Email address, Email Should be Ex : [abcd@gmail.com]" }) }
//         let validTitle = ['Mr', 'Mrs', 'Miss']
//         if (!validTitle.includes(req.body.title)) { return res.status(400).send({ message: "invalid title" }) }
//         let validPassword = /^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{6,20}$/
//         if (!validPassword.test(req.body.password)) { return res.status(400).send({ message: "Invalid Password, It should be length(6-20) character [Ex - Abc@123]"  }) }



//         let createAuthor = await authorModel.create(data)
//         res.status(200).send({ data: createAuthor, status: true })

//     } catch (err) {
//         res.status(500).send({ msg: err.message })

//     }
// }


module.exports.createAuthor = createAuthor






module.exports = { createAuthor };


