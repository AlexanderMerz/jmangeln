console.log(process.env.NODE_ENV);

/* Check NODE_ENV */
if (process.env.NODE_ENV === 'production') {
    require('dotenv').config();
}

// Global logging function
global.log = console.log;

// Core Modules
const path = require('path');

// Third Party Modules
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const helmet = require('helmet')
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

/* Routes */
const apiRoutes = require('./routes/api.routes');
const merchRoutes = require('./routes/merch.routes');
const orderRoutes = require('./routes/order.routes');
const adminRoutes = require('./routes/admin.routes');

/* Config */
const MONGO_CONFIG = require('./config/mongo.config');

/* Init Server */
const server = express();

/* Server Configuration */
server.use(express.static('public'));
server.use(bodyParser.json());  
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(compression());
server.use(cors());
server.use(helmet());
server.use(helmet.hidePoweredBy());
server.use(session({
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || 'my-secret',
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
server.use('/order', orderRoutes);

server.use('/admin', adminRoutes);

/* Database Connection + Server Start */
mongoose.connect(
    MONGO_CONFIG.URI,
    MONGO_CONFIG.OPTIONS
).then(function () {
    server.listen(
        process.env.PORT || 8080,
        process.env.HOST || '0.0.0.0',
        log('Server is up and running')
    );
}).catch(function (error) {
    console.error(error);
    process.exit(1);
});
