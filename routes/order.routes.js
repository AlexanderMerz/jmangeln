const router = require('express').Router();
const { getCart, populateCart, getTotal, emptyCart } = require('../controllers/cart-controller');
const clientID = process.env.PAYPAL_CLIENT_ID;

router.use(function(req, res, next) {
    console.log('Order Routes');
    next();
});

router.get('/checkout', async function(req, res) {
    let cart = getCart(req);
    cart = await populateCart(cart);
    const total = getTotal(cart);
    res.render('checkout', { cart, total, clientID });
});

router.get('/confirmation', emptyCart, function (req, res) {
    res.render('confirmation');
});

module.exports = router;