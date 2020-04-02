require('./config/global.config')();

if (env.NODE_ENV === 'production') {
    require('dotenv').config();
} else if (env.NODE_ENV !== 'development') {
    log(errorMessageFor('environment'));
    process.exit(1);
}

// Core Modules
const path = require('path');

// Dependencies
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const helmet = require('helmet');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// Import Route Handlers
const apiRoutes = require('./routes/api.routes');
const merchRoutes = require('./routes/merch.routes');
const orderRoutes = require('./routes/order.routes');
const adminRoutes = require('./routes/admin.routes');

const MONGO_CONFIG = require('./config/mongo.config');

const server = express();

/* Server Configuration */
server.use(express.static('public'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(compression());
server.use(helmet());
server.use(helmet.hidePoweredBy());

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

/* Set Views Folder and Templating Engine */
server.set('views', 'views');
server.set('view engine', 'ejs');

/* File Upload Destination */
// const getDefaultFilename = function(mimetype) {
//     return new Date().getTime().toString() + '.' + mimetype;
// }
// const upload = multer({
//     storage: multer.diskStorage({
//         filename: (req, file, cb) => {
//             cb(null, getDefaultFilename(file.mimetype.split('/')[1]));
//         }
//     })
// });

// Path to Pages Folder
const pages = path.join(__dirname, 'public', 'pages');

// Static Sites
server.get('/videos', function(req, res) {
    res.sendFile(pages + path.sep + 'videos.html');
});

// Team Routes
server.get('/team*', function(request, response) {
    switch (request.url) {
        case '/team/jonas&nico':
            response.sendFile(pages + path.sep + 'team-primary.html');
            break;
        case '/team/supporter':
            response.sendFile(pages + path.sep + 'team-secondary.html');
            break;
        default:
            response.sendFile(pages + path.sep + 'team.html');
    }
});

server.use('/merch', merchRoutes);
server.use('/api', apiRoutes);
server.use('/order', orderRoutes);
server.use('/admin', adminRoutes);

server.get('/datenschutz', (req, res) => res.render('datenschutz'));
server.get('/impressum', (req, res) => res.render('impressum'));

server.use((req, res) => res.render('404'));

mongoose
    .connect(MONGO_CONFIG.URI, MONGO_CONFIG.OPTIONS)
    .then(function() {
        server.listen(port, host, log(`Server is listening on port ${port}`));
    })
    .catch(function(error) {
        console.error(error);
        process.exit(1);
    });
