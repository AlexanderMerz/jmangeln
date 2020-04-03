require('./config/global.config')();

if (env.NODE_ENV === 'production' || env.NODE_ENV === 'development')
    require('dotenv').config();
else
    errorMessageFor('environment');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const apiRoutes = require('./routes/api.routes');
const teamRoutes = require('./routes/team.routes')
const merchRoutes = require('./routes/merch.routes');
const orderRoutes = require('./routes/order.routes');
const adminRoutes = require('./routes/admin.routes');

const MONGO_CONFIG = require('./config/mongo.config');

const server = express();

server.use(express.static('public'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(compression());
server.use(helmet());
server.use(helmet.hidePoweredBy());

server.set('views', 'views');
server.set('view engine', 'ejs');

server.use(
    session({
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET || 'my-secret',
        resave: false,
        store: new MongoDBStore({
            uri: MONGO_CONFIG.URI,
            collection: 'sessions'
        })
    })
);

server.use(require('./middleware/cart.middleware'));

server.get('/', function (req, res) {
    res.render('index', {
        path: req.originalUrl,
        quantity: req.quantity
    });
});

server.get('/videos', function (req, res) {
    console.log(req.originalUrl);
    res.render('videos', {
        path: req.originalUrl,
        quantity: req.quantity
    });
});

server.use('/team', teamRoutes);
server.use('/merch', merchRoutes);
server.use('/api', apiRoutes);
server.use('/order', orderRoutes);
server.use('/admin', adminRoutes);

server.get('/datenschutz', (req, res) => res.render('datenschutz'));
server.get('/impressum', (req, res) => res.render('impressum'));

server.use(function (req, res) {
    res.render('404', {
        path: req.originalUrl,
        quantity: req.quantity
    });
});

mongoose
    .connect(MONGO_CONFIG.URI, MONGO_CONFIG.OPTIONS)
    .then(function() {
        server.listen(port, host, log(`Server is listening on port ${port}`));
    })
    .catch(function(error) {
        console.error(error);
        process.exit(1);
    });
