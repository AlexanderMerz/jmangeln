const router = require('express').Router();
const productController = require('../controllers/product-controller');
const { isAuth, login, logout, redirectWhenAuth } = require('../middleware/auth');

router.get('/', (req, res) => res.redirect('/admin/login'));

router.get('/login', redirectWhenAuth, (req, res) => res.render('login'));

router.post('/login', login);

router.get('/logout', logout);

router.get('/products', isAuth, async function(req, res) {
    const products = await productController.getProducts();
    res.render('product-edit', { products });
});

module.exports = router;