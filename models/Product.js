const { model, Schema } = require('mongoose');

module.exports = model('Product', new Schema({
    id: Number,
    name: String,
    description: String,
    image: String,
    release: { type: Date, default: Date.now }
}));
