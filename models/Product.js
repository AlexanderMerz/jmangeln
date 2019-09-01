const { model, Schema } = require('mongoose');

module.exports = model('Product', new Schema({
    name: String,
    price: Number,
    meta: Array,
    image: String
}));
