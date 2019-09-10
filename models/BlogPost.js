const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    id: Number,
    title: String,
    content: String,
    image: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
