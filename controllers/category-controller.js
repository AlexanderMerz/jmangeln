const Category = require('../models/Category');
// const cloudinary = require('cloudinary').v2;

exports.getCategories = async (req, res) => {
    const categories = await Category.find();
    return res.status(200).json(categories);
};
