const router = require('express').Router();

const categoryController = require('../controllers/category-controller');
const cartController = require('../controllers/cart-controller');
const productController = require('../controllers/product-controller');
const { capitalizeFirstLetter } = require('../helper/StringModifier');
const { parseText } = require('../middleware/textparser');

router.get('*', function (req, res, next) {
    req.cart = cartController.getCart(req);
    req.quantity = parseInt(cartController.getQuantity(req.cart));
    next();
});

router.get('*', async function (req, res) {

    let {  cart, quantity } = req;
    quantity = parseInt(quantity);
    const url = req.originalUrl;

    switch (url) {
        case '/merch':
            const categories = await categoryController.getCategories();
            res.render('merch', { quantity, categories });
            break;
        case '/merch/cart':
            cart = await cartController.populateCart(cart);
            const total = cartController.getTotal(cart);
            res.render('cart', { cart, quantity, total });
            break; 
        default:
            if (url.includes('produkt')) {
                const productId = req.params[0].split('/produkt/')[1];
                const product = await productController.findProductById(productId);
                if (product) return res.status(200).render('product', { product });
                else return res.status(400).redirect('/merch');
            }
            const category = capitalizeFirstLetter(url.split('/merch/')[1]);
            const products = await productController.findProductsByCategory(category.toLowerCase());
            return res.render('product-list', { category, products, quantity });
    }

});

router.post('*', parseText, cartController.postCart);

module.exports = router;
