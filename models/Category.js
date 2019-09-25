const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    image: String,
    href: String
});

module.exports = mongoose.model('Category', categorySchema);
