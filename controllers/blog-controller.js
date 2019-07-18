const Blog = require('../models/Blog');
const path = require('path');

exports.getBlogs = async (req, res, next) => {
  const blogs = await Blog.find().sort({ date: -1 });
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json(blogs);
};

exports.postBlog = async (req, res, next) => {
  const { title, content } = req.body;
  const imageUrl = path.sep + req.file.path;
  if (!title || !content || !imageUrl) res.redirect('/');
  const blog = new Blog({ title, content, image });
  blog.save(err => {
    if (err) return res.redirect('/');
    else return res.render('success');
  });
};
