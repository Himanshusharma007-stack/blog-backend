const { createObjectId } = require("../utils/createObjectId");
const BlogSchema = require("../models/blog");

async function add(addObj) {
  try {
    return await BlogSchema.create(addObj);
  } catch (error) {
    console.error("Error ---> ", error);
    throw new Error(error);
  }
}

async function update(id, updateObj) {
  try {
    if (!id) throw new Error("Id not found for update.");
    updateObj.updatedAt = new Date(); // Set updatedAt to current time
    return await BlogSchema.updateOne(
      { _id: createObjectId(id) },
      { $set: updateObj }
    );
  } catch (error) {
    console.error("Error ---> ", error);
    throw new Error(error);
  }
}

async function deleteBlog(req, res) {
  try {
    let { id } = req.params || req.body;
    if (!id) throw new Error("Id not found for deletion.");
    const result = await BlogSchema.deleteOne({ _id: createObjectId(id) });

    res.send(
      result.acknowledged
        ? { success: true, msg: `Successfully delete blog.` }
        : { success: false, msg: `Error occur when deletion.` }
    );
  } catch (error) {
    console.error("Error ---> ", error);
    throw new Error(error);
  }
}

async function getAllBlogs(req, res) {
  try {
    const data = await BlogSchema.find({});
    res.send({ success: true, msg: "Successfully retrieved blog data.", data });
  } catch (error) {
    console.error("Error ---> ", error);
    res.status(500).send(error);
  }
}

async function getBlogsByAuthorMailId(req, res) {
  try {
    let { email } = req.body
    const data = await BlogSchema.find({'createdBy': email});
    res.send({ success: true, msg: "Successfully retrieved blog data by author id.", data });
  } catch (error) {
    console.error("Error ---> ", error);
    res.status(500).send(error);
  }
}

async function getBlogById(req, res) {
  try {
    const blogId = req.params.id; // Get the blog id from the URL parameter
    if (!blogId) {
      return res.status(400).send({ success: false, msg: "Blog ID is required." });
    }

    // Find the blog by its id
    const blog = await BlogSchema.findById(blogId);

    if (!blog) {
      return res.status(404).send({ success: false, msg: "Blog not found." });
    }

    res.send({ success: true, msg: "Successfully retrieved blog data.", data: blog });
  } catch (error) {
    console.error("Error ---> ", error);
    res.status(500).send({ success: false, msg: "Error fetching blog", error: error.message });
  }
}

async function createBlog(req, res) {
  try {
    debugger
    const { loggedinuserid } = req.headers;
    const { title, desc } = req.body;
    const obj = {
      title,
      desc,
      createdBy: loggedinuserid,
    };
    const data = await add(obj);
    res.send({ success: true, msg: "Successfully created blog data.", data });
  } catch (error) {
    console.error("Error ---> ", error);
    res.status(500).send(error);
  } 
}

async function updateBlog(req, res) {
  try {
    debugger
    const { loggedinuserid } = req.headers;
    const { _id, title, desc } = req.body;
    if (!_id) res.send({ success: false, msg: "Id not found." });
    const obj = {
      title,
      desc,
      updatedBy: loggedinuserid,
    };
    const data = await update(_id, obj); 
    res.send({ success: true, msg: "Successfully updated blog data.", data });
  } catch (error) {
    console.error("Error ---> ", error);
    res.status(500).send(error);
  }
}

module.exports = {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogById,
  getBlogsByAuthorMailId
};
