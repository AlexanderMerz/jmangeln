const Product = require('../models/Product');

exports.addProduct = async function(req, res) {
    // const { name, price, description, image } = req.params;
    // await new Product(name, price, description, image).save();
    return res.status(200).end('Add Product');
};

exports.getProducts = async function(req, res) {
    return await Product.find();
};

exports.findProductById = async function (_id) {
    return await Product.findOne({ _id });
}

exports.updateProduct = async function(product) {
    try {
        await Product.findOneAndUpdate({_id: product.id }, product);
    }
    catch (error) {
        throw error;
    }
}