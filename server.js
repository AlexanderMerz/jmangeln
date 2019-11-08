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

/* MongoDB and Cloudinary config */

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
const { getCategories } = require('./controllers/category-controller');
const cartController = require('./controllers/cart-controller');
const blogController = require('./controllers/blog-controller');
const { findProductById, findProductsByCategory } = require('./controllers/product-controller');

/* Routes */
const apiRoutes = require('./routes/api');
const merchRoutes = require('./routes/merch');

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

/* Static Sites */
app.get('/team', (req, res) => res.sendFile(pages + path.sep + 'team.html'));
app.get('/social', (req, res) => res.sendFile(pages + path.sep + 'social.html'));
app.get('/videos', (req, res) => res.sendFile(pages + path.sep + 'videos.html'));
app.get('/blog', (req, res) => res.sendFile(pages + path.sep + 'blog.html'));

/* Merch Routes */
app.use('/merch*', merchRoutes);

/* API Endpoints */
app.use('/api', apiRoutes);

/* Merch & Merch Subpages */
// app.get('/merch*', async (req, res) => {

//     let cart = cartController.getCart(req);
//     const quantity = cartController.getQuantity(cart);

//     switch (req.url) {
//         case '/merch': 
//             const categories = await getCategories();
//             res.render('merch', { quantity, categories });
//             break;
//         case '/merch/cart': 
//             cart = await cartController.populateCart(cart);
//             const total = cartController.getTotal(cart);
//             res.render('cart', { cart, quantity, total });
//             break;
//         default: 
//             const enpoint = req.url.split('/merch/')[1];
//             const category = capitalizeFirstLetter(enpoint);
//             const products = await findProductsByCategory(category.toLowerCase());
//             return products.length > 0
//                 ? res.status(200).render('product-list', { category, products, quantity })
//                 : res.status(404).redirect('/');
//     }

// });

// app.get('/produkt/:id', async (req, res) => {
//     const product = await findProductById(req.params.id);
//     return product
//         ? res.status(200).render('product', { product })
//         : res.status(400).redirect('/merch');
// });

/* Create Blog Posts */
// app.get('/create-post', (req, res) => res.sendFile(pages + path.sep + 'create-post.html'));
// app.post('/create-post', upload.single('image'), blogController.createPost);



/* Database Connection + Server Start */
mongoose.connect(mongoURL, { useNewUrlParser: true })
    .then(() => app.listen(process.env.PORT || 8080))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
