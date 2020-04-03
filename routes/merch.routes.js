const router = require('express').Router();

const cartController = require('../controllers/cart-controller');
const { findProductById, getProducts } = require('../controllers/product-controller');

router.get('/', async function(req, res) {
    res.render('merch', {
        path: req.originalUrl,
        quantity: req.quantity,
        products: await getProducts()
    });
});

router.get('/cart', async function(req, res) {
    const cart = await cartController.populateCart(req.cart);
    const total = cartController.getTotal(cart);
    res.render('cart', {
        path: req.originalUrl,
        quantity: req.quantity,
        cart,
        total
    });
});

router.get('/produkt/:id', async function(req, res) {
    const product = await findProductById(req.params.id);
    if (!product) return res.status(404).render('404');
    res.status(200).render('product', {
        path: req.originalUrl,
        quantity: req.quantity,
        product
    })
});

router.post('/cart', async function(req, res) {
    try {
        await cartController.postCart(req);
        res.redirect('/merch/cart');
    } catch (error) {
        console.error(error);
        res.redirect('/merch');
    }
});

module.exports = router;
