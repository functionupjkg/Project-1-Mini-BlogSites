const authorModel = require("../Model/authorModel");
const jwt = require('jsonwebtoken')



// Regex for Email Validation--
const validateEmail = function (email) {
    return (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/).test(email)

}

//================================================function Creation of Author Data ===========================


const createAuthor = async (req, res) => {
    try {
        let data = req.body;

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: " Date is require for Author Data Creation" });
        }

        let validFname = /^[A-Za-z][A-Za-z-\s ][^\s-]+$/
        if (!validFname.test(req.body.fname)) { return res.status(400).send({ status: false, msg: "Error : First Name should be Alphabates Only." }) }
       
        if (!(data.fname)) {
            return res.status(400).send({ status: false, msg: "First Name is Mandatory : Please Enter..!!" });
        }

        let validLname =/^[A-Za-z][A-Za-z-\s ][^\s-]+$/
        if (!validLname.test(req.body.lname)) { return res.status(400).send({ status: false, msg: "Error : Last Name should be Alphabates Only." }) }
        
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

        req.body.email = req.body.email.toLowerCase() // if user send Email in uppercase so by using toLowerCase it convert auto lower case
        let emailExited = await authorModel.findOne({ email: data.email })

        if (emailExited) {
            return res.status(400).send({ status: false, msg: "This Email already exists, Please Try another !" });
        }

        if (!(data.password)) {
            return res.status(400).send({ status: false, msg: "Please Enter your password" });
        }
        let validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
        if (!validPassword.test(req.body.password)) { return res.status(400).send({ status: false, msg: "Invalid Password, It should be length(6-15) character [Ex - Abc@123]" }) }


        let getAuthorData = await authorModel.create(data);
        return res.status(201).send({ status: true, data: getAuthorData });


    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}

//============================================= Create Author Login Credential ===========================================

const authorLogin = async function (req, res) {
    try {

        let { email, password } = req.body
        if (!email)
            return res.status(400).send({ status: false, message: "EmailId is mandatory" })
        if (!password)
            return res.status(400).send({ status: false, message: "Password is mandatory" })
        let author = await authorModel.findOne({ email: email, password: password });
        if (!author)
            return res.status(401).send({ status: false, message: "Your Credencial is not valid." })
        let token = jwt.sign(
            {
                authorId: author._id.toString(),
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
module.exports.authorLogin = authorLogin;








