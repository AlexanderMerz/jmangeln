require('dotenv').config({ debug: true });

/* Core Modules */
const path = require('path');

/* Third Party Modules */
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
// const cloudinary = require('cloudinary').v2;
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const MONGO_CONFIG = require('./database/mongo.config');

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_APIKEY,
//     api_secret: process.env.CLOUDINARY_SECRET
// });

/* Routes */
const apiRoutes = require('./routes/api.routes');
const merchRoutes = require('./routes/merch.routes');
const checkoutRoutes = require('./routes/checkout.routes');

/* Init Server */
const server = express();

/* Server Configuration */
server.use(express.static('public'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(compression());
server.use(session({
    cookie: { maxAge: 1000* 60 * 60 * 24 },
    saveUninitialized: false,
    secret: 'my-secret',
    resave: false,
    store: new MongoDBStore({
        uri: MONGO_CONFIG.URI,
        collection: 'sessions'
    })
}));

/* Set Views Folder and Templating Engine */
server.set('views', 'views');
server.set('view engine', 'ejs');

/* File Upload Destination */
const getDefaultFilename = function(mimetype) {
    return new Date().getTime().toString() + '.' + mimetype;
}
const upload = multer({
    storage: multer.diskStorage({
        filename: (req, file, cb) => {
            cb(null, getDefaultFilename(file.mimetype.split('/')[1]));
        }
    })
});

/* Path to Pages Folder */
const pages = path.join(__dirname, 'public', 'pages');

/* Static Sites */
server.get('/social', (req, res) => res.sendFile(pages + path.sep + 'social.html'));
server.get('/videos', (req, res) => res.sendFile(pages + path.sep + 'videos.html'));
server.get('/blog', (req, res) => res.sendFile(pages + path.sep + 'blog.html'));

/* Team Routes */
server.get('/team*', function (request, response) {
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

/* Merch Routes */
server.use('/merch', merchRoutes);

/* API Endpoints */
server.use('/api', apiRoutes);

/* Checkout Routes */
server.get('/checkout', checkoutRoutes);
server.post('/checkout', checkoutRoutes);

/* Database Connection + Server Start */
mongoose.connect(
    MONGO_CONFIG.URI,
    MONGO_CONFIG.OPTIONS
).then(function () {
    server.listen(process.env.PORT || 8080);
    console.log('Server is up and running');
}).catch(function (error) {
    console.error(error);
    process.exit(1);
});
