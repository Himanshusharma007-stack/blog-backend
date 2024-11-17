const express = require("express");
const blogController = require("../controllers/blog");
// const { validateJwt } = require("../middlewares/validatejwt");

const router = express.Router();

router.get("/", async (req, res) => {
  return blogController.getAllBlogs(req, res);
});

// Get a single blog by id
router.get("/:id", async (req, res) => {
  return blogController.getBlogById(req, res);
});

// Get the blogs data by authorMailId
router.post("/getblogdatabyauthormailid", async (req, res) => {
  return blogController.getBlogsByAuthorMailId(req, res);
});

router.post("/create", async (req, res) => {
  return blogController.createBlog(req, res);
});

router.put("/update", async (req, res) => {
  return blogController.updateBlog(req, res);
});

router.delete("/delete/:id", async (req, res) => {
  return blogController.deleteBlog(req, res);
});

module.exports = router;
