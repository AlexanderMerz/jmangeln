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
    if (product) return res.status(200).render('product', { product });
});

router.post('/cart', parseText, cartController.postCart);

module.exports = router;
