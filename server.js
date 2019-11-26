/* Core Modules */
const path = require('path');

/* Third Party Modules */
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const compression = require('compression');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

/* MongoDB and Cloudinary config */

const mongoURL = 'mongodb+srv://'
  + process.env.MONGO_USER + ':'
  + process.env.MONGO_PASSWORD
  + '@cluster0-uhbcz.mongodb.net/'
  + process.env.MONGO_DB
  + '?retryWrites=true';

const mongoConfig = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

/* Routes */
const apiRoutes = require('./routes/api');
const merchRoutes = require('./routes/merch');
const checkoutRoutes = require('./routes/checkout');

/* Init App */
const app = express();

function startServer(port) {
    app.listen(process.env.PORT || port);
}

/* App Configuration */
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    cookie: { maxAge: 1000* 60 * 60 * 24 },
    saveUninitialized: false,
    secret: 'my-secret',
    resave: false,
    store: new MongoDBStore({
        uri: mongoURL,
        collection: 'sessions'
    })
}));

/* Set Views Folder and Templating Engine */
app.set('views', 'views');
app.set('view engine', 'ejs');

/* File Upload Destination */
const getDefaultFilename = mimetype => new Date().getTime().toString() + '.' + mimetype;
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
app.get('/team', (req, res) => res.sendFile(pages + path.sep + 'team.html'));
app.get('/social', (req, res) => res.sendFile(pages + path.sep + 'social.html'));
app.get('/videos', (req, res) => res.sendFile(pages + path.sep + 'videos.html'));
app.get('/blog', (req, res) => res.sendFile(pages + path.sep + 'blog.html'));

/* Merch Routes */
app.use('/merch', merchRoutes);

/* API Endpoints */
app.use('/api', apiRoutes);

/* Checkout Routes */
app.get('/checkout', checkoutRoutes);
app.post('/checkout', checkoutRoutes);

/* Database Connection + Server Start */
mongoose.connect(mongoURL, mongoConfig)
    .then(() => startServer(8080))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
