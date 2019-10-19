exports.getCart = (req) => req.session.cart || [];

exports.postCart = (req, res) => {
    const chosenProduct = {
        id: req.body.productID,
        quantity: +req.body.quantity,
        price: +req.body.price,
        size: req.body.size
    }
    if (!req.session.cart) req.session.cart = [chosenProduct];
    else {
        const index = req.session.cart.findIndex(({ id }) => id === chosenProduct.id);
        if (index >= 0 && req.session.cart[index].size === chosenProduct.size) {
            req.session.cart[index].quantity += chosenProduct.quantity;
        } else {
            req.session.cart = [...req.session.cart, chosenProduct];
        }
    }
    res.render('cart', {
        cart: req.session.cart,
        quantity: this.getQuantity(req.session.cart),
        total: this.getTotal(req.session.cart)
    });
};

exports.getQuantity = (cart) => {
    let quantity = 0;
    if (cart && cart.length > 0) {
        for (const product of cart) {
            quantity += product.quantity;
        }
    }
    return quantity;
}

exports.getTotal = (cart) => {
    let total = 0;
    if (cart && cart.length > 0) {
        for (const product of cart) {
            total += product.quantity * product.price
        }
    }
    return total;
}

