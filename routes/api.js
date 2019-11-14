const router = require('express').Router();
const categoryController = require('../controllers/category-controller');
const productController = require('../controllers/product-controller');
const blogController = require('../controllers/blog-controller');
const cartController = require('../controllers/cart-controller');
const youtubeService = require('../services/youtube-service');
const { parseText } = require('../middleware/textparser');

router.get('/youtube', youtubeService.getVideos);

router.get('/blogs', blogController.getPosts);

router.get('/products', productController.getProducts);

router.get('/categories', categoryController.getCategories);

router.post('/cart', parseText, async function(req, res) {

    try {

        const payload = req.body;

        switch (payload.change) {

            case 'quantity': {

                const foundIndex = req.session.cart.findIndex(product => {
                    return product.id == payload.id && product.size == payload.size;
                });
                const newQuantity = parseInt(payload.quantity);
                if (foundIndex >= 0 && req.session.cart[foundIndex].quantity != newQuantity) {
                    if (newQuantity == 0) {
                        req.session.cart = req.session.cart.filter((product, index) => index !== foundIndex);
                    } else if (newQuantity > 0 && newQuantity < 10) {
                        req.session.cart = req.session.cart.map(function(product, index) {
                            if (index === foundIndex) {
                                product.quantity = parseInt(newQuantity);
                            }
                            return product;
                        });
                    } else {
                        return res.status(400).json({ error: 'Quantity exceeds allowed range' });
                    }
                }
                break;

            }

            case 'size': {

                /* Index of the changed product */
                const foundIndex = req.session.cart.findIndex(product => {
                    return product.id == payload.id && product.size == payload.oldSize;
                });
                /* Check if there is a product with same ID and (new) size */
                const identicalProduct = req.session.cart.findIndex(product => {
                    return product.id == payload.id && product.size == payload.newSize;
                });
                /*  If a identical product  already exists then
                    remove the entry and transfer the quantity */
                if (identicalProduct >= 0 && foundIndex !== identicalProduct) {
                    const quantity = req.session.cart[foundIndex].quantity;
                    req.session.cart[identicalProduct].quantity += quantity;
                    req.session.cart = req.session.cart.filter((product, index) => index !== foundIndex);
                } else {
                    req.session.cart[foundIndex].size = payload.newSize;
                }
                break;

            }

            default: return res.redirect('/');

        }

        const newCart = await cartController.populateCart(req.session.cart);
        const newTotal = cartController.getTotal(newCart);
        return res.status(200).json({ status: 200, cart: newCart, total: newTotal });
        
    } catch (error) {
        console.log('Error at /api/cart: ', error);
        return res.redirect('/');
    }

});

module.exports = router;
