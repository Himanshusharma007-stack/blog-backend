const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: Date,
    },
    updatedBy: {
      type: String,
    },
  },
  {
    versionKey: false, // Disable the __v field
  }
);

// Automatically set the updatedAt field to the current date on every update
blogSchema.pre("save", function (next) {
  if (!this.isNew && this.isModified()) {
    this.updatedAt = Date.now();
  }
  next();
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
