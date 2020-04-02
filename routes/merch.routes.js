const router = require('express').Router();

const categoryController = require('../controllers/category-controller');
const cartController = require('../controllers/cart-controller');
const productController = require('../controllers/product-controller');
const { parseText } = require('../middleware/textparser');

router.use(function (req, res, next) {
    req.cart = cartController.getCart(req);
    req.quantity = parseInt(cartController.getQuantity(req.cart));
    next();
});

router.get('/', async function(req, res) {
    const categories = await categoryController.getCategories();
    const products = await productController.getProducts();
    res.render('merch', { quantity: req.quantity, categories, products });
});

router.get('/cart', async function(req, res) {
    const cart = await cartController.populateCart(req.cart);
    const total = cartController.getTotal(cart);
    res.render('cart', { cart, quantity: req.quantity, total });
});

router.get('/produkt/:id', async function(req, res) {
    const product = await productController.findProductById(req.params.id);
    console.log(product);
    if (!product) return res.status(404).render('404');
    (product.stock)
        ? res.status(200).render('product', { product })
        : res.status(204).redirect('/merch');
});

router.post('/cart', parseText, async function(req, res) {
    try {
        await cartController.postCart(req);
        res.redirect('/merch/cart');
    } catch (error) {
        console.error(error);
        res.redirect('/merch');
    }
});

module.exports = router;
