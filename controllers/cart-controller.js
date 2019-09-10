const productController = require('../controllers/product-controller');

exports.addToCart = async (req, res) => {
    const { id, quantity, meta } = JSON.parse(req.text);
    console.log(id, quantity, meta);
    if ([id, quantity, meta].some(param => param == undefined)) {
        return res.status(400).json({
            status: 400,
            message: 'Bitte eine Größe auswählen'
        });
    }
    // const product = await productController.findProductById(id)
    // console.log(product);
    // if (!product) {
    //     return res.status(404).end('Product not found');
    // }
    // Add to Shopping Cart
    // const cartItems = number
    // return res.json({ status: 200, data: { cartItems } });
    return res.json({ status: 200, message: 'Success' });
};

exports.getCart = (req, res) => res.redirect('/');
