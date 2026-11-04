const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    dni: String,
    email: String,
    telefono: String,
    direccion: String
})

const Customer = mongoose.model('Customer', customerSchema, 'clientes')

module.exports = Customer