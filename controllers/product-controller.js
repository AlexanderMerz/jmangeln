const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;

exports.addProduct = async (req, res) => {
    const { name, price, description, image } = req.params;
    await new Product(name, price, description, image).save();
    return res.status(200).end();
};

exports.getProducts = async (req, res) => {
    let products = await Product.find();
    for (let product of products) {
        product.image = cloudinary.url(product.image);
    }
    console.log(products);
    return res.status(200).json(products);
};

exports.findProductById = async (req, res) => {
    const product = await BlogPost.findOne({ id: req.params.id });
    return res.status(200).json(product);
};