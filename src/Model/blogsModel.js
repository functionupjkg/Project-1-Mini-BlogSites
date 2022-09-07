const mongoose = require('mongoose')
const moment = require('moment')
const ObjectId = mongoose.Schema.Types.ObjectId


const blogsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
        
    },
    body: {
        type: String,
        required: true
    },
    authorId: {
        type: ObjectId,
        required: true,
        ref: "author"  //ObjectId here i take reference of author collection (linkings two document)
    },
    tags: [String],
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: [String]

    },
    deletedAt: {type: Date},
    isDeleted: {
        type: Boolean,
        default: false
    },
    publishedAt: {type: Date},
	
    isPublished: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });


module.exports = mongoose.model("blog", blogsSchema)

