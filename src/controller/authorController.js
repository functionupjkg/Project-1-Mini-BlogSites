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
        let validFname = /[a-zA-Z]/g   
        if(!validFname.test(req.body.fname)) {return res.status(400).send({status : false, msg : "Error : First Name should be Alphabates Only."})}
      
        let validLname = /[a-zA-Z]/g
        if(!validLname.test(req.body.lname)) {return res.status(400).send({status : false , msg: "Error : Last Name should be Alphabates Only."})}
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

        // let validPassword = /^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{6,15}$/
        // if (!validPassword.test(req.body.password)) { return res.status(400).send({ status : false , msg: "Invalid Password, It should be length(6-20) character [Ex - Abc@123]"  }) }
        if (!(data.password)) {
            return res.status(400).send({ status: false, msg: "Please Enter your password" });
        }
    

        let getAuthorData = await authorModel.create(data);
        res.status(201).send({ status: true, data: getAuthorData });


    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}

//============================================= Login User ===========================================

const userLogin = async function ( req, res, next ){
    let userName = req.body.email;
    let password = req.body.password;

    let user = await authorModel.findOne({email : userName, password : password});
    if (!user) {
        return res.send({ status: false, msg: " Your Credential not Valid" });
      } 
      next();
}




module.exports.createAuthor = createAuthor
module.exports.userLogin = userLogin; 









