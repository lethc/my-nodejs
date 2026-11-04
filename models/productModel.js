const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: String,
    precio: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0, min: 0 }
})

const Product = mongoose.model('Product', productSchema, 'productos')

module.exports = Product