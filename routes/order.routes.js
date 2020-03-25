const router = require('express').Router();
const cartController = require('../controllers/cart-controller');

let clientID;
if (env === 'production')
    clientID === process.env.PAYPAL_LIVE_CLIENT_ID;
else if (env === 'development')
    clientID === process.env.PAYPAL_SANDBOX_CLIENT_ID;

router.get('/checkout', async function(req, res) {
    let cart = cartController.getCart(req);
    cart = await cartController.populateCart(cart);
    const total = cartController.getTotal(cart);
    const descriptions = cart.map(product => {
        return `${product.data.name} ${product.size || ''} ${product.color || ''}`;
    });
    const prices = cart.map(product => product.data.price);
    const quantities = cart.map(prodct => prodct.quantity);
    res.render('checkout', { cart, total, clientID, descriptions, prices, quantities });
});

router.get('/confirmation', cartController.emptyCart, function(req, res) {
    res.render('confirmation');
});

module.exports = router;
