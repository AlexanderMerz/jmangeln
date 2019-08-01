/* Core Modules */
const fs    = require('fs');
const path  = require('path');

/* Third Party Modules */
const bodyParser    = require('body-parser');
const compression   = require('compression');
const express       = require('express');
const mongoose      = require('mongoose');
const multer        = require('multer');

const blogController        = require('./controllers/blog-controller');
const { getYoutubeData }    = require('./services/youtube');

const mongoURL = 'mongodb+srv://'
  + process.env.MONGO_USER + ':'
  + process.env.MONGO_PASSWORD
  + '@cluster0-uhbcz.mongodb.net/'
  + process.env.MONGO_DB
  + '?retryWrites=true';

/* Init App */
const app = express();

/* App Configuration */
app.use(compression());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(__dirname + '/uploads'));

/* Set View Engine */
app.set('view engine', 'pug');

/* File Upload Destination */
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, 'uploads'),
        filename: (req, file, cb) => cb(
            null, `${new Date().getTime()}`
            + `.${file.mimetype.split('/')[1]}`
        )
    })
});

// new Date().toISOString().split('T')[0]

/* Path to Pages Folder */
const pages = path.join(__dirname, 'public', 'pages');

/* Main Sites */
app.get('/team', (req, res) => res.sendFile(pages + path.sep + 'team.html'));
app.get('/social', (req, res) => res.sendFile(pages + path.sep + 'social.html'));
app.get('/videos', (req, res) => res.sendFile(pages + path.sep + 'videos.html'));
app.get('/merch', (req, res) => res.sendFile(pages + path.sep + 'merch.html'));
app.get('/blog/post/:id', blogController.getPostById);
app.get('/blog', (req, res) => res.sendFile(pages + path.sep + 'blog.html'));

/* Create Blog Posts */
app.get('/create-post', (req, res) => res.sendFile(pages + path.sep + 'create-post.html'));
app.post('/create-post', upload.single('image'), blogController.createPost);

/* API Endpoints */
app.get('/api/youtube', async (req, res) => {
    const data = await getYoutubeData();
    if ('error' in data) return res.json({ status: 423, data });
    else return res.json({ status: 200, data });
});
app.get('/api/blogs', blogController.getPosts);

/* Database Connection + Server Start */
mongoose
    .connect(mongoURL, { useNewUrlParser: true })
    .then(() => app.listen(process.env.PORT || 8080))
    .catch(error => console.log(error));
