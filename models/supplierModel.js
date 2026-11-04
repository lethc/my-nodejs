const mongoose = require('mongoose')

const supplierSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    ruc: String,
    email: String,
    telefono: String,
    direccion: String
})

const Supplier = mongoose.model('Supplier', supplierSchema, 'proveedores')

module.exports = Supplier