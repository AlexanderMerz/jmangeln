const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
    const { name, price, description, image } = req.params;
    await new Product(name, price, description, image).save();
    return res.status(200).end();
};

exports.getProducts = async (req, res) => {
    const products = await Product.find().sort({ release: -1 });
    return res.status(200).json(products);
};

exports.findProductById = async (req, res) => {
    const product = await BlogPost.findOne({ id: req.params.id });
    return res.status(200).json(product);
};
