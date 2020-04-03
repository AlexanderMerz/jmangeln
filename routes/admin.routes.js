const router = require('express').Router();
const { getProducts } = require('../controllers/product-controller');
const { isAuth, login, logout, redirectWhenAuthenticated } = require('../middleware/auth.middleware');

router.get('/', (req, res) => res.redirect('/admin/login'));

router.get('/login', redirectWhenAuthenticated, function (req, res) {
    res.render('login', {
        path: req.originalUrl,
        quantity: req.quantity
    });
});

router.post('/login', login);

router.get('/logout', logout);

router.get('/products', isAuth, async function(req, res) {
    res.render('product-edit', {
        path: req.originalUrl,
        quantity: req.quantity,
        products: await getProducts()
    });
});

module.exports = router;
