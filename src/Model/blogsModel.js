const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const blogsSchema = new mongoose.Schema({

    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    authorId: {
        type: ObjectId,
        require: true,
        refs: "Author"
    },
    tags: [String],
    category: {
        type: String,
        require: true
    },
    subcategory: {
        type: [String],

    },
    deletedAt:{
        type : Date
    },
    isDeleted: {
        type : Boolean,
        default: false
    }, 
    publishedAt: {
        type: Date
    },
    isPublished: {
        type : Boolean,
        default: false
    }
},{ timestamp: true });

module.exports = mongoose.model("Blog", blogsSchema)
