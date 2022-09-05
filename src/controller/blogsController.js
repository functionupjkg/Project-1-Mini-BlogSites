const authorModel = require("../Model/authorModel")

const blogsModel = require("../Model/blogsModel")

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

module.exports.getblog = getblog;