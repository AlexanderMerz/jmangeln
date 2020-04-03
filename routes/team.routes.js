const router = require('express').Router();

router.get('/', function(req, res) {
    return res.render('team', {
        path: req.originalUrl,
        quantity: req.quantity
    });
});

router.get('/jonas&nico', function(req, res) {
    return res.render('team-primary', {
        path: req.originalUrl,
        quantity: req.quantity
    });
});
router.get('/supporter', function(req, res) {
    return res.render('team-secondary', {
        path: req.originalUrl,
        quantity: req.quantity
    });
});

module.exports = router;
