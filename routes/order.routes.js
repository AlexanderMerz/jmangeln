const router = require('express').Router();
const cartController = require('../controllers/cart-controller');
const clientID = process.env.PAYPAL_CLIENT_ID;

router.use(function(req, res, next) {
    console.log('Order Routes');
    next();
});

router.get('/checkout', async function(req, res) {
    let cart = cartController.getCart(req);
    cart = await cartController.populateCart(cart);
    const total = cartController.getTotal(cart);
    const descriptions = cart.map(
        product => `${product.data.name} ${product.size || ''} ${product.color || ''}`
    );
    const prices = cart.map(product => product.data.price);
    const quantities = cart.map(prodct => prodct.quantity);
    res.render('checkout', { cart, total, clientID, descriptions, prices, quantities });
});

router.get('/confirmation', cartController.emptyCart, function(req, res) {
    res.render('confirmation');
});

module.exports = router;
