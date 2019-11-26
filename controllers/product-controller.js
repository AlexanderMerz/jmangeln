const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;

exports.addProduct = async (req, res) => {
    const { name, price, description, image } = req.params;
    await new Product(name, price, description, image).save();
    return res.status(200).end();
};

exports.getProducts = async (req, res) => {
    return Array.from(await Product.find())
        .map((product) => loadImageAndReturn(product));
};

exports.findProductById = async _id => {
    return loadImageAndReturn(await Product.findOne({ _id }));
}

exports.findProductsByCategory = async category => {
    return Array.from(await Product.find({ category }))
        .map((product) => loadImageAndReturn(product));
}

function loadImageAndReturn(product) {
    product.image = cloudinary
        .url(product.image)
        .replace('http', 'https')
        .trim();
    return product;
}
