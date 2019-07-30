const { model, Schema } = require('mongoose');

module.exports = model('BlogPost', new Schema({
    id: Number,
    title: String,
    content: String,
    image: String,
    date: { type: Date, default: Date.now }
}));
