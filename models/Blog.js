const { model, Schema } = require('mongoose');

module.exports = model('Blog', new Schema({
    title: String,
    content: String,
    image: String,
    date: { type: Date, default: Date.now }
}));
