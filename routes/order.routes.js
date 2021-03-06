const router = require('express').Router();
const cartController = require('../controllers/cart-controller');

let clientID;
if (env.NODE_ENV === 'production') {
    clientID = env.PAYPAL_LIVE_CLIENT_ID;
} else if (env.NODE_ENV === 'development') {
    clientID = env.PAYPAL_SANDBOX_CLIENT_ID;
}

router.get('/checkout', async function(req, res) {
    let cart = cartController.getCart(req);
    if (cart.length === 0) {
        return res.redirect('/merch');
    }
    const quantity = cartController.getQuantity(cart);
    cart = await cartController.populateCart(cart);
    const total = cartController.getTotal(cart);
    const descriptions = cart.map(product => {
        return `${product.data.name} ${product.size || ''} ${product.color || ''}`;
    });
    const prices = cart.map(product => product.data.price);
    const quantities = cart.map(prodct => prodct.quantity);
    const cartData = { descriptions, prices, quantities }
    const data = { path: req.originalUrl, cart, quantity, total, clientID, ...cartData };
    res.render('checkout', data);
});

router.get('/confirmation', cartController.emptyCart, function(req, res) {
    res.render('confirmation', {
        path: req.originalUrl,
        quantity: req.quantity
    });
});

module.exports = router;
