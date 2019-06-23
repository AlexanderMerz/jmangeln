const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
app.use(compression());
app.use(express.static('public'));

// path to pages folder
const pages = path.join(__dirname, 'public', 'pages');

app.get('/team', (req, res) => res.sendFile(pages + path.sep + 'team.html'));
app.get('/social', (req, res) => res.sendFile(pages + path.sep + 'social.html'));

app.listen(process.env.PORT || 8080);