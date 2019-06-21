const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
app.use(compression());
app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')))
app.get('/team', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pages', 'team.html')));

app.listen(process.env.PORT || 8080);