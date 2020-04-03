const cartController = require('../controllers/cart-controller');
module.exports = function (req, res, next) {
    req.cart = cartController.getCart(req);
    req.quantity = parseInt(cartController.getQuantity(req.cart));
    next();
}