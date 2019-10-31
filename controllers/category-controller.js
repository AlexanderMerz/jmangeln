const Category = require('../models/Category');
// const cloudinary = require('cloudinary').v2;

exports.getCategories = async () => await Category.find();
