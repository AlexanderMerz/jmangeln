/* Core Modules */
const path  = require('path');

/* Third Party Modules */
const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const mongoURL = 'mongodb+srv://'
  + process.env.MONGO_USER + ':'
  + process.env.MONGO_PASSWORD
  + '@cluster0-uhbcz.mongodb.net/'
  + process.env.MONGO_DB
  + '?retryWrites=true';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

/* Controller */
const categoryController = require('./controllers/category-controller');
const productController = require('./controllers/product-controller');
const cartController = require('./controllers/cart-controller');
const blogController = require('./controllers/blog-controller');

const youtubeService = require('./services/youtube-service');
const { parseText } = require('./middleware/textparser');
const { capitalizeFirstLetter } = require('./helper/stringModifier');

/* Init App */
const app = express();

/* App Configuration */
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    cookie: { maxAge: 1000* 60 * 60 * 24 * 7 },
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

/* Main Sites */
app.get('/team', (req, res) => res.sendFile(pages + path.sep + 'team.html'));
app.get('/social', (req, res) => res.sendFile(pages + path.sep + 'social.html'));
app.get('/videos', (req, res) => res.sendFile(pages + path.sep + 'videos.html'));

/* Merch & Merch Subpages */
app.get('/merch*', async (req, res) => {

    const cart = cartController.getCart(req);
    const quantity = cartController.getQuantity(cart);
    const total = cartController.getTotal(cart);

    switch (req.url) {
        case '/merch': res.render('merch', { quantity }); break;
        case '/merch/cart': res.render('cart', { cart, quantity, total }); break;
        default: 
            const category = capitalizeFirstLetter(req.url.split('/merch/')[1]);
            const products = await productController
                .findProductsByCategory(category.toLowerCase());
            return products.length > 0
                ? res.status(200).render('product-list', {
                    category, products, quantity
                }) : res.status(404).redirect('/');
    }

});

app.post('/merch/cart', parseText, cartController.postCart);

// app.get('/merch', (req, res) => res.sendFile(pages + path.sep + 'merch.html'));
app.get('/produkt/:id', async (req, res) => {
    const product = await productController.findProductById(req.params.id);
    return product
        ? res.status(200).render('product', { product })
        : res.status(400).redirect('/merch');
});

/* Blog */
app.get('/blog', (req, res) => res.sendFile(pages + path.sep + 'blog.html'));

/* Create Blog Posts */
app.get('/create-post', (req, res) => res.sendFile(pages + path.sep + 'create-post.html'));
app.post('/create-post', upload.single('image'), blogController.createPost);

/* API Endpoints */
app.get('/api/youtube', async (req, res) => {
    try {
        const videos = await youtubeService.fetchVideos();
        return res.status(200).json(videos);
    } catch (error) {
        return res.status(404).end();
    }
});
app.get('/api/blogs', blogController.getPosts);
app.get('/api/products', productController.getProducts);
app.get('/api/categories', categoryController.getCategories);

app.get('/cookie', (req, res) => {
    return res.end('Cookie!');
});

/* Database Connection + Server Start */
mongoose.connect(mongoURL, { useNewUrlParser: true })
    .then(() => app.listen(process.env.PORT || 8080))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
