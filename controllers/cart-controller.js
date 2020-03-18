const { findProductById } = require('./product-controller');

exports.getCart = function(req) {
    return (
        req.session.cart
        ? req.session.cart.filter(product => product != null)
        : []
    );
};

exports.postCart = function(req, res) {
    /* url check because any merch related post request will get to this function */
    if (req.originalUrl !== '/merch/cart') {
        return res.status(400).redirect('/merch');
    }
    const chosenProduct = {
        id: req.body.productID,
        quantity: parseInt(req.body.quantity),
        size: req.body.size,
        color: req.body.color
    };
    if (!req.session.cart || req.session.cart.length === 0) {
        req.session.cart = [chosenProduct];
    } else {
        const index = req.session.cart.findIndex(
            ({ id }) => id === chosenProduct.id
        );
        index >= 0 
        && req.session.cart[index].size === chosenProduct.size
        && req.session.cart[index].color === chosenProduct.color
            ? (req.session.cart[index].quantity += chosenProduct.quantity)
            : (req.session.cart = [...req.session.cart, chosenProduct]);
    }
    req.session.save(function(error){
        if (error) res.redirect('/')
        else res.redirect('/merch/cart');
    });
};

exports.getQuantity = function(cart) {
    let quantity = 0;
    if (cart && cart.length > 0) {
        for (const product of cart) {
            quantity += product.quantity;
        }
    }
    return quantity;
};

exports.getTotal = function(cart) {
    let total = 0;
    if (cart && cart.length > 0) {
        for (const product of cart) {
            if (!product.data) {
                throw Error(
                    'Cart needs to be populated. Please call '
                    + 'cartController.populateCart() first.'
                );
            }
            total += product.quantity * product.data.price;
        }
    }
    return total;
};

exports.populateCart = async function(cart) {
    try {
        return await Promise.all(
            cart.map(async product => ({
                data: await findProductById(product.id),
                quantity: product.quantity,
                size: product.size,
                color: product.color
            }))
        );
    } catch (error) {
        throw error;
    }
};

exports.emptyCart = async function(req, res, next) {
    req.session.cart = [];
    await req.session.save();
    next();
}

exports.remove = async function({ id, size, color }) {

}
