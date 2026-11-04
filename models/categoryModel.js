const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    descripcion: String,
    activa: { type: Boolean, default: true }
})

const Category = mongoose.model('Category', categorySchema, 'categorias')

module.exports = Category