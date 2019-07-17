const express = require('express');
const path = require('path');
const compression = require('compression');
const { getYoutubeData } = require('./youtube');

const app = express();
app.use(compression());
app.use(express.static('public'));

const pages = path.join(__dirname, 'public', 'pages');

app.get('/team', (req, res) => res.sendFile(pages + path.sep + 'team.html'));
app.get('/social', (req, res) => res.sendFile(pages + path.sep + 'social.html'));
app.get('/videos', (req, res) => res.sendFile(pages + path.sep + 'videos.html'));
app.get('/merch', (req, res) => res.sendFile(pages + path.sep + 'merch.html'));
app.get('/blog', (req, res) => res.sendFile(pages + path.sep + 'blog.html'));

app.get('/api/youtube', async (req, res) => {
    const data = await getYoutubeData();
    return res.json(data);
});

app.listen(process.env.PORT || 8080);