const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    price: Number,
    images: Array,
    material: String,
    sizes: Array,
    colors: Array,
    image: String,
    description: String,
    category: String,
    stock: Number
})

module.exports = model('Product', productSchema)
