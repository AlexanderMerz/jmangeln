const router = require('express').Router();
const cartController = require('../controllers/cart-controller')
const stripe = require('stripe')('sk_test_MZUId1dfwRb4tDYGmN3HJUWa00Rk55bpO2');

router.get('/checkout', async function(req, res) {
    try {
        let cart = cartController.getCart(req);
        cart = await cartController.populateCart(cart);
        const total = cartController.getTotal(cart);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'ideal'],
            line_items: cart.map(product => {
                return {
                    name: `${product.data.name}, Größe ${product.size}`,
                    description: product.data.description,
                    images: [product.image],
                    amount: (product.data.price * 100),
                    currency: 'eur',
                    quantity: product.quantity
                }
            }),
            success_url: req.protocol + '://' + req.get('host'),
            cancel_url: req.protocol + '://' + req.get('host') + '/merch/cart'
        });
        return res.render('checkout', { cart, total, sessionId: session.id });
    }
    catch (error) {
        console.log('Checkout Error: ', error);
        return res.redirect('/');
    }
});

module.exports = router;