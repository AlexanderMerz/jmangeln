const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    price: Number,
    images: Array,
    colors: Array,
    image: String,
    details: Array,
    hint: String,
    category: String,
    stock: Number | Object
})

module.exports = model('Product', productSchema)
