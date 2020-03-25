const router = require('express').Router();
const categoryController = require('../controllers/category-controller');
const productController = require('../controllers/product-controller');
const blogController = require('../controllers/blog-controller');
const cartController = require('../controllers/cart-controller');
const youtubeService = require('../services/youtube');
const { parseText } = require('../middleware/textparser');
const { objectsAreEqual } = require('../utils/utils');

router.get('/youtube', youtubeService.getVideos);

router.get('/blogs', blogController.getPosts);

router.get('/products', productController.getProducts);

router.get('/categories', categoryController.getCategories);

router.post('/cart/remove/:id', async function(req, res) {
    let status = 400;
    const product = req.body;
    Object.entries(product).forEach(function([key, value]) {
        if (!value || value === '') product[key] = null;
    });
    if (req.session.cart && req.session.cart.length > 0) {
        const index = req.session.cart.findIndex(function(cartEntry) {
            const sameId = cartEntry.id === product.id;
            const sameSize = cartEntry.size === product.size;
            const sameColor = cartEntry.color === product.color;
            return sameId && sameSize && sameColor;
        });
        if (index >= 0) {
            req.session.cart.splice(index, 1);
            status = 200;
        } else {
            status = 404;
        }
    }
    res.status(status).json({ status });
});

router.post('/product/update/:id', async function(req, res) {
    try {
        await productController.updateProduct({ id: req.params.id, ...req.body });
    } catch (error) {
        console.log(error);
        return res.status(401).end('Bad Request');
    }
    res.status(200).redirect('/admin/products');
});

module.exports = router;
