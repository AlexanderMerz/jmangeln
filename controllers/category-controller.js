const Category = require('../models/Category');
// const cloudinary = require('cloudinary').v2;

exports.getCategories = async (req, res) => {
    // let categories = await Category.find();
    // console.log(categories);
    // for (const category of categories) {
    //     category.image = 'https://Placehold.it/500x200';
    // }
    return res.status(200).json([]);
};
