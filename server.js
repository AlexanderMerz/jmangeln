const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const compression = require('compression');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, 'uploads'),
        filename: (req, file, cb) => cb(
            null, `${new Date().toISOString().split('T')[0]}`
            + `.${file.mimetype.split('/')[1]}`
        )
    })
});

const { getYoutubeData } = require('./services/youtube');
const blogController = require('./controllers/blog-controller');

const mongoURL = 'mongodb+srv://'
  + process.env.MONGO_USER + ':'
  + process.env.MONGO_PASSWORD
  + '@cluster0-uhbcz.mongodb.net/'
  + process.env.MONGO_DB
  + '?retryWrites=true';

const pages = path.join(__dirname, 'public', 'pages');
const app = express();

app.use(compression());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(__dirname + '/uploads'));

// Main Sites

app.get('/team', (req, res) => res.sendFile(pages + path.sep + 'team.html'));
app.get('/social', (req, res) => res.sendFile(pages + path.sep + 'social.html'));
app.get('/videos', (req, res) => res.sendFile(pages + path.sep + 'videos.html'));
app.get('/merch', (req, res) => res.sendFile(pages + path.sep + 'merch.html'));
app.get('/blog', (req, res) => res.sendFile(pages + path.sep + 'blog.html'));

// Create Blog Posts

app.get('/create-post', (req, res) => res.sendFile(pages + path.sep + 'create-post.html'));
app.post('/create-post', upload.single('image'), (req, res) => {
    const { title, content } = req.body;
    const filename = req.file.filename.split('.')[0];
    const contentPath = path.join('uploads', `${filename}.txt`);
    fs.writeFile(contentPath, content, err => {
        if (!err) blogController.postBlog(title, contentPath, req.file.path);
    })
    return res.redirect('/');
});

// API

app.get('/api/youtube', async (req, res) => {
    const data = await getYoutubeData();
    if ('error' in data) return res.json({ status: 423, data });
    else return res.json({ status: 200, data });
});

app.get('/api/blogs', blogController.getBlogs);

mongoose
    .connect(mongoURL, { useNewUrlParser: true })
    .then(() => app.listen(process.env.PORT || 8080))
    .catch(error => console.log(error));
