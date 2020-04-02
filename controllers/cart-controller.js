const { findProductById } = require('./product-controller');

exports.getCart = function(req) {
    return req.session.cart
        ? req.session.cart.filter(product => product != null)
        : [];
};

exports.postCart = async function(req) {
    if (req.originalUrl !== '/merch/cart') {
        return res.status(400).redirect('/merch');
    }

    const { productID: id, size, color } = req.body;
    let quantity = parseInt(req.body.quantity);

    const chosenProduct = { id, quantity, size, color };

    if (!req.session.cart || req.session.cart.length === 0) {
        req.session.cart = [chosenProduct];
    } else {
        let { stock } = await findProductById(id);
        if (typeof stock === 'object') stock = stock[size];

        const index = req.session.cart.findIndex(function(cartEntry) {
            return (
                cartEntry.id === id &&
                cartEntry.size === size &&
                cartEntry.color === color
            );
        });

        let totalQuantity = 0;

        if (index >= 0) {
            totalQuantity = req.session.cart[index].quantity += +quantity;
        } else {
            totalQuantity = +quantity;
            req.session.cart = [...req.session.cart, chosenProduct];
        }
        req.session.cart[
            index >= 0 ? index : req.session.cart.length - 1
        ].quantity = totalQuantity <= stock ? totalQuantity : stock;
        await req.session.save();
    }
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
                    'Cart needs to be populated. Please call ' +
                        'cartController.populateCart() first.'
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
};

exports.getIndexOf = function(cart, product) {
    if (cart && cart.length > 0) {
        return cart.findIndex(function(cartEntry) {
            const sameId = cartEntry.id === product.id;
            const sameSize = cartEntry.size === product.size;
            const sameColor = cartEntry.color === product.color;
            return sameId && sameSize && sameColor;
        });
    }
};
