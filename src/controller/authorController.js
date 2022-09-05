const authorModel =require('../model/authorModel')
const jwt = require('jsonwebtoken');
const { model, modelNames } = require('mongoose');

const creatAuthor = async function (req, res){
    let data = req.body
    if (Object.keys(data).length == 0)return res.status(404).send({status:false,msg:"please provided the data"});
    let saveData = await authorModel.create(data)
    res.status(201).send({status:true,msg:"Author created successfully",data:saveData});
    
}

//< -----------------------------------EXPORTING--------------------------------->//

module.exports.creatAuthor=creatAuthor;