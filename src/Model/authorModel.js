const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({

    fname: {
        type : String,
        required: true
    },
    lname: {
        type : String,
        required: true
    },
    title: {
        type : String,
         enum :  ["Mr", "Mrs", "Miss"],
         required: true
        },
        email: {
            type : String,
            require : true,
            unique : true
        },
        password: {
            type : String,
            require : true
        }


},{timestamp : true}); 

module.exports = mongoose.model("Author", authorSchema)