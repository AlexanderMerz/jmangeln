const { findProductById } = require('../controllers/product-controller');

exports.getCart = req => req.session.cart || [];

exports.postCart = (req, res) => {
    const chosenProduct = {
        id: req.body.productID,
        quantity: Number(req.body.quantity),
        size: req.body.size
    };
    if (!req.session.cart) {
 req.session.cart = [chosenProduct]; 
} else {
        const index = req.session.cart.findIndex(({ id }) => id === chosenProduct.id);
        if (index >= 0 && req.session.cart[index].size === chosenProduct.size) {
            req.session.cart[index].quantity += chosenProduct.quantity;
        } else {
            req.session.cart = [
...req.session.cart,
chosenProduct
];
        }
    }
    res.redirect('/merch/cart');
};

exports.getQuantity = cart => {
    let quantity = 0;
    if (cart && cart.length > 0) {
        for (const product of cart) {
            quantity += product.quantity;
        }
    }
    return quantity;
};

exports.getTotal = cart => {
    let total = 0;
    if (cart && cart.length > 0) {
        for (const product of cart) {
            total += product.quantity * product.data.price;
        }
    }
    return total;
};

exports.populateCart = async cart => await Promise.all(cart.map(async product => ({
                data: await findProductById(product.id),
                quantity: product.quantity,
                size: product.size
            })));

