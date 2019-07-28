const Blog = require('../models/Blog');
const fs = require('fs');

exports.getBlogs = async (req, res, next) => {
  const blogs = await Blog.find().sort({ date: -1 });
  blogs.map(blog => blog.content = fs.readFileSync(blog.content));
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json(blogs);
};

exports.postBlog = async (title, content, image) => {
  new Blog({ title, content, image }).save();
};
