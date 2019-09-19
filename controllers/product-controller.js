const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;

exports.addProduct = async (req, res) => {
    const { name, price, description, image } = req.params;
    await new Product(name, price, description, image).save();
    return res.status(200).end();
};

exports.getProducts = async (req, res) => {
    const products = await Product.find();
    for (const product of products) {
        product.image = 'https://Placehold.it/500x200';
        // cloudinary.url(product.image).replace('http', 'https');
    }
    return res.status(200).json(products);
};

exports.findProductById = async id => await Product.findOne({ _id: id });

exports.findProductsByCategory = async category => await Product.find({ category });
