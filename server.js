const express = require('express');
const compression = require('compression');

const app = express();
app.use(compression());
app.use(express.static('public'));

app.get('/', (req, res) => res.render('index.html'));

app.listen(process.env.PORT || 8080);