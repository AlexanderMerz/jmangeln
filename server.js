const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const mongoose = require('mongoose');
const multer = require('multer');

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
app.use(multer({ 
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, 'uploads'),
        filename: (req, file, cb) => cb(null, file.originalname)
    })
}).single('image'));


app.get('/', (req, res) => res.redirect('/home'));
app.get('/home', (req, res) => res.sendFile('index.html'));
app.get('/team', (req, res) => res.sendFile(pages + path.sep + 'team.html'));
app.get('/social', (req, res) => res.sendFile(pages + path.sep + 'social.html'));
app.get('/videos', (req, res) => res.sendFile(pages + path.sep + 'videos.html'));
app.get('/merch', (req, res) => res.sendFile(pages + path.sep + 'merch.html'));
app.get('/blog', (req, res) => res.sendFile(pages + path.sep + 'blog.html'));

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
