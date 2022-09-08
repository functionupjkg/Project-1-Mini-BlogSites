const authorModel = require("../Model/authorModel");
const jwt = require('jsonwebtoken')


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
        if(Object.keys(data) != JSON.parse)
        return res.status(400).send({ status: false, msg: " Wrong Input" });

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

        let validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
        if (!validPassword.test(req.body.password)) { return res.status(400).send({ status : false , msg: "Invalid Password, It should be length(6-20) character [Ex - Abc@123]"  }) }
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

const userLogin = async function (req, res) {
    try {

        
            let { email, password } = req.body
            if (!email) return res.status(400).send({ status: false, message: "EmailId is mandatory" })
            if (!password) return res.status(400).send({ status: false, message: "Password is mandatory" })
            let authorCheck = await authorModel.findOne({ email: email, password: password });
            if (!authorCheck) return res.status(400).send({ status: false, message: "Your Credencial is not valid." })
            let token = jwt.sign(
                {
                    authorId: authorCheck._id.toString(),
                    batch: "Plutonium",
                    organisation: "FunctionUp-Blog"
                },
                "FunctionUp-Blog-Library"
            );
            return res.status(201).send({ status: true, message: token })
        }
        catch (error) {
            res.status(500).send({ status: false, message: error.message })
        }
    }
    





module.exports.createAuthor = createAuthor
module.exports.userLogin = userLogin; 









