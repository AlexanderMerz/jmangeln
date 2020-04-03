const bcrypt = require('bcryptjs');

exports.login = async function(req, res) {
    const loginSuccessfully = await bcrypt.compare(req.body.password, process.env.ADMIN_PASSWORD);
    if (loginSuccessfully) {
        req.session.isLoggedIn = true;
        await req.session.save();
        return res.redirect('/admin/products');
    }
    return res.render('login');
}

exports.logout = function(req, res) {
    delete req.session['isLoggedIn'];
    req.session.save(); 
    return res.redirect('/admin/login');
}

exports.isAuth = function(req, res, next) {
    if (!req.session.isLoggedIn) {
        return res.redirect('/admin/login');
    }
    next();
}

exports.redirectWhenAuthenticated = function(req, res, next) {
    if (req.session.isLoggedIn) {
        return res.redirect('/admin/products');
    }
    next();
}
