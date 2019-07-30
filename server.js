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
            null, `${new Date().toISOString().split('T')[0]}`
            + `.${file.mimetype.split('/')[1]}`
        )
    })
});

/* Path to Pages Folder */
const pages = path.join(__dirname, 'public', 'pages');

/* Main Sites */
app.get('/team', (req, res) => res.sendFile(pages + path.sep + 'team.html'));
app.get('/social', (req, res) => res.sendFile(pages + path.sep + 'social.html'));
app.get('/videos', (req, res) => res.sendFile(pages + path.sep + 'videos.html'));
app.get('/merch', (req, res) => res.sendFile(pages + path.sep + 'merch.html'));
app.get('/blog/post/:id', async (req, res) => {
    const post = await blogController.getPostById(req.params.id);
    return res.json(post);
});
app.get('/blog', (req, res) => res.sendFile(pages + path.sep + 'blog.html'));

/* Create Blog Posts */
app.get('/create-post', (req, res) => res.sendFile(pages + path.sep + 'create-post.html'));
app.post('/create-post', upload.single('image'), (req, res) => {
    const { title, content } = req.body;
    const filename = req.file.filename.split('.')[0];
    const contentPath = path.join('uploads', `${filename}.txt`);
    fs.writeFile(contentPath, content, err => {
        if (!err) blogController.createPost(title, contentPath, req.file.path);
    })
    return res.redirect('/');
});

/* API Endpoints */
app.get('/api/youtube', async (req, res) => {
    const data = await getYoutubeData();
    if ('error' in data) return res.json({ status: 423, data });
    else return res.json({ status: 200, data });
});
app.get('/api/blogs', async (req, res) => {
    const posts = await blogController.getPosts();
    return res.json(posts);
});

/* Database Connection + Server Start */
mongoose
    .connect(mongoURL, { useNewUrlParser: true })
    .then(() => app.listen(process.env.PORT || 8080))
    .catch(error => console.log(error));
