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
        size: req.body.size
    };
    if (!req.session.cart) {
        req.session.cart = [chosenProduct];
    } else {
        const index = req.session.cart.findIndex(
            ({ id }) => id === chosenProduct.id
        );
        index >= 0 && req.session.cart[index].size === chosenProduct.size
            ? (req.session.cart[index].quantity += chosenProduct.quantity)
            : (req.session.cart = [...req.session.cart, chosenProduct]);
    }
    req.session.save(function(error) {
        if (error) {
            console.log('Session Error: ', error);
            // TODO: Redirect to Error Page
            res.redirect('/');
        }
        return res.redirect('/merch/cart');
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
    for (const product of cart) {
        if (!product.data) {
            throw new Error(
                'Cart needs to be populated. Please call ' +
                    'cartController.populateCart() first.'
            );
        }
    }
    let total = 0;
    if (cart && cart.length > 0) {
        for (const product of cart) {
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
                size: product.size
            }))
        );
    } catch (error) {
        throw error;
    }
};
