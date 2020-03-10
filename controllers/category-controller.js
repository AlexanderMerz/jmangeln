const Category = require('../models/Category');

exports.getCategories = async () => await Category.find();
