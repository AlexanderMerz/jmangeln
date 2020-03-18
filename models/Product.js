const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    price: Number,
    sizes: Array,
    colors: Array,
    image: String,
    description: String,
    category: String
})

module.exports = model('Product', productSchema)
