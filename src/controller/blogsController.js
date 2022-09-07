const authorModel = require("../model/authorModel");
const blogModel = require("../model/blogsModel");
const mongoose = require('mongoose')

const verify = function (Id) {
  if (!mongoose.Types.ObjectId.isValid(Id)) {
    return false
  }
  return (true)
}


//========================CREATE BLOGS===================================

const createBlog = async (req, res) => {
  try {
    let data = req.body;

    if (Object.keys(data).length == 0) {
      return res.status(400).send({ status: false, msg: "Data is required for Blog Creation" });
    }
    if (!data.title)
      return res.status(400).send({ status: false, msg: "Please Enter Book Title" });
    if (!data.body)
      return res.status(400).send({ status: false, msg: "Please Enter the Book Description" });
    if (!data.authorId)
      return res.status(400).send({ status: false, msg: "Author ID is Mandatory" });


      if (data.authorId) {
        if (!verify(data.authorId)) {
          return res.status(404).send({ status: false, msg: "Please Enter Valid Author Id " })
        } else {
          req.body.authorId = data.authorId
        }
      }

    if (!data.category)
      return res.status(400).send({ status: false, msg: "Please Enter book Category" });

    let getAuthorData = await authorModel.findById(data.authorId);

    if (!getAuthorData)
      return res.status(404).send({ status: false, msg: "No such author found" });

    let getBlogData = await blogModel.create(data);

    res.status(201).send({ status: true, data: getBlogData });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
}

//==================================  Get Blogs  =========================================

const getBlogs = async function (req, res) {

  try {

    let data = req.query;
    let result = {
      isDeleted: false,
      isPublished: true,
      ...data,
    };

    let blogs = await blogModel.find(result)
    console.log(blogs)

    if (blogs.length === 0) {
      res.status(404).send({ msg: "No Such Blogs are present !!" })
    } else {
      res.status(200).send({ status: true, data: blogs })
    }
  }
  catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
}


//===================================  PUT UPDATE BLOGs ======================================


const updateBlogs = async function (req, res) {
  try {
    let data = req.body
    let id = req.params.blogId

    if (Object.keys(data).length == 0)
      return res.status(400).send({ status: false, msg: "Please Enter Blog Details For Updating" })

    if (!id)
      return res.status(400).send({ status: false, msg: "Blog Id is required" })

    let findBlog = await blogModel.findById(id)

    if (findBlog.isDeleted == true) res.status(404).send({ msg: "blogs already deleted" })

    let updatedBlog = await blogModel.findOneAndUpdate({ _id: id }, {
      $set: {
        title: data.title,
        body: data.body,
        category: data.category,
        publishedAt: new Date(),
        isPublished: true
      },
      $push: {
        tags: req.body.tags,
        subcategory: req.body.subcategory
      }
    }, { new: true, upsert: true })
    return res.status(200).send(updatedBlog)
  }
  catch (err) {
    res.status(500).send({ status: false, msg: err.message })
  }
};

//================================ Delete Blog by Params =====================================

const deleteByParams = async function (req, res) {
  try {
    let id = req.params.blogId;
    const allBlogs = await blogModel.findOne({ _id: id, isDeleted: false });
    if (!allBlogs) {
      return res.status(404).send({ status: false, msg: "This blog is not found or deleted." });
    }
    let date = new Date();
    allBlogs.isDeleted = true;
    res.status(200).send({ status: true, msg: "Successfully Blog Deleted" });

  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};


//================================ Delete By Query Params =========================================
const deleteByQueryParams = async function (req, res) {
  try {
    let data = req.query
    if (!data) {
      return res.status(400).send({ status: false, msg: " Atleast One Data is required..! " })
    }
    let query = { isDeleted: false, isPublished: false }
    if (data.authorId) {
      if (!verify(data.authorId)) {
        return res.status(404).send({ status: false, msg: "Please Enter Valid Author Id " })
      } else {
        query.authorId = data.authorId
      }
    }
    if (data.tags) query.tags = { $in: data.tags }
    console.log(query.tags)

    if (data.category) query.category = data.category

    if (data.subcategory) query.subcategory = data.subcategory

    const getData = await blogModel.findOneAndUpdate(query, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })
    console.log(getData)
    if (getData) {
      res.status(200).send({ status: true, data: getData })
    } else {
      res.status(404).send({ status: false, msg: "Error : Data Not Found.. Try again" })
    }
  }
  catch (err) {
    return res.status(500).send({ msg: err.message })
  }
}


//============================= Exports Module functions  ==========================//

module.exports.createBlog = createBlog;
module.exports.updateBlogs = updateBlogs;
module.exports.getBlogs = getBlogs;
module.exports.deleteByParams = deleteByParams;
module.exports.deleteByQueryParams = deleteByQueryParams;