const router = require('express').Router();
const categoryController = require('../controllers/category-controller');
const productController = require('../controllers/product-controller');
const blogController = require('../controllers/blog-controller');
const cartController = require('../controllers/cart-controller');
const youtubeService = require('../services/youtube');
const { normalize } = require('../utils/utils');

router.get('/youtube', youtubeService.getVideos);

router.get('/blogs', blogController.getPosts);

router.get('/products', productController.getProducts);

router.get('/categories', categoryController.getCategories);

router.post('/cart/remove/:id', async function(req, res) {
    let status = 400;
    const product = normalize(req.body);
    const index = cartController.getIndexOf(req.session.cart, product);
    if (index >= 0) {
        req.session.cart.splice(index, 1);
        await req.session.save();
        status = 200;
    } else {
        status = 404;
    }
    res.status(status).json({ status });
});

router.post('/cart/update/:id', async function(req, res) {
    let status = 400;
    const product = normalize(req.body);
    const newQuantity = parseInt(product.quantity);
    const index = cartController.getIndexOf(req.session.cart, product);
    console.log(index);
    if (index >= 0) {
        if (newQuantity === 0) {
            req.session.cart.splice(index, 1);
            console.log(req.session.cart);
        } else if (newQuantity > 0) {
            req.session.cart[index].quantity = newQuantity;
        }
        try {
            await req.session.save();
        } catch (error) {
            console.log(error);
        }
        status = 200;
    } else {
        status = 404;
    }
    res.status(status).json({ status });
});

router.post('/product/update/:id', async function(req, res) {
    let stock;
    if (typeof req.body.stock === 'object') {
        stock = {};
        for (const value of req.body.stock) {
            const size = value.split('-')[0];
            const quantity = value.split('-')[1];
            stock[size] = parseInt(quantity);
        }
    } else {
        stock = parseInt(req.body.stock);
    }
    try {
        await productController.updateProduct({ id: req.params.id, ...req.body, stock });
    } catch (error) {
        console.log(error);
        return res.status(401).end('Bad Request');
    }
    res.status(200).redirect('/admin/products');
});

module.exports = router;
